counter = 0


var handleJump = function (keyStatus, scene, char) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    if (keyStatus.space && !char.isInAir) {
        console.log("counter", counter++)
        char.isInAir = true
        console.log(char.isInAir)
        runAnim.stop(true)
        idleAnim.stop(true)
        jumpAnim.start(true)

        let jumpForce = new BABYLON.Vector3(0, 100000, 0)
        char.playerAggregate.body.applyImpulse(jumpForce, char.player.position)
        console.log("gravity", char.playerAggregate.body.getGravityFactor())

    }

    if (char.player.position.y == 0.75) {
        char.isInAir = false
        jumpAnim.stop(true)
    }
    return char
}