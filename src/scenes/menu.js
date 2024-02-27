var createMenuScene = function (app) {
    // Créer une scène
    var scene = new BABYLON.Scene(engine)

    // Créer une caméra, des lumières, etc.
    var backgroundCamera = new BABYLON.FreeCamera(
        'backgroundCamera',
        new BABYLON.Vector3(0, 0, -10),
        scene
    )
    backgroundCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA
    backgroundCamera.orthoTop = 5 // Ajustez ces valeurs en fonction de la taille de votre arrière-plan
    backgroundCamera.orthoBottom = -5
    backgroundCamera.orthoLeft = -5
    backgroundCamera.orthoRight = 5
    scene.activeCamera = backgroundCamera

    // Créer le GUI
    var advancedTexture =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

    //Créer le background
    var background = BABYLON.MeshBuilder.CreatePlane(
        'background',
        { size: 10 },
        scene
    )
    background.position.z = -5 // Assurez-vous que le plan est derrière les autres éléments

    var backgroundMaterial = new BABYLON.StandardMaterial(
        'backgroundMaterial',
        scene
    )
    backgroundMaterial.diffuseTexture = new BABYLON.Texture(
        './utils/img/menu_bg.png',
        scene
    )
    // backgroundMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1) // Luminosité blanche
    background.material = backgroundMaterial

    background.scaling.x = 1.5 // Ajustez la largeur si nécessaire
    background.scaling.y = 1.5 // Ajustez la hauteur si nécessaire
    background.position.y = 0 // Position verticale

    scene.activeCamera = backgroundCamera

    // Créer un bouton "Jouer"
    var playButton = BABYLON.GUI.Button.CreateSimpleButton(
        'playButton',
        'Jouer'
    )
    playButton.width = '150px'
    playButton.height = '40px'
    playButton.color = 'white'
    playButton.background = 'green'
    playButton.onPointerUpObservable.add(function () {
        // canvas.requestPointerLock()
        app.sound.audioContext.resume()
        return (app.state = 'game')
    })
    advancedTexture.addControl(playButton)

    // Créer un bouton "Options"
    var optionsButton = BABYLON.GUI.Button.CreateSimpleButton(
        'optionsButton',
        'Options'
    )
    optionsButton.width = '150px'
    optionsButton.height = '40px'
    optionsButton.color = 'white'
    optionsButton.background = 'blue'
    optionsButton.onPointerUpObservable.add(function () {
        // Afficher les options
    })
    optionsButton.top = '50px' // Décaler le bouton "Options"
    advancedTexture.addControl(optionsButton)
    app.menu.scene = scene
    return app
}
