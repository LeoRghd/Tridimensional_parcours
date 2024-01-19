var createTower = function (w, h, d, x, z, scene) {
    var tower = BABYLON.MeshBuilder.CreateBox(
        'box',
        { width: w, height: h, depth: d },
        scene
    )
    tower.position.x = x
    tower.position.y = h/2 // Positionnement pour que la base soit sur le sol
    tower.position.z = z
    return tower
}
