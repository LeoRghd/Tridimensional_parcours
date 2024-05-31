var canvas = document.getElementById('renderCanvas')
var engine = new BABYLON.Engine(canvas, true)

var createdObjects = []
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
app.timer = {
    startTime: null,
    pauseTime: null,
    elapsedPauseTime: 0, // To accumulate paused time
    timerText: null,
    start: function () {
        if (this.pauseTime !== null) {
            // Calculate the duration of the current pause
            let currentPauseDuration = Date.now() - this.pauseTime
            this.elapsedPauseTime += currentPauseDuration
            this.pauseTime = null
        }
        if (this.startTime === null) {
            this.startTime = Date.now()
        }
    },
    pause: function () {
        if (this.pauseTime === null) {
            // Only set pauseTime if not already paused
            this.pauseTime = Date.now()
        }
    },
    reset: function () {
        this.startTime = Date.now()
        this.pauseTime = null
        this.elapsedPauseTime = 0
    },
}


const resest = function (app) {
  app = {}
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
  app.timer = {
      startTime: null,
      pauseTime: null,
      elapsedPauseTime: 0, // To accumulate paused time
      timerText: null,
      start: function () {
          if (this.pauseTime !== null) {
              // Calculate the duration of the current pause
              let currentPauseDuration = Date.now() - this.pauseTime
              this.elapsedPauseTime += currentPauseDuration
              this.pauseTime = null
          }
          if (this.startTime === null) {
              this.startTime = Date.now()
          }
      },
      pause: function () {
          if (this.pauseTime === null) {
              // Only set pauseTime if not already paused
              this.pauseTime = Date.now()
          }
      },
      reset: function () {
          this.startTime = Date.now()
          this.pauseTime = null
          this.elapsedPauseTime = 0
      },
  }
  

}
const onOffPause = (lock) => {
    if (lock) {
        app.isPaused = false;
        app.timer.start();  // Ensure this is called only when resuming the game
    } else {

        app.isPaused = true;
        app.timer.pause();  // Pause the timer when the game is paused
    }
    console.log('app.isPaused', app.isPaused);
};

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
    var skybox = BABYLON.Mesh.CreateBox('skyBox', 40000.0, scene)
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

const createCylinder = function (scene) {
  const cylinder = BABYLON.MeshBuilder.CreateCylinder('touch', { height: 8000, diameter: 1500 }, scene);
  const material = new BABYLON.StandardMaterial("material", scene);
  cylinder.position = new BABYLON.Vector3(7500, 5000, 7500);
  material.diffuseColor = new BABYLON.Color3(0, 1, 0);
  material.alpha = 0.5;

  // Indiquer que le matériau doit être rendu avec sa transparence
  material.hasAlpha = true;
  cylinder.material = material;
  // cylinder.renderingGroupId = 1;

  const endAggregate = new BABYLON.PhysicsAggregate(
    cylinder,
    BABYLON.PhysicsShapeType.CYLINDER,
    { mass: 0, restitution: 0.1 },
    scene
  );
  return cylinder;
}

createStartZone = function (scene) {
    const cube = BABYLON.MeshBuilder.CreateBox('touch', { size: 1000 }, scene);
    const material = new BABYLON.StandardMaterial("material", scene);
    cube.position = new BABYLON.Vector3(-7500, 1500, -7500);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    material.alpha = 0.5;
    cube.material = material;
    const startAggregate = new BABYLON.PhysicsAggregate(
      cube,
      BABYLON.PhysicsShapeType.BOX,
      { mass: 0, restitution: 0.1 },
      scene
    );
    return cube;
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

    createLight(scene)
    createSunLight(scene)
    createSceneAxes(scene)
    createSkyLight(scene)
    // loadBox(scene)
    // loadSphere(scene)
    createCylinder(scene)
    createStartZone(scene);
    CreateGround(scene)
    // applyGroundTexture(CreateGround(scene), scene)
    // await loadCanyonScene(scene)
    scene.collisionsEnabled = true
    return scene
}
/////////////////////////////////////////////////////////////////////////

// Creative mode

// const keysPressed = {};
// const rotationStep = Math.PI / 8;

// function createObjectAtCameraTarget(camera, scene) {
//     const position = camera.getTarget().clone();
//     const object = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 50, diameter: 25 }, scene);
//     object.position = position;

//     const cylinderAggregate = new BABYLON.PhysicsAggregate(
//         object,
//         BABYLON.PhysicsShapeType.CYLINDER,
//         { mass: 1, restitution: 0.1 },
//         scene
//     );
//     cylinderAggregate.body.setMotionType(BABYLON.PhysicsMotionType.STATIC);
//     cylinderAggregate.body.setMassProperties({
//         inertia: new BABYLON.Vector3(0, 0, 0),
//     });

//     createdObjects.push(object);
// }

// function removeLastObject() {
//     if (createdObjects.length > 0) {
//         const lastObject = createdObjects.pop();
//         lastObject.dispose();
//     }
// }

// function applyRotationToLastObject(rotationDelta) {
//     if (createdObjects.length > 0) {
//         const lastObject = createdObjects[createdObjects.length - 1];

