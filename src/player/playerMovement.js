const playerWalkSpeed = 0.05
const playerRunSpeed = 0.1
const playerSpeedBackwards = 0.05
const playerRotationSpeed = 0.5
const runAnimSpeed = 3
const walkAnimSpeed = 1
const scalar = 5

stopVector = new BABYLON.Vector3(0, 0, 0)

let speed
let animSpeed


let moving = false

const getBoxDirection = function () {
    const forward = BABYLON.Vector3.TransformCoordinates(
        new BABYLON.Vector3(0, 0, 1),
        player.computeWorldMatrix(true)
    );
    const direction = forward.subtract(player.position);
    return direction;
}
const smoothRotate = function () {
    const dir = getBoxDirection();
    const rot = BABYLON.Quaternion.FromLookDirectionRH(dir, BABYLON.Vector3.Up());
    const [mesheRoot] = player.getChildMeshes();
    mesheRoot.rotationQuaternion =
        mesheRoot.rotationQuaternion || BABYLON.Quaternion.Identity();
    BABYLON.Quaternion.SlerpToRef(
        mesheRoot.rotationQuaternion,
        rot,
        0.1,
        mesheRoot.rotationQuaternion
    );
}


const scale = function (directionVector, scalar) {
    return new BABYLON.Vector3(directionVector.x * scalar, 0, directionVector.z * scalar)
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
    // const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
    const idleAnim = scene.getAnimationGroupByName('Idle')
    // const sambaAnim = scene.getAnimationGroupByName("Samba");

    const cameraDirection = camera.getForwardRay().direction
    console.log(cameraDirection)
    const d = new BABYLON.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z)

    if (
        keyStatus.z ||
        keyStatus.s ||
        keyStatus.q ||
        keyStatus.d ||
        keyStatus.b
    ) {
        moving = true
        if (keyStatus.s && !keyStatus.z) {
            speed = -playerSpeedBackwards
            // walkBackAnim.start(true, 1, walkBackAnim.from, walkBackAnim.to, false);
        } else if (keyStatus.z || keyStatus.q || keyStatus.d) {
            speed = keyStatus.Shift ? playerRunSpeed : playerWalkSpeed
            animSpeed = keyStatus.Shift ? runAnimSpeed : walkAnimSpeed
            // walkAnim.speedRatio = animSpeed;
            // walkAnim.start(true, animSpeed, walkAnim.from, walkAnim.to, false);
        }
        if (keyStatus.q) {
            player.lookAt(player.position.add(d), -Math.PI/2,0, -Math.PI)
            smoothRotate()
            // rotateVelocity.set(0, 1, 0)
            // walkVelocity.set(0, 0, 5)
            // playerAggregate.body.setAngularVelocity(rotateVelocity)
            // playerAggregate.body.setLinearVelocity(walkVelocity);
        }
        if (keyStatus.d) {
            player.lookAt(player.position.add(d), Math.PI/2, 0, Math.PI)
            smoothRotate()
            // playerAggregate.body.rotate(
            //     BABYLON.Vector3.Up(),
            //     playerRotationSpeed
            // )
        }
        player.lookAt(d, 0,0,0)
        playerAggregate.body.setLinearVelocity(scale(cameraDirection, 5))
    } else if (moving) {
        // idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false)
        // runAnim.start(true, 1.0, runAnim.from, runAnim.to, false);
        // jumpAnim.start(true, 1.0, jumpAnim.from, jumpAnim.to, false);
        // sambaAnim.stop();
        // walkAnim.stop();
        // walkBackAnim.stop();
        // walkVelocity.set(0, 0, 0)
        // rotateVelocity.set(0, 0, 0)
        playerAggregate.body.setLinearVelocity(stopVector)
        // playerAggregate.body.setAngularVelocity(rotateVelocity)
        moving = false
    }
}
