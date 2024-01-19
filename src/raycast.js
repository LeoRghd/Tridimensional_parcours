const drawRay = function (ray, scene, app_ray) {
    var app_ray_tmp = new BABYLON.RayHelper(ray)
    app_ray_tmp.show(scene)
    if (app_ray) {
        app_ray.dispose()
    }
    app_ray = app_ray_tmp
    return app_ray
}

const raycast = function (scene, camera, player, app_ray) {
    var distance = null
    var centerX = scene.getEngine().getRenderWidth() / 2
    var centerY = scene.getEngine().getRenderHeight() / 2
    origin = player.posistion
    var ray = scene.createPickingRay(
        centerX,
        centerY,
        BABYLON.Matrix.Identity(),
        camera
    )

    // app_ray = drawRay(ray, scene)

    var pickResult = scene.pickWithRay(ray)
    if (pickResult.hit) {
        if (pickResult.pickedMesh.id === 'tower') {
            // console.log('pickResult', pickResult)
            var hitPoint = pickResult.pickedPoint
            // console.log('hitPoint', hitPoint)
            distance = BABYLON.Vector3.Distance(player.position, hitPoint)
            console.log('distance', distance)
        }
    }
    let crosshair = addCrosshair(app.game.scene, app.game.camera, distance)
    return app_ray, distance
}
