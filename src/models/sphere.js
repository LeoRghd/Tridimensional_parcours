var createSphere = function (scene, diameter = 2, x=0, y=0, z=0, name, is_controllable=false) {
  var sphere = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
  // Ajoutez d'autres propriétés ou logique pour la sphère si nécessaire
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
  
  if(!is_controllable) return sphere
  const spherePosition = new BABYLON.Vector3(0, 1, 0); // Initial position

  const speed = 0.25; // Adjust the movement speed according to your needs
  const damping = 1; // Adjust the damping factor for quick direction changes
  let velocity = new BABYLON.Vector3(0, 0, 0);



  window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'z':
            velocity.z = -speed;
            break;
        case 'q':
            velocity.x = speed;
            break;
        case 's':
            velocity.z = speed;
            break;
        case 'd':
            velocity.x = -speed;
            break;
    }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
      case 'z':
      case 's':
          velocity.z = 0;
          break;
      case 'q':
      case 'd':
          velocity.x = 0;
          break;
  }
});

// Update the position of the sphere on each frame
scene.onBeforeRenderObservable.add(() => {
    // Update the position based on the velocity
    spherePosition.addInPlace(velocity);

    velocity.scaleInPlace(damping);
    // Update the position of the sphere
    sphere.position.copyFrom(spherePosition);
    // camera.position.copyFrom(sphere.position);
});
// scene.activeCamera = camera;


return sphere;
};
