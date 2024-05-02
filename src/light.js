var createLight = function (scene) {
    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 35000, 0),
        scene
    )
    // Dim the light a small amount 0 - 1
    light.intensity = 0.5
    return light
}

createSunLight = function (scene) {
    // Créer un SpotLight avec une couleur blanche
    var sunLightPosition = new BABYLON.Vector3(4900, 2000, 3000) // position
    var targetPosition = new BABYLON.Vector3(0, 0, 0) // target position
    var direction = BABYLON.Vector3.Normalize(
        targetPosition.subtract(sunLightPosition)
    )

    var sunLight = new BABYLON.SpotLight(
        'sunLight',
        sunLightPosition,
        direction, // direction
        Math.PI / 1, // angle
        2, // exponent
        scene
    )

    // Définir l'intensité de la lumière
    sunLight.intensity = 0.7
    sunLight.diffuse = new BABYLON.Color3.FromHexString('#fcc29a')

    // Créer une sphère pour visualiser la position de la lumière
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'sphere',
        { diameter: 50 },
        scene
    )
    sphere.position = sunLight.position

    var directionLine = BABYLON.MeshBuilder.CreateLines(
        'directionLine',
        {
            points: [
                sunLight.position,
                sunLight.position.add(sunLight.direction.scale(100)),
            ],
        },
        scene
    )

    return sunLight
}

createSkyLight = function (scene) {
    var skyLightPosition = new BABYLON.Vector3(-4900, 2000, 3000) // position
    var targetPosition = new BABYLON.Vector3(0, 0, 0) // target position
    var direction = BABYLON.Vector3.Normalize(
        targetPosition.subtract(skyLightPosition)
    )

    var skyLight = new BABYLON.SpotLight(
        'skyLight',
        skyLightPosition,
        direction, // direction
        Math.PI / 1, // angle
        2, // exponent
        scene
    )

    // Définir l'intensité de la lumière
    skyLight.intensity = 0.7
    skyLight.diffuse = new BABYLON.Color3.FromHexString('#9b708c')
    // Créer une sphère pour visualiser la position de la lumière
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'sphere',
        { diameter: 50 },
        scene
    )
    sphere.position = skyLight.position

    var directionLine = BABYLON.MeshBuilder.CreateLines(
        'directionLine',
        {
            points: [
                skyLight.position,
                skyLight.position.add(skyLight.direction.scale(100)),
            ],
        },
        scene
    )

    return skyLight
}

createUpLight = function (scene) {

}


function createSceneAxes(scene) {
    const size = 3
    var makeTextPlane = function (text, color, size) {
        var dynamicTexture = new BABYLON.DynamicTexture(
            'DynamicTexture',
            50,
            scene,
            true
        )
        dynamicTexture.hasAlpha = true
        dynamicTexture.drawText(
            text,
            5,
            40,
            'bold 36px Arial',
            color,
            'transparent',
            true
        )
        var plane = new BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true)
        plane.material = new BABYLON.StandardMaterial(
            'TextPlaneMaterial',
            scene
        )
        plane.material.backFaceCulling = false
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0)
        plane.material.diffuseTexture = dynamicTexture
        return plane
    }

    var axisX = BABYLON.Mesh.CreateLines(
        'axisX',
        [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(10, 0, 0),
            new BABYLON.Vector3(11, 0, 0),
        ],
        scene
    )
    axisX.color = new BABYLON.Color3(1, 0, 0)
    var xChar = makeTextPlane('X', 'red', size)
    xChar.position = new BABYLON.Vector3(11, 1, 0)

    var axisY = BABYLON.Mesh.CreateLines(
        'axisY',
        [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, 10, 0),
            new BABYLON.Vector3(0, 11, 0),
        ],
        scene
    )
    axisY.color = new BABYLON.Color3(0, 1, 0)
    var yChar = makeTextPlane('Y', 'green', size)
    yChar.position = new BABYLON.Vector3(0, 12, 0)

    var axisZ = BABYLON.Mesh.CreateLines(
        'axisZ',
        [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, 0, 10),
            new BABYLON.Vector3(0, 0, 11),
        ],
        scene
    )
    axisZ.color = new BABYLON.Color3(0, 0, 1)
    var zChar = makeTextPlane('Z', 'blue', size)
    zChar.position = new BABYLON.Vector3(0, 1, 11)

    var origin = BABYLON.MeshBuilder.CreateBox('origin', { size: 1 }, scene)
    origin.position = new BABYLON.Vector3.Zero()
}
