var canvas = document.getElementById('renderCanvas')
var engine = new BABYLON.Engine(canvas, true)

var app = {}
app.state = 'menu'
app.isLocked = 'false'
app.game = {}
app.menu = {}
app.pause = {}
app.char = {}
app.ray = false
app.ground = {}
app.crossHair = {}
app.char.isMoving = false
app.char.isInAir = false

const onOffPause = (lock) => {
    if (lock) {
        app.isPaused = false
    } else {
        app.isPaused = true
    }
    console.log('app.isPaused', app.isPaused)
}

document.addEventListener('pointerlockchange', function () {
    if (!document.pointerLockElement) {
        // Afficher une interface de pause avec des instructions pour continuer
        onOffPause(false) // Assurez-vous d'implémenter cette fonction
    }
})

const loadModel = async (scene) => {
    const player = await loadPlayer(scene)
    return player
}

const loadSphere = function (scene) {
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'sphere',
        { diameter: 3 },
        scene
    )
    sphere.position = new BABYLON.Vector3(1, 5, 0)
    const sphereBody = new BABYLON.PhysicsBody(
        sphere,
        BABYLON.PhysicsMotionType.DYNAMIC,
        false,
        scene
    )
    const sphereShape = new BABYLON.PhysicsShapeSphere(
        new BABYLON.Vector3(0, 0, 0), // center of the sphere in local space
        1.5, // radius of the sphere
        scene // containing scene
    )
    sphereBody.setMassProperties({ mass: 0.3 })
    sphereBody.shape = sphereShape
}

const runRay = function () {
    var ray = raycast(
        app.char.player,
        app.game.camera,
        app.game.scene,
        app.ray,
        app.crossHair.textTexture
    )
    app.ray = ray.previousRay
    app.crossHair.textTexture = ray.textTexture
}

const createScene = async function () {
    const scene = new BABYLON.Scene(engine)
    const havokInstance = await HavokPhysics()
    const hk = new BABYLON.HavokPlugin(true, havokInstance)
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk)

    createLight(scene)
    // loadBox(scene)
    // loadSphere(scene);

    applyGroundTexture(CreateGround(scene), scene)
    scene.collisionsEnabled = true
    return scene
}

const createCamera = function (scene, player) {
    var camera = createFollowCamera(scene, player, false)
    camera.wheelPrecision = 10
    return camera
}

const applyGroundTexture = function (ground, scene) {
    const texture = new BABYLON.Texture('./utils/img/guts_dodo.jpg', scene)
    const material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseTexture = texture
    ground.material = material
}

const setupGameLogic = async function (app) {
    const keyStatus = getKeyStatus(app.game.scene)
    // let gizmoManager = new BABYLON.GizmoManager(app.game.scene)
    // gizmoManager.positionGizmoEnabled = true
    // gizmoManager.attachToMesh(player)
    app.game.scene.onBeforeRenderObservable.add(() => {
        app.char = handlePlayerMovement(
            keyStatus,
            app.game.scene,
            app.char,
            app.game.camera
        )
        app = cameraColision(app)

        // app.char = handleJump(keyStatus, app.game.scene, app.char)
        // app.char = checkForPlayerRotate(app.char)
    })
    app.game.scene.registerBeforeRender(function () {
        var ray = raycast(
            app.char.player,
            app.game.camera,
            app.game.scene,
            app.ray,
            app.crossHair.textTexture
        )
        app.ray = ray.previousRay
        app.crossHair.textTexture = ray.textTexture
    })
    return app
}

//Main :
;(async () => {
    app.game.scene = await createScene()
    app.char = await loadModel(app.game.scene)
    app.game.camera = createCamera(app.game.scene, app.char.player)
    app = createMenuScene(app)
    app = createPauseScene(app)
    const tower = mapTower.forEach((position) => {
        createTower(10, 70, 10, position.x, position.z, app.game.scene)
    })
    app.crossHair = addCrosshair(app.game.scene, app.game.camera)

    app = await setupGameLogic(app)

    engine.runRenderLoop(function () {
        switch (app.state) {
            case 'menu':
                app.menu.scene.render()
                break
            case 'game':
                if (!app.isPaused) {
                    canvas.requestPointerLock()
                    app.game.scene.render()
                }
                if (app.isPaused) {
                    app.pause.scene.render()
                }
            default:
                break
        }
    })
    window.addEventListener('resize', function () {
        engine.resize()
    })
    app.game.scene.createDefaultEnvironment({
        createGround: false,
        createSkybox: false,
    })
})()
