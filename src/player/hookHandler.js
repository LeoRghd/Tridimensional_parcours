const hookHandler = (player, sideHook) => {
    const cylinder = player.parent
    const hookMesh = cylinder.getChildren().filter(function (element) {
        return (element.name = sideHook)
    })
    var hookPosition = hookMesh.getAbsolutePosition().clone()
    var cameraPosition = camera.position
    // Calculez la direction du rayon
    var direction = camera
        .getDirection(new BABYLON.Vector3(0, 0, 1))
        .normalize()
        .clone()

    var rayMaterial = new BABYLON.StandardMaterial('rayMaterial', scene)
    rayMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0) // Rouge
    hook
}
