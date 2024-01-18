var CreateGround = function (scene) {
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    ground.position = new BABYLON.Vector3(0,0,0)
    const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass: 0}, scene);
    return ground;
}