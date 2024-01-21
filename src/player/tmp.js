var pickResult = scene.pickWithRay(ray)
if (pickResult.hit) {
    console.log('pickResult', pickResult.pickedMesh.id)
    if (pickResult.pickedMesh.id === 'tower') {
        var hitPoint = pickResult.pickedPoint
        console.log('hitpoint', hitPoint)
        console.log('origin', origin)
        distance = BABYLON.Vector3.Distance(origin, hitPoint)
        console.log('distance', distance)
    }
}
if (keyStatus.space) {
    console.log('cum')
    console.log("before impulse", char.playerAggregate.body.getLinearVelocity())
    char.playerAggregate.body.applyImpulse(new BABYLON.Vector3(0, 100000, 0), char.player.getAbsolutePosition())
    console.log("after impulse", char.playerAggregate.body.getLinearVelocity())
    keyStatus.space = false
}