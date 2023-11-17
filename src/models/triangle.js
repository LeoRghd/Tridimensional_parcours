var createThickTriangle = function (scene, x, y, z, baseLength, height, thickness) {
  const halfBase = baseLength / 2;
  const halfHeight = height / 2;

  // Coordonnées des sommets
  const vertices = [
    new BABYLON.Vector3(-halfBase, 0, 0),
    new BABYLON.Vector3(halfBase, 0, 0),
    new BABYLON.Vector3(0, halfHeight, 0),
    new BABYLON.Vector3(0, 0, thickness)
  ];

  // Indices des faces
  const indices = [
    0, 1, 2,
    0, 2, 3,
    2, 1, 3,
    0, 3, 1
  ];

  // Crée le maillage à partir des données des sommets et des faces
  const extrudedMesh = new BABYLON.Mesh("thickTriangle", scene);
  const vertexData = new BABYLON.VertexData();

  vertexData.positions = BABYLON.Vector3.FromArray(vertices.map(v => [v.x, v.y, v.z])).toArray();
  vertexData.indices = indices;

  vertexData.applyToMesh(extrudedMesh);

  // Positionne le maillage à la position spécifiée
  extrudedMesh.position = new BABYLON.Vector3(x, y, z);

  // Ajuste la rotation du maillage pour qu'il pointe vers l'axe X
  extrudedMesh.rotation.y = Math.PI / 2;  // Rotation de 90 degrés autour de l'axe Y

  // Crée un matériau pour le maillage
  const material = new BABYLON.StandardMaterial("thickTriangleMaterial", scene);
  material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Rouge
  extrudedMesh.material = material;

  return extrudedMesh;
};

// Exemple d'utilisation : créer un prisme triangulaire épais avec des lignes égales pointant vers l'axe X
