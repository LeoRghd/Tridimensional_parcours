function camBehindPlayer(camera, player) {
  camera.setTarget(player);
  let previousCameraDirection = new BABYLON.Vector3.Zero();
  let cameraDirection = camera.getTarget().subtract(camera.position).normalize();

  // Vérifiez si la direction de la caméra a significativement changé
  if (BABYLON.Vector3.DistanceSquared(previousCameraDirection, cameraDirection) > 0.01) {
      // Calculez l'angle de rotation pour la caméra
      let cameraAngleY = Math.atan2(cameraDirection.x, cameraDirection.z);

      // Obtenez l'angle de rotation actuel du personnage
      let playerAngleY = player.rotationQuaternion.toEulerAngles().y;

      // Calculez la différence d'angle
      let angleDifference = cameraAngleY - playerAngleY;

      // Normalisez l'angle pour qu'il soit entre -Math.PI et Math.PI
      angleDifference = (angleDifference + Math.PI) % (2 * Math.PI) - Math.PI;

      // Appliquez la rotation seulement si la différence est significative
      if (Math.abs(angleDifference) > 0.05) { // Seuil ajustable
          player.rotate(BABYLON.Vector3.Up(), angleDifference);
      }

      // Mise à jour de la direction précédente de la caméra
      previousCameraDirection = cameraDirection.clone();
  }
}

function createFollowCamera(scene, lock) {
  const camera = new BABYLON.ArcRotateCamera('followCamera', -30,0, 4, new BABYLON.Vector3(0,0,10), scene);
  camera.speed = 0.1;
  camera.attachControl(scene, true);

  if (!lock) return camera
  
  var isLocked = false;

  	// On click event, request pointer lock
	scene.onPointerDown = function (evt) {
		
		//true/false check if we're locked, faster than checking pointerlock on each single click.
		if (!isLocked) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}
		
		//continue with shooting requests or whatever :P
		if (evt === 0) {castRay()}; //(left mouse click)
		//evt === 1 (mouse wheel click (not scrolling))
		//evt === 2 (right mouse click)
	};
	

	// Event listener when the pointerlock is updated (or removed by pressing ESC for example).
	var pointerlockchange = function () {
		var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
		
		// If the user is already locked
		if (!controlEnabled) {
			//camera.detachControl(canvas);
			isLocked = false;
		} else {
			//camera.attachControl(canvas);
			isLocked = true;
		}
	};
	
	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

  //Désactiver le clic drag de la caméra
  // camera.inputs.attached.pointers.buttons = [ 2]
  return camera;
}