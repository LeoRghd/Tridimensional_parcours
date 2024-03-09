function setRotation(mesh, x, y, z) {
    mesh.rotation.x = x
    mesh.rotation.y = y
    mesh.rotation.z = z
}

function setPosition(mesh, x, y, z) {
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z
}

function setOlympicColor(mesh, scene) {
    // Couleurs olympiques
    var colors = ['#0085C7', '#F4C300', '#000000', '#009F3D', '#DF0024']

    // Choisir une couleur aléatoire
    var color = colors[Math.floor(Math.random() * colors.length)]

    // Créer un matériau avec la couleur choisie
    var material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseColor = new BABYLON.Color3.FromHexString(color)

    // Appliquer le matériau à l'objet
    mesh.material = material
}

function createRing(scene, name, diameter, thickness, tessellation, updatable) {
    var ring = BABYLON.MeshBuilder.CreateTorus(
        name,
        {
            diameter: diameter,
            thickness: thickness,
            tessellation: tessellation,
        },
        scene,
        updatable
    )
    ring.checkCollisions = true
    console.log('ring', ring)
    setRotation(ring, Math.PI / 2, 0, 0)
    setPosition(ring, 0, 40, 0)
    setOlympicColor(ring, scene)

    return ring
}
