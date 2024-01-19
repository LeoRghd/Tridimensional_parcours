var handlePlayerMovement = function (keyStatus, scene, char, camera) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    cameraDirection = camera.getForwardRay().direction
    forward = new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)

    function moveForward(forwardVec, speed) {
        forwardVec = forwardVec.scale(speed)
        char.player.parent.position.x += forwardVec.x
        char.player.parent.position.y += forwardVec.y
        char.player.parent.position.z += forwardVec.z
    }

    function moveRight(forwardVec, speed) {
        let upVec = new BABYLON.Vector3(0, 1, 0)
        let rightVec = BABYLON.Vector3.Cross(forwardVec, upVec)
            .normalize()
            .negate()
        rightVec = rightVec.scale(speed)
        char.player.parent.position.x += rightVec.x
        char.player.parent.position.y += rightVec.y
        char.player.parent.position.z += rightVec.z
    }

    function moveLeft(forwardVec, speed) {
        let upVec = new BABYLON.Vector3(0, 1, 0)
        let leftVec = BABYLON.Vector3.Cross(forwardVec, upVec).normalize()
        leftVec = leftVec.scale(speed)
        char.player.parent.position.x += leftVec.x
        char.player.parent.position.y += leftVec.y
        char.player.parent.position.z += leftVec.z
    }

    function moveBackward(forwardVec, speed) {
        backwardVec = forwardVec.scale(-speed)
        char.player.parent.position.x += backwardVec.x
        char.player.parent.position.y += backwardVec.y
        char.player.parent.position.z += backwardVec.z
    }

    const getBoxDirection = function () {
        const forward = BABYLON.Vector3.TransformCoordinates(
            new BABYLON.Vector3(0, 0, 1),
            char.player.computeWorldMatrix(true)
        )
        const direction = forward.subtract(char.player.position)
        return direction
    }

    if (keyStatus.z || keyStatus.s || keyStatus.q || keyStatus.d) {
        char.isMoving = true
        speed = 0.5
        diagonalSpeed = 0.3
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)

        // Forward + Left
        if (keyStatus.z && keyStatus.q) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                -Math.PI / 4
            )
            moveForward(forward, diagonalSpeed)
            moveLeft(forward, diagonalSpeed)
        }

        //Forward + Right
        if (keyStatus.z && keyStatus.d) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                Math.PI / 4
            )
            moveForward(forward, diagonalSpeed)
            moveRight(forward, diagonalSpeed)
        }

        //Backwards + Left
        if (keyStatus.s && keyStatus.q) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                (-5 * Math.PI) / 8
            )
            moveBackward(forward, diagonalSpeed)
            moveLeft(forward, diagonalSpeed)
        }

        //Backwards + Right
        if (keyStatus.s && keyStatus.d) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                (7 * Math.PI) / 8
            )
            moveBackward(forward, diagonalSpeed)
            moveRight(forward, diagonalSpeed)
        }

        //Forward
        if (keyStatus.z && !keyStatus.q && !keyStatus.s && !keyStatus.d) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                0,
                0,
                0
            )
            moveForward(forward, speed)
        }

        //Left
        if (keyStatus.q && !keyStatus.z && !keyStatus.s && !keyStatus.d) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                -Math.PI / 2
            )
            moveLeft(forward, speed)
        }

        //Right
        if (keyStatus.d && !keyStatus.q && !keyStatus.s && !keyStatus.z) {
            char.player.parent.lookAt(
                char.player.parent.position.add(forward),
                Math.PI / 2
            )
            moveRight(forward, speed)
        }

        //BackWards
        if (keyStatus.s && !keyStatus.q && !keyStatus.z && !keyStatus.d) {
            char.player.parent.lookAt(
                char.player.parent.position.add(
                    new BABYLON.Vector3(-forward.x, 0, -forward.z)
                ),
                0,
                0,
                0
            )
            moveBackward(forward, speed)
        }
        return char
    } else {
        if (char.isMoving) {
            speed = 0
            runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
            char.isMoving = false
            console.log('parent.rotate.y', char.player.parent.rotation.y)
            char.player.parent.rotate(char.player.parent.position)
            char.player.parent.rotation.y = 45 * (Math.PI / 180)
            console.log('parent.rotate.y after', char.player.parent.rotation.y)
        }
    }
    return char
}
