var CreateGround = function (scene) {
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene);
    ground.position = new BABYLON.Vector3(0,0,0)
    const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass: 0}, scene);
    return ground;
}