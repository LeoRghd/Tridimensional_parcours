
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);


const loadModel = async (camera) =>{
  const model = await BABYLON.SceneLoader.ImportMeshAsync(null, "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene);
  const player = model.meshes[0];
  player.scaling.setAll(0.1);
  camera.setTarget(player);


  const walkAnim = scene.getAnimationGroupByName("Walking");
  const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
  const idleAnim = scene.getAnimationGroupByName("Idle");
  const sambaAnim = scene.getAnimationGroupByName("Samba");

  const playerWalkSpeed = 0.03;
  const playerRunSpeed = 0.1;
  const playerSpeedBackwards = 0.01;
  const playerRotationSpeed = 0.01;
  const runAnimSpeed = 3;
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
      }
    )
  );

  scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnKeyUpTrigger, (event) => {
      let key = event.sourceEvent.key;
      if (key !== "Shift"){
        key = key.toLowerCase();
      }
      if (key in keyStatus) {
        keyStatus[key] = false
      }
    }
  ))



  let moving = false;
  scene.onBeforeRenderObservable.add(() => {
    if (keyStatus.z ||
      keyStatus.s ||
      keyStatus.q ||
      keyStatus.d ||
      keyStatus.b) {
        moving = true;
        if (keyStatus.s && !keyStatus.z) {
          speed = -playerSpeedBackwards;
          walkBackAnim.start(true, 1, walkBackAnim.from, walkBackAnim.to, false);
        }
        else if (keyStatus.z || keyStatus.q || keyStatus.d) {
          speed = keyStatus.Shift ? playerRunSpeed : playerWalkSpeed;
          animSpeed = keyStatus.Shift ? runAnimSpeed : walkAnimSpeed;
          walkAnim.speedRatio = animSpeed;
          walkAnim.start(true, animSpeed, walkAnim.from, walkAnim.to, false);
        }
        if (keyStatus.q) {
          player.rotate(BABYLON.Vector3.Up(), -playerRotationSpeed)
        }
        if (keyStatus.d) {
          player.rotate(BABYLON.Vector3.Up(), playerRotationSpeed)
        }
        if (keyStatus.b) {
          sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
        }
        player.moveWithCollisions(player.forward.scaleInPlace(speed));
      } else if (moving){
        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
        sambaAnim.stop();
        walkAnim.stop();
        walkBackAnim.stop();
        moving = false;
      }
  })
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
