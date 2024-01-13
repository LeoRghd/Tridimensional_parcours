// var canvas = document.getElementById("renderCanvas");
// var engine = new BABYLON.Engine(canvas, true);
// // const loadPlayer = require('./player/player')
// // import {loadPlayer} from './player/player';

// // var jsplugin = new BABYLON.CannonJSPlugin();

// const loadModel = async (camera, scene) =>{
//   // const box = BABYLON.MeshBuilder.CreateBox("box", {size:2});
//   // box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0.1, restitution: 0.9}, scene)
//   // player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.CylinderImpostor, {mass: 1, restitution : 0.9}, scene);

  
//   const player = await loadPlayer(camera, scene)
  
//   const keyStatus = getKeyStatus(scene)

//   scene.onBeforeRenderObservable.add(() => {
//     camBehindPlayer(camera, player);
//     handlePlayerMovement(keyStatus, scene, player);
//   })

// };


// const createScene = function () {
//   const scene = new BABYLON.Scene(engine);

//   // Enable physics
//   // scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON));
  

//   var camera = createFollowCamera(scene, false);
//   camera.wheelPrecision = 10;
//   createLight(scene);
//   var ground = CreateGround(scene);


//   const texture = new BABYLON.Texture("./utils/img/guts_dodo.jpg", scene);
//   const material = new BABYLON.StandardMaterial("material", scene);
//   material.diffuseTexture = texture;
//   ground.material = material;

//   loadModel(camera, scene);


//   return scene;
// };


// var scene = createScene();



// engine.runRenderLoop(function () {
//   scene.render();
// });

// window.addEventListener("resize", function () {
//   engine.resize();
// });

// scene.createDefaultEnvironment({
//   createGround: false,
//   createSkybox: false
// });
