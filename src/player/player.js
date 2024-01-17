var loadPlayer = async (scene) => {
    const model = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        './utils/assets/',
        'SkinModeling.glb',
        scene
    )
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
        'cylinder',
        { diameter: 0.3, height: 1 },
        scene
    )
    player = model.meshes[0]
    cylinder.bakeCurrentTransformIntoVertices()
    cylinder.addChild(player)
    

    const skeleton = model.skeletons[0]

    skeleton.animationPropertiesOverride =
        new BABYLON.AnimationPropertiesOverride()
    skeleton.animationPropertiesOverride.enableBlending = true
    skeleton.animationPropertiesOverride.blendingSpeed = 0.05
    skeleton.animationPropertiesOverride.loopMode = 1

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

    return { player, playerAggregate }
}
