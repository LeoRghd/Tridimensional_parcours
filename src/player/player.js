var loadPlayer = async (scene) =>{
    const model = await BABYLON.SceneLoader.ImportMeshAsync("", "./utils/assets/", "SkinModeling.glb", scene);
    const player = model.meshes[0];
    player.scaling.setAll(1);

    player.position = new BABYLON.Vector3(0, 1, 0);

    const playerAggregate = new BABYLON.PhysicsAggregate(player, BABYLON.PhysicsShapeType.CYLINDER, {mass: 1, restitution: 0.75}, scene);
    const playerShape = new BABYLON.PhysicsShapeCylinder(
        new BABYLON.Vector3(0, -0.5, 0),    // starting point of the cylinder segment
        new BABYLON.Vector3(0,  1.5, 0),    // ending point of the cylinder segment
        0.3,                                  // radius of the cylinder
        scene 
    );
    playerAggregate.body.shape = playerShape
    playerAggregate.body.setMassProperties({mass:1});
    // console.log(playerBody.parent)
    // playerBody.parent = player;
    console.log(playerAggregate.transformNode.getAbsolutePosition());



    return {player, playerAggregate}
};