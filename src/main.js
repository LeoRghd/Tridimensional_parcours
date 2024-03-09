var canvas = document.getElementById('renderCanvas')
var engine = new BABYLON.Engine(canvas, true)

var app = {}
app.state = 'menu'
app.isLocked = 'false'
app.game = {}
app.menu = {}
app.pause = {}
app.char = {
    hooks: {
        left: {
            isOn: false,
            isSet: false,
            isThrown: false,
        },
        right: {
            isOn: false,
            isSet: false,
            isThrown: false,
        },
    },
    isMoving: false,
}
app.ray = false
app.ground = {}
app.crossHair = {}

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

const createSkybox = function (scene) {
    var skybox = BABYLON.Mesh.CreateBox('skyBox', 10000.0, scene)
    skybox.isPickable = false
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        'utils/textures/cube',
        scene
    )
    skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial

    skybox.position.y = skybox.scaling.y / 2
}

const loadSphere = function (scene) {
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'touch',
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

    // createLight(scene)
    createSunLight(scene)
    createSceneAxes(scene)
    createSkyLight(scene)
    // loadBox(scene)
    // loadSphere(scene)

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

    app.game.scene.onBeforeRenderObservable.add(() => {
        app = cameraColision(app)
    })
    app.game.scene.registerBeforeRender(function () {
        app.char = handlePlayerMovement(
            keyStatus,
            app.game.scene,
            app.char,
            app.game.camera,
            app.animation,
            app.sound
        )
        if (app.char.isOnGround || app.char.isJumping || app.char.isOnAir)
            app.char = updateJump(app.char, app.game.scene, app.animation)
        app.char = updateGroundState(app.char, app.game.scene, app.animation)
        var hookRay = raycast(
            app.char.player,
            app.game.camera,
            app.game.scene,
            app.ray,
            app.crossHair.textTexture
        )
        app.char = hookHandler(
            app.char,
            app.game.camera,
            app.game.scene,
            'left',
            app.crossHair.leftPlane,
            app.sound
        )
        app.char = hookHandler(
            app.char,
            app.game.camera,
            app.game.scene,
            'right',
            app.crossHair.rightPlane,
            app.sound
        )
        app.ray = hookRay.previousRay
        app.crossHair.textTexture = hookRay.textTexture
    })
    return app
}

//Main :
;(async () => {
    app.game.scene = await createScene()
    createSkybox(app.game.scene)
    let model = await loadModel(app.game.scene)
    app.char = { ...app.char, ...model }
    app.char.isOnGround = true
    app.char.groundRay = false
    app.game.camera = createCamera(app.game.scene, app.char.player)
    app.sound = getSound(app.game.scene)
    app = createMenuScene(app)
    app = createPauseScene(app)
    app.animation = getAnimation(app.game.scene)
    // app.fps = addFpsCounter(app.game.scene, app.game.camera)
    // console.log('app.fps', app.fps)
    const ring = createRing(app.game.scene, 'touch', 30, 5, 100, true)
    const tower = mapTower.forEach((position) => {
        createTower(10, 700, 10, position.x, position.z, app.game.scene)
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
                    //Inspecteur BABYLON !!!
                    // app.game.scene.debugLayer.show()
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
