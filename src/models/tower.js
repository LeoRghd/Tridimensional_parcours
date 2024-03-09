var createTower = function (w, h, d, x, z, scene) {
    var tower = BABYLON.MeshBuilder.CreateBox(
        'touch',
        { width: w, height: h, depth: d },
        scene
    )
    tower.position.x = x
    tower.position.y = h / 2 // Positionnement pour que la base soit sur le sol
    tower.position.z = z
    tower.checkCollisions = true

    var material = new BABYLON.StandardMaterial('touch', scene)

    // Appliquer la texture au matériau
    material.diffuseTexture = new BABYLON.Texture("utils/textures/rock.png", scene)

    // Appliquer le matériau à la tour
    tower.material = material

    const towerAggregate = new BABYLON.PhysicsAggregate(
        tower,
        BABYLON.PhysicsShapeType.BOX,
        { mass: 0, restitution: 0.1 },
        scene
    )
    return tower
}
