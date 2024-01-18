
let moving = false


function moveForward(forwardVec, speed) {
    forwardVec = forwardVec.scale(speed)
    player.parent.position.x += forwardVec.x
    player.parent.position.y += forwardVec.y
    player.parent.position.z += forwardVec.z
}

function moveRight(forwardVec, speed) {
    let upVec = new BABYLON.Vector3(0, 1, 0);
    let rightVec = BABYLON.Vector3.Cross(forwardVec, upVec).normalize().negate();
    rightVec = rightVec.scale(speed)
    player.parent.position.x += rightVec.x
    player.parent.position.y += rightVec.y
    player.parent.position.z += rightVec.z
}

function moveLeft(forwardVec, speed) {
    let upVec = new BABYLON.Vector3(0, 1, 0);
    let leftVec = BABYLON.Vector3.Cross(forwardVec, upVec).normalize();
    leftVec = leftVec.scale(speed)
    player.parent.position.x += leftVec.x
    player.parent.position.y += leftVec.y
    player.parent.position.z += leftVec.z
}

function moveBackward(forwardVec, speed) {
    backwardVec = forwardVec.scale(-speed)
    player.parent.position.x += backwardVec.x
    player.parent.position.y += backwardVec.y
    player.parent.position.z += backwardVec.z
}


var handlePlayerMovement = function (
    keyStatus,
    scene,
    player,
    playerAggregate,
    camera
) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    cameraDirection = camera.getForwardRay().direction
    forward = new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)


    if (
        keyStatus.z ||
        keyStatus.s ||
        keyStatus.q ||
        keyStatus.d ||
        keyStatus.b
    ) {
        moving = true
        speed = 0.1
        // runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)
        // if (keyStatus.z && keyStatus.q) {
        //     player.parent.lookAt(player.parent.position.add(forward), -Math.PI/4)
        // }
        // if (keyStatus.z && keyStatus.d) {
        //     player.parent.lookAt(player.parent.position.add(forward), Math.PI/4)
        // }
        if (keyStatus.z) {
            player.parent.lookAt(player.parent.position.add(forward), 0,0,0)
            moveForward(forward, speed)
        }
        if (keyStatus.q) {
            player.parent.lookAt(player.parent.position.add(forward), -Math.PI/2)
            moveLeft(forward, speed)
        }
        if (keyStatus.d) {
            player.parent.lookAt(player.parent.position.add(forward), Math.PI/2)
            moveRight(forward, speed)
        }
        if (keyStatus.s) {
            player.parent.lookAt(player.parent.position.add(new BABYLON.Vector3(-forward.x, 0, -forward.z)), 0,0,0)
            moveBackward(forward, speed)
        }

    } else if (moving) {
        speed = 0
        moving = false
        // runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
    }
}




