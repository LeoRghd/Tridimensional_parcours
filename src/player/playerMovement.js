
scalar = 5
speed = 0

stopVector = new BABYLON.Vector3(0, 0, 0)
rotateLeftRight = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI / 2)
const noRotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1);

let moving = false


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

    if (
        keyStatus.z ||
        keyStatus.s ||
        keyStatus.q ||
        keyStatus.d ||
        keyStatus.b
    ) {
        moving = true
        speed = 0.2
        if (keyStatus.s && !keyStatus.z) {
            
        } else if (keyStatus.z || keyStatus.q || keyStatus.d) {

        }
        if (keyStatus.q) {
            player.parent.position.x += speed
            player.parent.position.z += speed
            pos = player.parent.position
            // console.log('pos', moving);
            playerAggregate.body.setTargetTransform(pos, noRotationQuaternion)
        }
        if (keyStatus.d) {

        }

    } else if (moving) {
        speed = 0
        moving = false
        const stop_pos = {}
        stop_pos.x = 0
        stop_pos.z = 0
        playerAggregate.body.setTargetTransform(stop_pos, noRotationQuaternion)
    }
}
