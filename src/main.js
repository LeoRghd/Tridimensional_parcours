var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  // Creates a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  // Creates and positions a free camera
  var sphere = createSphere(scene, 2, 30, 10);
  var character = createSphere(scene, 10, 0, 20, 0, "character", true);

  var camera = createCamera(scene, character);
  var light = createLight(scene);
  var ground = CreateGround(scene);



  const texture = new BABYLON.Texture("./utils/img/guts_dodo.jpg", scene);
  const material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = texture;
  ground.material = material;

  return scene;
};


var scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
