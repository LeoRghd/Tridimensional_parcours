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
    char.hooks[hookName].isBack = false
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
    hookMesh.computeWorldMatrix(true)
    return hookMesh ? hookMesh.getBoundingInfo().boundingBox.centerWorld : null
}

function createRedPoint(scene, coordinates, hookName) {
    var pointMaterial = new BABYLON.StandardMaterial('pointMaterial', scene)
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3.FromInts(0, 101, 255))
        : (color = new BABYLON.Color3.FromInts(255, 93, 0))
    pointMaterial.emissiveColor = color // Rouge

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

let hitPosition;
const hookHit = (scene, ray, hookName, sound) => {
    var pickResults = scene.pickWithRay(ray)
    if (pickResults.hit && pickResults.pickedMesh.id === 'touch') {
        const hitResult = {
            pickedPoint: pickResults.pickedPoint,
            distance: pickResults.distance,
        }
        if (sound.throwHook.isPlaying) sound.throwHook.stop()
        sound.hookHit.play()
        const hitMark = createRedPoint(scene, hitResult.pickedPoint, hookName)
        hitPosition = hitResult.point;
        return { hitResult, hitMark }
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

const hookReturned = (char, camera, scene, hookName, sound) => {
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3.FromInts(0, 101, 255))
        : (color = new BABYLON.Color3.FromInts(255, 93, 0))
    var hookPosition = getHookPosition(char.player, hookName)
    char.hooks[hookName].size -= 3.5
    var ray = new BABYLON.Ray(
        hookPosition,
        char.hooks[hookName].direction,
        char.hooks[hookName].size
    )

    if (char.hooks[hookName].previousRay) {
        char.hooks[hookName].previousRay.dispose()
    }

    let rayHelper = new BABYLON.RayHelper(ray)
    rayHelper.show(scene, color)
    char.hooks[hookName].previousRay = rayHelper

    if (char.hooks[hookName].size <= 1) {
        if (sound.hookIn.isPlaying) sound.hookIn.stop()
        sound.hookReturned.play()
        char = cancelHook(char, hookName)
    }
    return char
}

const hookThrower = (char, camera, scene, hookName, sound) => {
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3.FromInts(0, 101, 255))
        : (color = new BABYLON.Color3.FromInts(255, 93, 0))

    var hookPosition = getHookPosition(char.player, hookName)
    var cameraPosition = camera.position

    // First frame of throw
    if (!char.hooks[hookName].direction) {
        sound.throwHook.play()
        char.hooks[hookName].direction = getCameraDirection(camera)
        char.hooks[hookName].size = 1
    }

    char.hooks[hookName].size += 3.5
    char.hooks[hookName].direction = getCameraDirection(camera)
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
        sound.hookIn.play()
        char.hooks[hookName].isBack = true
        char.hooks[hookName].isThrown = false
        // char = cancelHook(char, hookName)
    }
    // Vérifiez si le rayon a touché
    var tmp = hookHit(scene, ray, hookName, sound)
    hitPoint = tmp ? tmp.hitResult : null
    hitMark = tmp ? tmp.hitMark : null
    if (hitMark && char.hooks[hookName].hitMark) {
        char.hooks[hookName].hitMark.dispose()
    }
    if (hitMark) {
        char.hooks[hookName].hitMark = hitMark
    }
    if (hitPoint) console.log('hitPoint.distance', hitPoint.distance, '')
    if (hitPoint && hitPoint.distance <= char.hooks[hookName].size) {
        char.hooks[hookName].isOn = true
        char.hooks[hookName].isThrown = false
        char.hooks[hookName].isSet = true
        char.hooks[hookName].pickedPoint = hitPoint.pickedPoint
        console.log("hi")
        updatePlayerRotation(char.player, tmp.hitResult.pickedPoint);
    }
    return char
}

const hookSetter = (char, camera, scene, hookName) => {
    var color
    hookName === 'left'
        ? (color = new BABYLON.Color3.FromInts(0, 101, 255))
        : (color = new BABYLON.Color3.FromInts(255, 93, 0))
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
    if (char.onGaz && !char.onGround) {
        char.playerAggregate.body.setLinearVelocity(direction.scale(50))
    }
    if (char.outGaz && !char.onGround) {
        char.playerAggregate.body.setLinearVelocity(direction.scale(-50))
    } else {
        const speed = 1
        var currentLinearVelocity =
            char.playerAggregate.body.getLinearVelocity()
        var newLinearVelocity = currentLinearVelocity.add(
            direction.scale(speed)
        )
        char.playerAggregate.body.setLinearVelocity(newLinearVelocity)
    }
    // Ajoutez la nouvelle vitesse à la vitesse linéaire actuelle

    // Définissez la nouvelle vitesse linéaire

    return char
}

const hookHandler = (char, camera, scene, hookName, texture, sound) => {
    if (!char.hooks[hookName].isOn) {
        texture.isVisible = true
        return char
    }
    if (char.hooks[hookName].isThrown)
        char = hookThrower(char, camera, scene, hookName, sound)
    if (char.hooks[hookName].isSet) {
        char = hookSetter(char, camera, scene, hookName)
    }
    if (char.hooks[hookName].isBack) {
        char = hookReturned(char, camera, scene, hookName, sound)
    }
    if (char.hooks[hookName].isOn) {
        texture.isVisible = false
    }
    return char
}


function updatePlayerRotation(player, hitPoint) {
    const direction = hitPoint.subtract(player.position);
    const angle = Math.atan2(direction.x, direction.z);
    player.rotation.y = angle;
    }