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
    const distanceBehindCharacter = 0.5
    const cylinder = player.parent
    const head = cylinder.getChildren().find(function (element) {
        return element.name === 'crotch'
    })
    var hits = []

    const direction = camera.getForwardRay().direction
    var playerPosition = head.getAbsolutePosition()
    // origin.y += 0.5
    const origin = {
        x: playerPosition.x - direction.x * distanceBehindCharacter,
        y: (playerPosition.y += 0.5),
        z: (playerPosition.z = direction.z * distanceBehindCharacter),
    }
    const originVector  = new BABYLON.Vector3(origin.x, origin.y, origin.z)

    var ray = new BABYLON.Ray(originVector, direction, 500)
    // let rayHelper = new BABYLON.RayHelper(ray)
    // rayHelper.show(scene)
    // BABYLON.RayHelper.CreateAndShow(ray, scene, new BABYLON.Color3(1, 1, 0.1))
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
