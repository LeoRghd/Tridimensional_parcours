var createTower = function (w, h, d, x, z, scene) {
    var tower = BABYLON.MeshBuilder.CreateBox(
        'tower',
        { width: w, height: h, depth: d },
        scene
    )
    tower.position.x = x
    tower.position.y = h/2 // Positionnement pour que la base soit sur le sol
    tower.position.z = z
    tower.checkCollisions = true

    const towerAggregate = new BABYLON.PhysicsAggregate(tower, BABYLON.PhysicsShapeType.BOX, {mass: 0}, scene)
    return tower
}
