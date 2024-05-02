//TODO gravity acceleration
var loadPlayer = async (scene) => {
    const model = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        './utils/assets/',
        'SkinModeling2.glb',
        scene
    )

    var cylinderMaterial = new BABYLON.StandardMaterial(
        'cylinderMaterial',
        scene
    )
    cylinderMaterial.alpha = 0.5 // Rend le matériau semi-transparent
    const cylinder = BABYLON.MeshBuilder.CreateCapsule(
        'cylinder',
        { radius: 0.1, height: 1.5 },
        scene
    )
    cylinder.material = cylinderMaterial
    cylinder.isVisible = true
    cylinder.isPickable = false
    player = model.meshes[0]
    player.isPickable = false
    
    // player.rotate(axis, angle, BABYLON.Space.WORLD)
    cylinder.addChild(player)
    
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'head',
        { diameter: 0.5 },
        scene
    )
    sphere.position = new BABYLON.Vector3(0, 2.5, 0)
    sphere.isVisible = false
    sphere.isPickable = false
    cylinder.addChild(sphere)

    const sphere2 = BABYLON.MeshBuilder.CreateSphere(
        'crotch',
        { diameter: 0.1 },
        scene
    )
    sphere2.position = new BABYLON.Vector3(0, 0.9, 0.1)
    sphere2.isVisible = false
    sphere2.isPickable = false

    player.checkCollisions = false
    cylinder.addChild(sphere2)

    const sphere3 = new BABYLON.MeshBuilder.CreateSphere(
        'feet',
        { diameter: 0.1 },
        scene
    )
    sphere3.position = new BABYLON.Vector3(0, 0.1, 0)
    sphere3.isVisible = false
    sphere3.isPickable = false
    cylinder.addChild(sphere3)

    const rightHook = new BABYLON.MeshBuilder.CreateSphere(
        'right',
        { diameter: 0.1 },
        scene
    )
    rightHook.position = new BABYLON.Vector3(0.3, 0.9, 0)
    rightHook.isVisible = true
    rightHook.isPickable = false
    cylinder.addChild(rightHook)

    const leftHook = new BABYLON.MeshBuilder.CreateSphere(
        'left',
        { diameter: 0.1 },
        scene
    )
    leftHook.position = new BABYLON.Vector3(-0.3, 0.9, 0)
    leftHook.isVisible = true
    leftHook.isPickable = false
    cylinder.addChild(leftHook)

    const playerAggregate = new BABYLON.PhysicsAggregate(
        cylinder,
        BABYLON.PhysicsShapeType.CYLINDER,
        { mass: 1, restitution: 0.1 },
        scene
    )
    playerAggregate.body.setMotionType(BABYLON.PhysicsMotionType.DYNAMIC)
    playerAggregate.body.setMassProperties({
        inertia: new BABYLON.Vector3(0, 0, 0),
    })

    playerAggregate.body.disablePreStep = false
    //i want to find a mesh named CH36 and set isPickable to false
    scene.meshes.forEach((mesh) => {
        if (mesh.name === 'Ch36') {
            mesh.isPickable = false
        }
    })
    // const initialPosition = new BABYLON.Vector3(1, 50, 0);
    console.log('playerAggregate.body', playerAggregate);
    cylinder.position = new BABYLON.Vector3(2500, 5000, 2500)
    return { player, playerAggregate }
}
