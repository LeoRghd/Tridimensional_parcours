
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
    // cylinder.rotation.y = 45 * (Math.PI/180)
    cylinder.isVisible = false
    player = model.meshes[0]
    cylinder.addChild(player)


    const sphere = BABYLON.MeshBuilder.CreateSphere('head', {diameter: 0.5}, scene)
    sphere.position = new BABYLON.Vector3(0, 2.5, 0)
    sphere.isVisible = false
    cylinder.addChild(sphere)

    const playerAggregate = new BABYLON.PhysicsAggregate(
        cylinder,
        BABYLON.PhysicsShapeType.CYLINDER,
        { mass: 10, restitution: 0.75 },
        scene
    )
    playerAggregate.body.setMotionType(BABYLON.PhysicsMotionType.DYNAMIC)
    playerAggregate.body.setMassProperties({
        inertia: new BABYLON.Vector3(0, 0, 0),
    })

    playerAggregate.body.disablePreStep = false

    return { player, playerAggregate }
}
