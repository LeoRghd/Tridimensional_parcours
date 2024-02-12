counter = 0

const getForwardVector = function (camera) {
    let cameraDirection = camera.getForwardRay().direction
    const forward = new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)
    forward.normalize()
    return forward
}

const applyMovementForce = function (char, direction, speed) {
    let force = direction.scale(speed)
    // console.log('force', force)
    // console.log("location", location)
    // console.log("Applying force:", force, "at location:", location);
    char.playerAggregate.body.setLinearVelocity(force)
}

var handlePlayerMovement = function (keyStatus, scene, char, camera) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    // idleAnim.start(true, 1.0, runAnim.from, runAnim.to, false)

    let forward = getForwardVector(camera)
    let speed = 50
    if (
        keyStatus.z ||
        keyStatus.s ||
        keyStatus.q ||
        keyStatus.d ||
        keyStatus.space
    ) {
        if (char.isMoving) {
            var axis = new BABYLON.Vector3(0, 1, 0)
            var angle = Math.PI / 4
            char.player.rotation.y = 45 * (Math.PI / 180)
        }
        char.isMoving = true
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)

        let movementDir = new BABYLON.Vector3(0, 0, 0)

        if (keyStatus.space) {
            console.log('counter', counter++)
            // console.log("before impulse", char.playerAggregate.body.getLinearVelocity())
            char.playerAggregate.body.applyImpulse(
                new BABYLON.Vector3(0, 100000, 0),
                char.player.getAbsolutePosition()
            )
            // console.log("after impulse", char.playerAggregate.body.getLinearVelocity())
            // keyStatus.space = false
        }

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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
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
            applyMovementForce(char, movementDir, speed)
        }
        // console.log(movementDir)
        // movementDir.normalize()
        // applyMovementForce(char, movementDir, speed)
    } else {
        //chaque frame sur place
        if (!char.isMoving) {
            applyMovementForce(char, new BABYLON.Vector3(0, 0, 0), 0)
            runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
        }
        if (char.isMoving) {
            //   // première frame sur place
            //   var direction2 = getForwardVector(camera);
            //   const pos = char.player.getAbsolutePosition()
            //   console.log('pos', pos)
            //   var direction = char.player.getDirection(pos)
            //   console.log('direction', direction);

            //   // Convertissez l'angle en radians (Babylon.js utilise des radians)
            //   var angleInRadians = BABYLON.Tools.ToRadians(-40);

            //   // Créez une matrice de rotation autour de l'axe Y (pour une rotation antihoraire)
            //   var rotationMatrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, angleInRadians);

            //   // Appliquez la rotation au vecteur de direction
            //   direction = BABYLON.Vector3.TransformNormal(direction, rotationMatrix);

            //   // Assurez-vous de normaliser le vecteur de direction pour qu'il ait une longueur de 1
            //   direction.normalize();

            //   // Utilisez le nouveau vecteur de direction pour définir la direction
            //   char.player.parent.setDirection(direction);
            // console.log('directooin', direction)
            // char.player.parent =
            char.isMoving = false
        }
    }

    return char
}
