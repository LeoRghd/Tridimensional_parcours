var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);


const loadModel = async (scene) =>{
  const player = await loadPlayer(scene)
  return player;
};


const loadBox = function (scene) {
  const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
  box.position = new BABYLON.Vector3(0, 10, 0);
  const boxAggregate = new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.BOX, {mass: 1, restitution : 0.75}, scene);
};


const loadSphere = function (scene) {
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 3}, scene);
  sphere.position = new BABYLON.Vector3(1,5,0);
  const sphereBody = new BABYLON.PhysicsBody(sphere, BABYLON.PhysicsMotionType.DYNAMIC, false, scene);
  const sphereShape = new BABYLON.PhysicsShapeSphere(
    new BABYLON.Vector3(0,0,0), // center of the sphere in local space
    1.5, // radius of the sphere
    scene // containing scene
  );
  sphereBody.setMassProperties({mass:1
  });
  sphereBody.shape = sphereShape;
}



const createScene = async function () {
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const hk = new BABYLON.HavokPlugin(true, havokInstance)
  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);

  createLight(scene);
  // loadBox(scene);
  // loadSphere(scene);

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

const setupGameLogic = function (camera, scene, player, playerAggregate) {
  const keyStatus = getKeyStatus(scene);
  scene.onBeforeRenderObservable.add(() => {
    camBehindPlayer(camera, player, keyStatus);
    handlePlayerMovement(keyStatus, scene, playerAggregate);
  });
};

//Main :
(async () => {
  const scene = await createScene();
  const camera = createCamera(scene);
  const {player, playerAggregate} = await loadModel(scene);

  physicsViewer = new BABYLON.Debug.PhysicsViewer();
  for (const mesh of scene.rootNodes) {
      if (mesh.physicsBody) {
          const debugMesh = physicsViewer.showBody(mesh.physicsBody);
      }
  }

  setupGameLogic(camera, scene, player, playerAggregate);

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