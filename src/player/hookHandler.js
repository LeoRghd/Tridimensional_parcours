function getDirection(pointA, pointB) {
    return pointB.subtract(pointA).normalize()
}
function cancelHook(char, hookName) {
    char.hooks[hookName].isThrown = false
    char.hooks[hookName].direction = null
    char.hooks[hookName].length = 0
    char.hooks[hookName].isOn = false
    char.hooks[hookName].previousRay.dispose()
    return char
}
const getHookPosition = (player, hookName) => {
    const cylinder = player.parent
    const hookMesh = cylinder.getChildren().find(function (element) {
        return element.name === hookName
    })
    return hookMesh ? hookMesh.getAbsolutePosition().clone() : null
}

const hookHit = (scene, ray) => {
    var pickResults = scene.pickWithRay(ray)
    if (pickResults.hit && pickResults.pickedMesh.id === 'touch') {
        return pickResults.pickedPoint
    }
    return null
}

const getCameraDirection = (camera) => {
    var cameraPosition = camera.position
    // Calculez la direction du rayon
    var direction = camera
        .getDirection(new BABYLON.Vector3(0, 0, 1))
        .normalize()
        .clone()
    return direction
}

const hookThrower = (char, camera, scene, hookName) => {
    var hookPosition = getHookPosition(char.player, hookName)
    var cameraPosition = camera.position
    var firstThrow = false

    // Calculez la direction du rayon
    if (!char.hooks[hookName].direction) {
        console.log('camera direction')
        firstThrow = true
        char.hooks[hookName].direction = getCameraDirection(camera)
        char.hooks[hookName].length = 1
    }

    char.hooks[hookName].length += 3.5
    var rayMaterial = new BABYLON.StandardMaterial('rayMaterial', scene)
    rayMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0) // Rouge
    rayMaterial.material = rayMaterial

    var ray = new BABYLON.Ray(
        hookPosition,
        char.hooks[hookName].direction,
        char.hooks[hookName].length
    )

    if (char.hooks[hookName].previousRay) {
        char.hooks[hookName].previousRay.dispose()
    }

    // Créez un nouveau RayHelper et stockez-le dans char.hooks[hookName]
    let rayHelper = new BABYLON.RayHelper(ray)
    rayHelper.show(scene, new BABYLON.Color3(0, 0, 0))
    char.hooks[hookName].previousRay = rayHelper
    if (char.hooks[hookName].length > 200) {
        char = cancelHook(char, hookName)
    }
    // Vérifiez si le rayon a touché
    var hitPoint = hookHit(scene, ray)

    return char
}

const hookHandler = (char, camera, scene, hookName) => {
    if (!char.hooks[hookName].isOn) return char
    if (char.hooks[hookName].isThrown)
        char = hookThrower(char, camera, scene, hookName)
    return char
}
