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

    let textureLeftOutline = new BABYLON.DynamicTexture(
        'leftOutline',
        w,
        scene,
        false
    )
    textureLeftOutline.hasAlpha = true

    let textureRightOutline = new BABYLON.DynamicTexture(
        'rightOutline',
        w,
        scene,
        false
    )
    textureRightOutline.hasAlpha = true

    let ctxLeftOutline = textureLeftOutline.getContext()
    let ctxRightOutline = textureRightOutline.getContext()

    const createLeftOutline = () => {
        let c = 2

        ctxLeftOutline.moveTo(c, w * 0.25)
        ctxLeftOutline.lineTo(c, c)
        ctxLeftOutline.lineTo(w * 0.25, c)

        ctxLeftOutline.lineWidth = 5
        ctxLeftOutline.strokeStyle = 'rgb(0,101,255)'
        ctxLeftOutline.stroke()

        textureLeftOutline.update()

        return textureLeftOutline
    }

    const createRightOutline = () => {
        let c = 2

        ctxRightOutline.moveTo(w - c, w * 0.75)
        ctxRightOutline.lineTo(w - c, w - c)
        ctxRightOutline.lineTo(w * 0.75, w - c)

        ctxRightOutline.lineWidth = 5
        ctxRightOutline.strokeStyle = 'rgb(255,154,0)'
        ctxRightOutline.stroke()

        textureRightOutline.update()

        return textureRightOutline
    }

    const createNavigate = () => {
        ctx.fillStyle = 'transparent'
        ctx.clearRect(0, 0, w, w)

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
    let leftTexture = createLeftOutline()
    let rightTexture = createRightOutline()
    let material = new BABYLON.StandardMaterial('reticule', scene)

    let leftMaterial = new BABYLON.StandardMaterial('leftMaterial', scene)
    leftMaterial.diffuseTexture = leftTexture
    leftMaterial.opacityTexture = leftTexture
    leftMaterial.emissiveColor.set(1, 1, 1)
    leftMaterial.disableLighting = true

    // Créer le maillage pour la texture gauche
    let leftPlane = BABYLON.MeshBuilder.CreatePlane(
        'leftPlane',
        { size: 0.08 },
        utilLayer.utilityLayerScene
    )
    leftPlane.material = leftMaterial
    leftPlane.position.set(-0.04, 0, 1.1) // Ajustez la position comme nécessaire
    leftPlane.isPickable = false
    leftPlane.parent = camera

    // Créer le matériau pour la texture droite
    let rightMaterial = new BABYLON.StandardMaterial('rightMaterial', scene)
    rightMaterial.diffuseTexture = rightTexture
    rightMaterial.opacityTexture = rightTexture
    rightMaterial.emissiveColor.set(1, 1, 1)
    rightMaterial.disableLighting = true

    // Créer le maillage pour la texture droite
    let rightPlane = BABYLON.MeshBuilder.CreatePlane(
        'rightPlane',
        { size: 0.08 },
        utilLayer.utilityLayerScene
    )
    rightPlane.material = rightMaterial
    rightPlane.position.set(0.04, 0, 1.1) // Ajustez la position comme nécessaire
    rightPlane.isPickable = false
    rightPlane.parent = camera

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

    return { reticule, textTexture, leftPlane, rightPlane }
}