//         // Get the current rotation
//         const currentRotation = lastObject.rotation.clone();
//         console.log('Current rotation:', currentRotation);

//         // Apply the rotation delta
//         currentRotation.x += rotationDelta.x;
//         currentRotation.y += rotationDelta.y;
//         currentRotation.z += rotationDelta.z;

//         // Update the object's rotation
//         lastObject.rotation = currentRotation;
//         console.log('Updated rotation:', lastObject.rotation);
//     }
// }

// function handleRotation(event, rotationStep) {
//     let rotationDelta = new BABYLON.Vector3(0, 0, 0);

//     switch (event.key) {
//         case 't':
//             if (createdObjects.length > 0) {
//                 console.log('Last object rotation:', createdObjects[createdObjects.length - 1].rotation);
//             }
//             break;
//         case 'm': // Rotate around X axis
//             rotationDelta.x += rotationStep;
//             break;
//         case 'l': // Rotate around X axis
//             rotationDelta.x -= rotationStep;
//             break;
//         case 'k': // Rotate around Y axis
//             rotationDelta.y -= rotationStep;
//             break;
//         case 'j': // Rotate around Y axis
//             rotationDelta.y += rotationStep;
//             break;
//         case 'h': // Rotate around Z axis counterclockwise
//             rotationDelta.z -= rotationStep;
//             break;
//         case 'g': // Rotate around Z axis clockwise
//             rotationDelta.z += rotationStep;
//             break;
//         default:
//             return; // Do nothing if it's not one of the rotation keys
//     }

//     applyRotationToLastObject(rotationDelta);
// }

// window.addEventListener("keydown", function (event) {
//     handleRotation(event, rotationStep);
// });

// window.addEventListener("keydown", function (event) {
//     switch (event.key) {
//         case 'c':
//             console.log('Create object');
//             createObjectAtCameraTarget(app.game.camera, app.game.scene);
//             break;
//         case 'r':
//             console.log('Remove object');
//             removeLastObject();
//             break;
//         case 'p':
//             console.log('Camera position:', app.game.camera.position);
//             break;
//     }
// });




/////////////////////////////////////////////////////////////////////////

const createCamera = function (scene, player) {
    var camera = createFollowCamera(scene, player, false)
    camera.wheelPrecision = 10
    // var camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 5,-10), scene);
    // camera.speed = 20.0;
    // camera.inertia = 0.9;
    // camera.attachControl(canvas, true);
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

/////////////////////////////////////////////////////////////////////////

// Function to save created objects to a JSON file
function saveCreatedObjectsToFile() {
    const objectData = createdObjects.map(obj => ({
        position: obj.position.asArray(),
        rotation: obj.rotation.asArray()
    }));
    const dataStr = JSON.stringify(objectData);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'created_objects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

// Function to load created objects from a JSON file
function loadCreatedObjectsFromFile(scene) {
    fetch('created_objects.json')
        .then(response => response.json())
        .then(objectDataArray => {
            objectDataArray.forEach(data => {
                const position = BABYLON.Vector3.FromArray(data.position);
                const rotation = BABYLON.Vector3.FromArray(data.rotation);

                var object = BABYLON.MeshBuilder.CreateCylinder(
                    "touch", { height: 1000, diameter: 75 }, scene)
                object.position = position
                object.rotation = rotation
                object.checkCollisions = true

                var material = new BABYLON.StandardMaterial('touch', scene)

                // Appliquer la texture au matériau
                material.diffuseTexture = new BABYLON.Texture("utils/textures/rock.png", scene)

                // Appliquer le matériau à la tour
                object.material = material

                const cylinderAggregate = new BABYLON.PhysicsAggregate(
                    object,
                    BABYLON.PhysicsShapeType.CYLINDER,
                    { mass: 0, restitution: 0.1 },
                    scene
                );
                

                createdObjects.push(object);
            });
        })
        .catch(error => console.error('Error loading objects:', error));
}

// Add an event listener for the "v" key to save objects
window.addEventListener("keydown", function (event) {
    if (event.key === 'v') {
        saveCreatedObjectsToFile();
    }
});

/////////////////////////////////////////////////////////////////////////


//Main :
;(async () => {
    app.game.scene = await createScene()
    // app.game.scene.debugLayer.show({
    //     showPhysicsImpostor: true
    // });
    loadCreatedObjectsFromFile(app.game.scene);
    setupTimerGUI(app.game.scene)
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
    // const tower = mapTower.forEach((position) => {
    //     createTower(10, 700, 10, position.x, position.z, app.game.scene)
    // })
    app.crossHair = addCrosshair(app.game.scene, app.game.camera)
    app = await setupGameLogic(app)

    engine.runRenderLoop(function () {
        switch (app.state) {
            case 'game':
                if (!app.isPaused) {
                    canvas.requestPointerLock()
                    if (app.timer.startTime === null) {
                        app.timer.start() // Start the timer if not already started
                    }
                    updateTimer() // Update timer continuously while the game is active
                    app.game.scene.render()
                } else {
                    app.pause.scene.render()
                }
                break
            case 'menu':
                app.menu.scene.render()
                break
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
