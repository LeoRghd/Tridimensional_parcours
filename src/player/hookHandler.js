function getDirection(pointA, pointB) {
    return pointB.subtract(pointA).normalize()
}

function calculateDistance(point1, point2) {
    var dx = point2.x - point1.x
    var dy = point2.y - point1.y
    var dz = point2.z - point1.z

    return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function cancelHook(char, hookName) {
    char.hooks[hookName].isThrown = false
    char.hooks[hookName].direction = null
    char.hooks[hookName].length = 0
    char.hooks[hookName].isOn = false
    char.hooks[hookName].isSet = false
    char.hooks[hookName].pickedPoint = null
    if (char.hooks[hookName].previousRay) {
        char.hooks[hookName].previousRay.dispose()
        char.hooks[hookName].previousRay = null
    }
    return char
}
const getHookPosition = (player, hookName) => {
    const cylinder = player.parent
    const hookMesh = cylinder.getChildren().find(function (element) {
        return element.name === hookName
    })
    return hookMesh ? hookMesh.getAbsolutePosition().clone() : null
}

function createRedPoint(scene, coordinates) {
    var pointMaterial = new BABYLON.StandardMaterial('pointMaterial', scene)
    pointMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0) // Rouge

    var point = BABYLON.MeshBuilder.CreateSphere(
        'point',
        { diameter: 0.5 },
        scene
    )
    point.material = pointMaterial
    point.position = coordinates
    point.renderingGroupId = 1 // Dessine le point par-dessus les autres objets

    return point
}

const hookHit = (scene, ray) => {
    var pickResults = scene.pickWithRay(ray)
    if (pickResults.hit && pickResults.pickedMesh.id === 'touch') {
        const hitResult = {
            pickedPoint: pickResults.pickedPoint,
            distance: pickResults.distance,
        }
        createRedPoint(scene, hitResult.pickedPoint)
        return hitResult
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
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3(0, 101, 255))
        : (color = new BABYLON.Color3(255, 93, 0))
    var hookPosition = getHookPosition(char.player, hookName)
    var cameraPosition = camera.position
    var firstThrow = false

    // Calculez la direction du rayon
    if (!char.hooks[hookName].direction) {
        console.log('camera direction')
        firstThrow = true
        char.hooks[hookName].direction = getCameraDirection(camera)
        char.hooks[hookName].size = 1
    }

    char.hooks[hookName].size += 3.5
    var rayMaterial = new BABYLON.StandardMaterial('rayMaterial', scene)
    rayMaterial.emissiveColor = color // Rouge
    rayMaterial.material = rayMaterial

    var ray = new BABYLON.Ray(
        hookPosition,
        char.hooks[hookName].direction,
        char.hooks[hookName].size
    )

    if (char.hooks[hookName].previousRay) {
        char.hooks[hookName].previousRay.dispose()
    }

    // Créez un nouveau RayHelper et stockez-le dans char.hooks[hookName]
    let rayHelper = new BABYLON.RayHelper(ray)
    rayHelper.show(scene, color)
    char.hooks[hookName].previousRay = rayHelper
    if (char.hooks[hookName].size > 200) {
        char = cancelHook(char, hookName)
    }
    // Vérifiez si le rayon a touché
    var hitPoint = hookHit(scene, ray)
    if (hitPoint) console.log('hitPoint.distance', hitPoint.distance, '')
    if (hitPoint && hitPoint.distance <= char.hooks[hookName].size) {
        char.hooks[hookName].isOn = true
        char.hooks[hookName].isThrown = false
        char.hooks[hookName].isSet = true
        char.hooks[hookName].pickedPoint = hitPoint.pickedPoint
    }
    return char
}

const hookSetter = (char, camera, scene, hookName) => {
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3(0, 101, 255))
        : (color = new BABYLON.Color3(255, 93, 0))
    var hookPosition = getHookPosition(char.player, hookName)
    var pickedPoint = char.hooks[hookName].pickedPoint
    var direction = getDirection(hookPosition, pickedPoint)
    var distance = calculateDistance(hookPosition, pickedPoint)
    var ray = new BABYLON.Ray(hookPosition, direction, distance)

    if (char.hooks[hookName].previousRay) {
        char.hooks[hookName].previousRay.dispose()
    }
    let rayHelper = new BABYLON.RayHelper(ray)
    rayHelper.show(scene, color)
    char.hooks[hookName].previousRay = rayHelper
    var currentLinearVelocity = char.playerAggregate.body.getLinearVelocity()

    // Ajoutez la nouvelle vitesse à la vitesse linéaire actuelle
    var newLinearVelocity = currentLinearVelocity.add(direction.scale(1))

    // Définissez la nouvelle vitesse linéaire
    char.playerAggregate.body.setLinearVelocity(newLinearVelocity)
    return char
}

const hookHandler = (char, camera, scene, hookName, texture) => {
    if (!char.hooks[hookName].isOn) {
        texture.isVisible = true
        return char
    }
    if (char.hooks[hookName].isThrown)
        char = hookThrower(char, camera, scene, hookName)
    if (char.hooks[hookName].isSet) {
        char = hookSetter(char, camera, scene, hookName)
    }
    if (char.hooks[hookName].isOn) {
        texture.isVisible = false
    }
    return char
}
