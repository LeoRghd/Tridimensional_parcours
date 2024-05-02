const loadCanyonScene = async (scene) => {
  const canyon = await  BABYLON.SceneLoader.ImportMeshAsync(
    '',
    './utils/assets/',
    'map3.glb',
    scene
  )

  // for (let i = 0; i < canyon.meshes.length; i++) {
  //   canyon.meshes[i].id = 'touch'
  //   canyon.meshes[i].checkCollisions = true
  //   canyon.meshes[i].isPickable = true
  //   console.log('canyon.meshes[i]', canyon.meshes[i]);
  //   new BABYLON.PhysicsImpostor(
  //     canyon.meshes[i],
  //     BABYLON.PhysicsImpostor.MeshImpostor,
  //     { mass: 1, restitution: 0.1 },
  //     scene
  //   )
  // }


  console.log('canyon', canyon);

  return canyon
}