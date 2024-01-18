var loadPlayer = async (scene) => {
    const model = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        './utils/assets/',
        'SkinModeling.glb',
        scene
    )
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
        'cylinder',
        { diameter: 0.5, height: 1.5 },
        scene
    )
    cylinder.position = new BABYLON.Vector3(0, 0.75, 0)
    player = model.meshes[0]
    cylinder.bakeCurrentTransformIntoVertices()
    cylinder.addChild(player)


    const playerAggregate = new BABYLON.PhysicsAggregate(
        cylinder,
        BABYLON.PhysicsShapeType.CYLINDER,
        { mass: 1, restitution: 0.75 },
        scene
    )
    playerAggregate.body.setMotionType(BABYLON.PhysicsMotionType.DYNAMIC)
    playerAggregate.body.setMassProperties({
        inertia: new BABYLON.Vector3(0, 0, 0),
    })

    playerAggregate.body.setLinearVelocity(0,0,5)

    return { player, playerAggregate }
}
