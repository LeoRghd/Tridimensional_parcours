var loadPlayer = async (scene) => {
    const model = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        './utils/assets/',
        'SkinModeling6.glb',
        scene
    )
    const cylinder = BABYLON.MeshBuilder.CreateCapsule(
        'cylinder',
        { radius: 0.5, height: 1.5 },
        scene
    )
    cylinder.position = new BABYLON.Vector3(0, 0.75, 0)
    cylinder.isVisible = true
    cylinder.isPickable = false
    player = model.meshes[0]
    console.log('ispickable', player.isPickable)
    player.isPickable = false
    player.isVisible = true
    console.log('ispickable', player.isPickable)

    // player.rotate(axis, angle, BABYLON.Space.WORLD)
    cylinder.addChild(player)

    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'head',
        { diameter: 0.5 },
        scene
    )
    sphere.position = new BABYLON.Vector3(0, 2.5, 0)
    sphere.isVisible = true
    cylinder.addChild(sphere)

    const sphere2 = BABYLON.MeshBuilder.CreateSphere(
        'crotch',
        { diameter: 0.1 },
        scene
    )
    sphere2.position = new BABYLON.Vector3(0, 0.9, 0.1)
    sphere2.isVisible = true
    sphere2.isPickable = false

    player.checkCollisions = false
    cylinder.addChild(sphere2)

    const sphere3 = new BABYLON.MeshBuilder.CreateSphere(
        'feet',
        { diameter: 0.1 },
        scene
    )
    sphere3.position = new BABYLON.Vector3(0, 0.1, 0)
    sphere3.isVisible = true
    sphere3.isPickable = false
    cylinder.addChild(sphere3)

    const playerAggregate = new BABYLON.PhysicsAggregate(
        cylinder,
        BABYLON.PhysicsShapeType.CYLINDER,
        { mass: 1, restitution: 0.25 },
        scene
    )
    playerAggregate.body.setMotionType(BABYLON.PhysicsMotionType.DYNAMIC)
    playerAggregate.body.setMassProperties({
        inertia: new BABYLON.Vector3(0, 0, 0),
    })

    playerAggregate.body.disablePreStep = false

    return { player, playerAggregate }
}
