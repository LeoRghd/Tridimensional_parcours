const drawRay = function (ray, scene, app_ray) {
    var app_ray_tmp = new BABYLON.RayHelper(ray)
    app_ray_tmp.show(scene)
    if (app_ray) {
        app_ray.dispose()
    }
    app_ray = app_ray_tmp
    return app_ray
}

const raycast = function (scene, camera, player, textTexture, app_ray) {
    let distance = null
    const cylinder = player.parent
    const head = cylinder.getChildren().find(function (element) {
        return element.name === 'crotch'
    })
    var hits = []

    const origin = head.getAbsolutePosition()
    // console.log('origin', origin);
    origin.y += 0.5
    const direction = camera.getForwardRay().direction
    var ray = new BABYLON.Ray(origin, direction, 500)
    // let rayHelper = new BABYLON.RayHelper(ray)
    // rayHelper.show(scene)
    var pickResult = scene.pickWithRay(ray)
    if (pickResult.hit) {
        if (pickResult.pickedMesh.id === 'tower') {
            var hitPoint = pickResult.pickedPoint
            distance = BABYLON.Vector3.Distance(origin, hitPoint)
        }
    }
    textTexture = dynamicCrosshair(distance, textTexture)

    return { textTexture, app_ray }
}
