function cameraColision(app) {
    for (var i = 0; i < app.game.scene.meshes.length; i++) {
        if (app.game.scene.meshes[i].isVisible == true) {
            app.game.scene.meshes[i].checkCollisions = true
        }
    }
    return app
}

function createFollowCamera(scene, player, lock) {
    const camera = new BABYLON.ArcRotateCamera(
        'followCamera',
        -30,
        0,
        4,
        new BABYLON.Vector3(0, 0, 10),
        scene
    )

    camera.speed = 0.1
    camera.attachControl(scene, true)

    camera.lowerBetaLimit = 0.1
    const cylinder = player.parent
    // const parent =
    const head = cylinder.getChildren().find(function (element) {
        return element.name === 'head'
    })
    camera.setTarget(head)
    camera.checkCollisions = true
    return camera
}
