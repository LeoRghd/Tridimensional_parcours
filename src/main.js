var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);


const loadModel = async (scene) =>{
  const player = await loadPlayer(scene)
  return player;
};


const loadBox = function (scene) {
  const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
  box.position = new BABYLON.Vector3(0, 10, 0);
  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, restitution : 0.5}, scene);
  return box;
};






const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON));
  createLight(scene);
  loadBox(scene);
  applyGroundTexture(CreateGround(scene), scene);
  return scene;
};


const createCamera = function (scene) {
  var camera = createFollowCamera(scene, false);
  camera.wheelPrecision = 10;
  return camera;
};


const applyGroundTexture = function (ground, scene) {
  const texture = new BABYLON.Texture("./utils/img/guts_dodo.jpg", scene);
  const material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = texture;
  ground.material = material;
};

const setupGameLogic = function (camera, scene, player) {
  const keyStatus = getKeyStatus(scene);
  scene.onBeforeRenderObservable.add(() => {
    camBehindPlayer(camera, player, keyStatus);
    handlePlayerMovement(keyStatus, scene, player);
  });
};

//Main :
(async () => {
  const scene = createScene();
  const camera = createCamera(scene);
  const player = await loadModel(scene);

  setupGameLogic(camera, scene, player);

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
})();