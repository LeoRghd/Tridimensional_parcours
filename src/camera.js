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

function createFollowCamera(scene, target) {
  const camera = new BABYLON.FollowCamera('followCamera', new BABYLON.Vector3(0, 10, -20), scene);
  camera.radius = 10;
  camera.heightOffset = 5;
  camera.rotationOffset = 1;
  camera.cameraAcceleration = 0.1;
  camera.maxCameraSpeed = 5;
  camera.lockedTarget = target;

  return camera;
}