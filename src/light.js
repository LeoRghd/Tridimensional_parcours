var createLight = function (scene) {
    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 2, 0),
        scene
    )
    // Dim the light a small amount 0 - 1
    light.intensity = 0.7
    return light
}
