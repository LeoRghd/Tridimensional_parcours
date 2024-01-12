var loadPlayer = async (camera, scene) =>{
    const model = await BABYLON.SceneLoader.ImportMeshAsync(null, "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene);
    const player = model.meshes[0];
    player.scaling.setAll(0.1);
    camera.setTarget(player);

    return player
};

