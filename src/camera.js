var createCamera = function (scene, Targets) {
  const camera = new BABYLON.FreeCamera("camera1", 
      new BABYLON.Vector3(0, 50, 0), 
      scene);
  // Targets the camera to scene origin
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  // Attaches the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
}

function createFollowCamera(scene) {
  const camera = new BABYLON.ArcRotateCamera('followCamera', 0 ,10, 10, new BABYLON.Vector3(0,0,0), scene);
  camera.speed = 0.1;
  camera.attachControl(scene, true);

  return camera;
}