counter = 0

//TODO: make player facing hitpoint

const getForwardVector = function (camera) {
    let cameraDirection = camera.getForwardRay().direction
    const forward = new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)
    forward.normalize()
    return forward
}

function updateJump(char, scene, animation) {
    // const fallAnim = scene.getAnimationGroupByName('Fall')

    const vert = char.playerAggregate.body.getLinearVelocity()
    let maxJumpFrames = 3 // Ajustez cette valeur selon vos besoins (correspond à environ 500 ms à 60 FPS)

    if (vert.y < 0) {
        if (!char.isFalling) {
            animation.fallAnim.start(
                true,
                0.1,
                animation.fallAnim.from,
                animation.fallAnim.to,
                false
            )
            // fallAnim.start(true, 0.1, fallAnim.from, fallAnim.to, false)
            char.isFalling = true
        }
        char.isFalling = true
    }
    if (char.isJumping) {
        // Incrémenter le compteur de trames
        char.jumpFrameCount++

        if (char.jumpFrameCount >= maxJumpFrames) {
            char.isJumping = false
            char.isOnAir = true
            return char
        }

        let currentVelocity = char.playerAggregate.body.getLinearVelocity()

        currentVelocity.y += 9 // Ajustez la hauteur du saut selon vos besoins

        char.playerAggregate.body.setLinearVelocity(currentVelocity)
    } else {
        char.jumpFrameCount = 0
    }
    return char
}

function updateGroundState(char, scene, animation) {
    const cylinder = char.player.parent

    cylinder.computeWorldMatrix(true)
    var spherePosition = cylinder
        .getBoundingInfo()
        .boundingBox.centerWorld.clone()
    const rayDirection = new BABYLON.Vector3(0, -1, 0)
    // Longueur du rayon
    const rayLength = 0.8 // Ajustez cette valeur en fonction de la hauteur de votre personnage au-dessus du sol

    // Créer le rayon
    const ray = new BABYLON.Ray(spherePosition, rayDirection, rayLength)
    ray.renderingGroupId = 1
    // Visualiser le rayon pour le débogage (facultatif)
    if (char.groundRay) {
        char.groundRay.dispose()
    }
    let rayHelper = new BABYLON.RayHelper(ray)

    rayHelper.show(scene, new BABYLON.Color3(255, 0, 0))
    // Définir le groupe de rendu pour le rayon
    char.groundRay = rayHelper
    // Effectuer le raycast
    const hit = scene.pickWithRay(ray, (mesh) => {
        return mesh.isPickable && mesh.isEnabled() // Assurez-vous de tester uniquement les meshs qui sont pickables et activés
    })

    // Mettre à jour l'état au sol
    if (hit.hit && hit.pickedMesh) {
        // Le rayon a touché un mesh, le personnage est considéré comme étant au sol
        rayHelper.dispose()
        let rayHelper2 = new BABYLON.RayHelper(ray)
        rayHelper2.show(scene, new BABYLON.Color3(0, 255, 0))
        rayHelper2.thickness = 0.05 // Augmentez l'épaisseur du rayon
        char.groundRay = rayHelper2
        char.isOnGround = true
        char.isFalling = false
        char.isOnAir = false
    } else {
        // Le rayon n'a touché aucun mesh, le personnage n'est pas au sol
        animation.runAnim.stop()
        char.isOnGround = false
        char.isOnAir = true
    }
    // console.log('char.player.position.y', char.playerAggregate)
    return char
}

const applyMovementForce = function (char, direction, speed) {
    let force = direction.scale(speed)
    // let currentVelocity = char.playerAggregate.body.getLinearVelocity()
    // currentVelocity.addInPlace(force)
    char.playerAggregate.body.setLinearVelocity(force)
}

var handlePlayerMovement = function (
    keyStatus,
    scene,
    char,
    camera,
    animation,
    sound
) {
    if (!char.smokeSystem) {
        const smokeSystem = getSmokes(scene, char)
        char.smokeSystem = smokeSystem
    }
    const runAnim = scene.getAnimationGroupByName('Run')
    const idleAnim = scene.getAnimationGroupByName('Idle')
    const fallAnim = scene.getAnimationGroupByName('Fall')

    // Appeler les fonctions d'action appropriées en fonction des keyStatus
    if (keyStatus.z && char.isOnGround) {
        char.isMoving = true
        char = moveForward(char, camera, scene, animation)
    }

    if (keyStatus.s && char.isOnGround) {
        char.isMoving = true
        char = moveBackward(char, camera, scene, animation)
    }

    if (keyStatus.q && char.isOnGround) {
        char.isMoving = true
        char = moveLeft(char, camera, scene, animation)
    }

    if (keyStatus.d && char.isOnGround) {
        char.isMoving = true
        char = moveRight(char, camera, scene, animation)
    }

    if (keyStatus.space && char.isOnGround && !char.isJumping) {
        console.log('space')
        console.log
        char = jump(char, camera, scene, animation)
    }

    if (
        (keyStatus.leftClick && !previousKeyStatus.leftClick) ||
        (keyStatus.rightClick && !previousKeyStatus.rightClick)
    ) {
        if (keyStatus.leftClick) {
            if (!char.hooks.left.isOn) {
                char.hooks.left.isThrown = true
                char.hooks.left.isOn = true
            } else if (char.hooks.left.isOn) {
                char = cancelHook(char, 'left')
            }
        }
        if (keyStatus.rightClick) {
            if (!char.hooks.right.isOn) {
                char.hooks.right.isThrown = true
                char.hooks.right.isOn = true
            } else if (char.hooks.right.isOn) {
                char = cancelHook(char, 'right')
            }
        }
    }
    if (keyStatus.ctrl && !keyStatus.e) {
        if (!char.onGaz) {
            console.log('sound.gasBurst', sound.gasBurst)
            sound.gasBurst.play()
            char.outGaz = false
            char.onGaz = true
            char.smokeSystem.In.start()
        }
    } else {
        if (char.onGaz) {
            char.onGaz = false
            char.smokeSystem.In.stop()
        }
    }
    if (keyStatus.e && !keyStatus.ctrl) {
        if (!char.outGaz) {
            console.log('sound.gasBurst2222', sound.gasBurst)

            sound.gasBurst.play()
            char.outGaz = true
            char.onGaz = false
            char.smokeSystem.Out.start()
        }
    } else {
        if (char.outGaz) {
            char.outGaz = false
            char.smokeSystem.Out.stop()
        }
    }

    // Mettre à jour previousKeyStatus à la fin de la fonction
    previousKeyStatus = { ...keyStatus }
    // Reste du code pour arrêter l'animation de course, etc.
    if (
        !keyStatus.z &&
        !keyStatus.s &&
        !keyStatus.q &&
        !keyStatus.d &&
        !char.isOnAir &&
        !char.isJumping
    ) {
        char.isMoving = false
        stopAllAnimation(animation)
        animation.idleAnim.start(
            true,
            1.0,
            animation.idleAnim.from,
            animation.idleAnim.to,
            false
        )
        char.playerAggregate.body.setLinearVelocity(BABYLON.Vector3.Zero())
    }

    return char
}
