var CreateGround = function (scene) {
    var ground = BABYLON.MeshBuilder.CreateGround(
        'touch',
        { width: 10000, height: 8000 },
        scene
    )
    ground.position = new BABYLON.Vector3(0, 0, 0)
    ground.isPickable = true
    const groundAggregate = new BABYLON.PhysicsAggregate(
        ground,
        BABYLON.PhysicsShapeType.BOX,
        { mass: 0, restitution: 0.1 },
        scene
    )
    return ground
}
