var createSphere = function (scene, diameter = 2, x=0, y=0, z=0, name) {
  var sphere = BABYLON.MeshBuilder.CreateSphere(name, { diameter: diameter }, scene);
  // Ajoutez d'autres propriétés ou logique pour la sphère si nécessaire
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;

  return sphere;
};
