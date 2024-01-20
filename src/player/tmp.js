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