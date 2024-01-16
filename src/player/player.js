var loadPlayer = async (scene) =>{
    const {meshes} = await BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene);
    const player = meshes[0];
    console.log(meshes)
    player.scaling.setAll(0.1);
    player.position = new BABYLON.Vector3(0, 1, 0);
    // player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.MeshImpostor, {mass: 1, restitution : 0.5}, scene);

    return player
};

 