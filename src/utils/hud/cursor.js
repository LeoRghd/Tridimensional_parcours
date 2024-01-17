function addCrosshair(scene, camera) {
    var utilLayer = new BABYLON.UtilityLayerRenderer(scene)

    const white = 'rgba(255, 255, 255, 0.8)'
    const red = 'rgba(249, 0, 0, 0.8)'
    let w = 128

    let texture = new BABYLON.DynamicTexture('reticule', w, scene, false)
    texture.hasAlpha = true

    let ctx = texture.getContext()
    let reticule

    const createOutline = () => {
        let c = 2

        ctx.moveTo(c, w * 0.25)
        ctx.lineTo(c, c)
        ctx.lineTo(w * 0.25, c)

        ctx.moveTo(w - c, w * 0.75)
        ctx.lineTo(w - c, w - c)
        ctx.lineTo(w * 0.75, w - c)

        ctx.lineWidth = 5
        ctx.strokeStyle = white
        ctx.stroke()
    }

    const createNavigate = () => {
        ctx.fillStyle = 'transparent'
        ctx.clearRect(0, 0, w, w)
        createOutline()

        ctx.strokeStyle = white
        ctx.lineWidth = 5
        ctx.moveTo(w * 0.5, w * 0.25)
        ctx.lineTo(w * 0.5, w * 0.75)

        ctx.moveTo(w * 0.25, w * 0.5)
        ctx.lineTo(w * 0.75, w * 0.5)
        ctx.stroke()
        ctx.beginPath()

        texture.update()
    }

    createNavigate()

    let material = new BABYLON.StandardMaterial('reticule', scene)
    material.diffuseTexture = texture
    material.opacityTexture = texture
    material.emissiveColor.set(1, 1, 1)
    material.disableLighting = true

    let plane = BABYLON.MeshBuilder.CreatePlane(
        'reticule',
        { size: 0.08 },
        utilLayer.utilityLayerScene
    )
    plane.material = material
    plane.position.set(0, 0, 1.1)
    plane.isPickable = false
    plane.rotation.z = Math.PI / 4

    reticule = plane
    reticule.parent = camera
    return reticule
}
