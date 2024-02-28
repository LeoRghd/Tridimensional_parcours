function stopAllAnimation(animation) {
    animation.runAnim.stop()
    animation.idleAnim.stop()
    animation.fallAnim.stop()
    animation.jumpAnim.stop()
    console.log('stop all animation')
}

function getAnimation(scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const idleAnim = scene.getAnimationGroupByName('Idle')
    const fallAnim = scene.getAnimationGroupByName('Fall')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    fallAnim.stop()
    idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false)
    return { runAnim, idleAnim, fallAnim, jumpAnim }
}
