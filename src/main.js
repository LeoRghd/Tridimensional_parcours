var canvas = document.getElementById('renderCanvas')
var engine = new BABYLON.Engine(canvas, true)

var app = {}
app.state = 'menu'
app.game = {}
app.menu = {}
app.char = {}
app.ray = {}
app.ground = {}
app.crossHair = {}
app.char.isMoving = false
app.isPaused = false

const loadModel = async (scene) => {
    const player = await loadPlayer(scene)
    return player
}

// const loadBox = function (scene) {
//     const box = BABYLON.MeshBuilder.CreateBox('box', { size: 20 }, scene)
//     box.position = new BABYLON.Vector3(10, 10, 0)
//     const boxAggregate = new BABYLON.PhysicsAggregate(
//         box,
//         BABYLON.PhysicsShapeType.BOX,
//         { mass: 100000, restitution: 0.1 },
//         scene
//     )
//     boxAggregate.body.setMotionType(BABYLON.PhysicsMotionType.static)
//     boxAggregate.body.disablePreStep = false
// }

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
    // loadBox(scene)
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
        app.ray = raycast(
            app.game.scene,
            app.game.camera,
            app.char.player,
            app.crossHair.textTexture,
            app.ray
        )
        // app.char = checkForPlayerRotate(app.char)
    })
    return app
}

//Main :
;(async () => {
    app.game.scene = await createScene()
    app.char = await loadModel(app.game.scene)
    app.game.camera = createCamera(app.game.scene, app.char.player)
    app = createMenuScene(app)
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
              app.game.scene.render()
            }
          // case 'settings':
          //   app.settings.scene.render()
          // case 'pause':
          //   app.pause.settings
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
