function dynamicCrosshair(distance, textTexture) {
    let ctx = textTexture.getContext()

    if (distance) {
        ctx.clearRect(
            0,
            0,
            textTexture.getSize().width,
            textTexture.getSize().height
        ) // Efface le canvas
        if (distance > 200 && distance < 500) {
            ctx.fillStyle = 'red'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(distance.toFixed(2), 256, 128) // Centre le texte dans la texture
            textTexture.update()
        } else if (distance < 200) {
            ctx.fillStyle = 'white'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(distance.toFixed(2), 256, 128) // Centre le texte dans la texture
            textTexture.update()
        } else {
            ctx.clearRect(
                0,
                0,
                textTexture.getSize().width,
                textTexture.getSize().height
            ) // Efface le canvas
        }
    } else {
        ctx.clearRect(
            0,
            0,
            textTexture.getSize().width,
            textTexture.getSize().height
        ) // Efface le canvas
    }
    textTexture.update()
    return textTexture
}

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

    let textTexture = new BABYLON.DynamicTexture(
        'textTexture',
        { width: 512, height: 256 },
        scene,
        false
    )
    textTexture.hasAlpha = true

    let ctxText = textTexture.getContext()
    ctxText.fillStyle = 'white'
    ctxText.font = 'bold 20px Arial'
    ctxText.textAlign = 'center'
    ctxText.textBaseline = 'middle'
    ctxText.fillText('text', 256, 128) // Centre le texte dans la texture
    textTexture.update()

    let textMaterial = new BABYLON.StandardMaterial('textMaterial', scene)
    textMaterial.diffuseTexture = textTexture
    textMaterial.opacityTexture = textTexture
    textMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1)
    textMaterial.disableLighting = true

    let textPlane = BABYLON.MeshBuilder.CreatePlane(
        'textPlane',
        { width: 0.5, height: 0.25 },
        utilLayer.utilityLayerScene
    )
    textPlane.material = textMaterial
    textPlane.position = new BABYLON.Vector3(0, -0.06, 1.1) // Position ajustée
    textPlane.parent = camera

    return { reticule, textTexture }
}
