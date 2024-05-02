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
        Math.PI / 2, // Initial polar angle
        4,
        new BABYLON.Vector3(0, 0, 10),
        scene
    )

    camera.speed = 0.2; // Controls the speed of camera movement
    camera.inertia = 0; // Stops the camera from continuing to move after the mouse has stopped moving
    camera.angularSensibility = 1000; // Controls the speed of rotation. Lower value = faster rotation.

    camera.attachControl(scene, true);

    camera.lowerBetaLimit = 0; // Allow the camera to look down
    camera.upperBetaLimit = Math.PI; // Allow the camera to look up

    const cylinder = player.parent;
    const head = cylinder.getChildren().find(function (element) {
        return element.name === 'head';
    });

    camera.setTarget(head);
    // camera.checkCollisions = true;

    // Additional properties for ArcRotateCamera
    // camera.upperBetaLimit = Math.PI / 2; // Limit vertical rotation
    // camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
    // camera.lowerRadiusLimit = 5;
    camera.radius = 10; // Distance from the target object
    camera.minZ = 0.1; // Near clip plane
    camera.maxZ = 42000; // Far clip plane

    return camera;
}
