
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);


const loadModel = async (camera) =>{
  const model = await BABYLON.SceneLoader.ImportMeshAsync(null, "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene);
  const player = model.meshes[0];
  player.scaling.setAll(0.1);
  camera.setTarget(player);


  const walkAnim = scene.getAnimationGroupByName("walking");
  const walkBackAnim = scene.getAnimationGroupByName("walkingBack");
  const idleAnim = scene.getAnimationGroupByName("Idle");
  const sambaAnim = scene.getAnimationGroupByName("Samba");

  const playerWalkSpeed = 0.03;
  const playerRunSpeed = 0.1;
  const playerSpeedBackwards = 0.01;
  const playerRotationSpeed = 0.01;
  const runAnimSpeed = 1;
  const walkAnimSpeed = 1;

  let speed;
  let animSpeed;

  let keyStatus = {
    z: false,
    s: false,
    q: false,
    d: false,
    b: false,
    Shift: false,
  };

  scene.actionManager = new BABYLON.ActionManager(scene);

  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyDownTrigger,
       (event) => {
        let key = event.sourceEvent.key;
        if(key !== "Shift"){
          key = key.toLowerCase();
        }
        if(key in keyStatus) {
          keyStatus[key] = true;
        }
        console.log(keyStatus);
      }
    )
  );
};



const createScene = function () {
  // Creates a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  // Creates and positions a free camera
  // var sphere = createSphere(scene, 2, 30, 10);
  // var character = createSphere(scene, 10, 0, 20, 0, "character", true);

  var camera = createFollowCamera(scene);
  camera.wheelPrecision = 10;
  var light = createLight(scene);
  var ground = CreateGround(scene);



  // const texture = new BABYLON.Texture("./utils/img/guts_dodo.jpg", scene);
  // const material = new BABYLON.StandardMaterial("material", scene);
  // material.diffuseTexture = texture;
  // ground.material = material;

  loadModel(camera);

  return scene;
};



var scene = createScene();



engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

scene.createDefaultEnvironment({
  createGround: false,
  createSkybox: false
});
