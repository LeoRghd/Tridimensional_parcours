var createCamera = function (scene, Targets) {
  const camera = new BABYLON.FreeCamera("camera1", 
      new BABYLON.Vector3(50, 50, 50), 
      scene);
  // Targets the camera to scene origin
  camera.setTarget(new BABYLON.Vector3(0, 50, 0));
  // Attaches the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
}