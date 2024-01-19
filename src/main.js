var canvas = document.getElementById('renderCanvas')
var engine = new BABYLON.Engine(canvas, true)

var app = {}
app.game = {}
app.menu = {}
app.char = {}
app.char.isMoving = false
app.isPaused = false

const loadModel = async (scene) => {
    const player = await loadPlayer(scene)
    return player
}

const loadBox = function (scene) {
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene)
    box.position = new BABYLON.Vector3(0, 10, 0)
    const boxAggregate = new BABYLON.PhysicsAggregate(
        box,
        BABYLON.PhysicsShapeType.BOX,
        { mass: 0.5, restitution: 0.25 },
        scene
    )
    boxAggregate.body.disablePreStep = false
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

const createScene = async function () {
    const scene = new BABYLON.Scene(engine)
    const havokInstance = await HavokPhysics()
    const hk = new BABYLON.HavokPlugin(true, havokInstance)
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk)

    createLight(scene)
    loadBox(scene)
    // loadSphere(scene);

    applyGroundTexture(CreateGround(scene), scene)

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
        app.game.scene.onPointerMove = function (evt, pickResult) {
          console.log('evt', evt);
          console.log('pickResult', pickResult);
            // Vérifiez que le curseur pointe sur une tour
            if (pickResult.hit && pickResult.pickedMesh.name === 'tower') {
                var tower = pickResult.pickedMesh
                console.log('ciblé');
                // Continuer avec le calcul de la distance
            }
        }
        // app.char = checkForPlayerRotate(app.char)
    })
    return app
}

//Main :
;(async () => {
    app.game.scene = await createScene()
    app.char = await loadModel(app.game.scene)
    app.game.camera = createCamera(app.game.scene, app.char.player)
    app.menu.scene = createMenuScene(app.game.scene, app.game.camera)
    // const tower = createTower(10, 30, 10, app.game.scene)
    const tower = mapTower.forEach((position) => {
        console.log('positon', position)
        createTower(10, 70, 10, position.x, position.z, app.game.scene)
    })

    // physicsViewer = new BABYLON.Debug.PhysicsViewer()
    // for (const mesh of app.game.scene.rootNodes) {
    //     if (mesh.physicsBody) {
    //         const debugMesh = physicsViewer.showBody(mesh.physicsBody)
    //     }
    // }

    // var raycastResult = new BABYLON.PhysicsRaycastResult()
    // var start = new BABYLON.Vector3(1, 20, 2)
    // var end = new BABYLON.Vector3(1, -20, 2)
    // physicsEngine.raycastToRef(start, end, raycastResult)
    // if (raycastResult.hasHit) {
    //     console.log('Collision at ', raycastResult.hitPointWorld)
    // }

    let crosshair = addCrosshair(app.game.scene, app.game.camera)
    app = await setupGameLogic(app)

    engine.runRenderLoop(function () {
        if (!app.isPaused) {
            app.game.scene.render()
        }
        // scene.render();
    })
    window.addEventListener('resize', function () {
        engine.resize()
    })
    app.game.scene.createDefaultEnvironment({
        createGround: false,
        createSkybox: false,
    })
})()
