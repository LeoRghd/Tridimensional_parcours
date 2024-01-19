const getForwardVector = function (camera) {
    let cameraDirection = camera.getForwardRay().direction
    return new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)
}


const applyMovementForce = function (char, direction, speed) {
    let force = direction.scale(speed)
    // console.log('force', force)
    // console.log("location", location)
    // console.log("Applying force:", force, "at location:", location);
    char.playerAggregate.body.setLinearVelocity(force)
}


// const movementDir = new BABYLON.Vector3(0, 0, 0)

var handlePlayerMovement = function (keyStatus, scene, char, camera) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    char.isMoving = false

    let forward = getForwardVector(camera)
    let speed = 50
    if (keyStatus.z || keyStatus.s || keyStatus.q || keyStatus.d) {
        char.isMoving = true
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)

        let movementDir = new BABYLON.Vector3(0, 0, 0)

        if (keyStatus.z) {
            movementDir.addInPlace(forward)
            char.player.parent.lookAt(char.player.parent.position.add(forward), 0, 0, 0)
        }
        if (keyStatus.s) {
            movementDir.subtractInPlace(forward)
            char.player.parent.lookAt(char.player.parent.position.add(new BABYLON.Vector3(-forward.x, 0, -forward.z)), 0, 0, 0)
        }
        if (keyStatus.d) {
            movementDir.subtractInPlace(BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up()))
            char.player.parent.lookAt(char.player.parent.position.add(forward), Math.PI / 2)
        }
        if (keyStatus.q) {
            movementDir.addInPlace(BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up()))
            char.player.parent.lookAt(char.player.parent.position.add(forward), -Math.PI / 2)
        }
        // console.log(movementDir)
        movementDir.normalize()
        console.log("linearVelo", movementDir)
        applyMovementForce(char, movementDir, speed)
        console.log("linearVeloAfter", char.playerAggregate.body.getLinearVelocity())
        return char

    } else {
        if (!char.isMoving){
            applyMovementForce(char, new BABYLON.Vector3(0,0,0), 0)
            runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
            char.isMoving = false
        }
    }

    return char
    
}