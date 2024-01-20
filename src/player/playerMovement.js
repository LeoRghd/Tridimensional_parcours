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

const applyJump = function (char, direction) {
    position = char.player.position
    char.playerAggregate.body.applyImpulse(direction, position)
}
//TODO turn character with camera cuz raycast
// const movementDir = new BABYLON.Vector3(0, 0, 0)

var handlePlayerMovement = function (keyStatus, scene, char, camera) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    let forward = getForwardVector(camera)
    let speed = 50
    jumpMovementDir = new BABYLON.Vector3(0, 0, 0)
    jumpDir = new BABYLON.Vector3(0, 5, 0)
    if (keyStatus.space) {
        console.log('cum')
        char.playerAggregate.body.applyImpulse(
            jumpDir,
            char.player.getAbsolutePosition()
        )
        // jumpMovementDir.addInPlace(jumpDir)
        keyStatus.space = false
    }
    if (keyStatus.z || keyStatus.s || keyStatus.q || keyStatus.d) {
      if (!char.isMoving) {
        var axis = new BABYLON.Vector3(0, 1, 0)
        var angle = Math.PI / 4
        // char.player.rotate(axis, angle, BABYLON.Space.WORLD)
        
      }
        char.isMoving = true
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)

        let movementDir = new BABYLON.Vector3(0, 0, 0)

        // Forward + Left
        if (keyStatus.z && keyStatus.q) {
            movementDir.addInPlace(forward)
            movementDir.addInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                -Math.PI / 4
            )
        }

        //Forward + Right
        if (keyStatus.z && keyStatus.d) {
            movementDir.addInPlace(forward)
            movementDir.subtractInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                Math.PI / 4
            )
        }

        //Backwards + Left
        if (keyStatus.s && keyStatus.q) {
            movementDir.subtractInPlace(forward)
            movementDir.addInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                (-5 * Math.PI) / 8
            )
        }

        //Backwards + Right
        if (keyStatus.s && keyStatus.d) {
            movementDir.subtractInPlace(forward)
            movementDir.subtractInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                (7 * Math.PI) / 8
            )
        }

        //Forward
        if (keyStatus.z && !keyStatus.q && !keyStatus.s && !keyStatus.d) {
            movementDir.addInPlace(forward)
            // console.log(
            //     'char.player.parent.sideOrientation',
            //     char.player.parent
            // )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                0,
                0,
                0
            )
        }

        //Backward
        if (keyStatus.s && !keyStatus.z && !keyStatus.q && !keyStatus.d) {
            movementDir.subtractInPlace(forward)
            char.player.parent.lookAt(
                char.player.parent.position.add(
                    new BABYLON.Vector3(-forward.x, 0, -forward.z)
                ),
                0,
                0,
                0
            )
        }

        //Right
        if (keyStatus.d && !keyStatus.z && !keyStatus.s && !keyStatus.q) {
            movementDir.subtractInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                Math.PI / 2
            )
        }

        //Left
        if (keyStatus.q && !keyStatus.z && !keyStatus.s && !keyStatus.d) {
            movementDir.addInPlace(
                BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
            )
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                -Math.PI / 2
            )
        }
        // console.log(movementDir)
        movementDir.normalize()
        applyMovementForce(char, movementDir, speed)
    } else {
        if (!char.isMoving) {
            applyMovementForce(char, new BABYLON.Vector3(0, 0, 0), 0)
            runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
        }
        if (char.isMoving) {
            console.log('not moving')
            console.log('char.player', char.player)
            console.log('rot', char.player.rotation.y)
            var axis = new BABYLON.Vector3(0, 1, 0)

            // Définir l'angle de rotation en radians (45 degrés)
            var angle = -Math.PI / 4
            // char.player.rotate(axis, angle, BABYLON.Space.WORLD)
            console.log('rot2', char.player.rotation.y)
            char.isMoving = false
        }
    }

    return char
}
