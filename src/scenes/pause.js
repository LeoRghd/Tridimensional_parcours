var createPauseScene = function (app) {
    var scene = new BABYLON.Scene(engine)

    // Create a FreeCamera
    var camera = new BABYLON.FreeCamera(
        'camera1',
        new BABYLON.Vector3(0, 5, -10),
        scene
    )
    camera.setTarget(BABYLON.Vector3.Zero())

    // Attach the camera to the canvas
    // camera.attachControl(canvas, true)

    // Create a basic light
    var light = new BABYLON.HemisphericLight(
        'light1',
        new BABYLON.Vector3(0, 1, 0),
        scene
    )

    // Create a GUI
    var advancedTexture =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

    // Create a panel
    var panel = new BABYLON.GUI.StackPanel()
    panel.width = '220px'
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(panel)

    // Create a button
    var button = BABYLON.GUI.Button.CreateSimpleButton('button', 'Resume')
    button.width = '100px'
    button.height = '40px'
    button.color = 'white'
    button.cornerRadius = 20
    button.background = 'green'
    button.onPointerDownObservable.add(function () {
        app.isPaused = false // Set game state to not paused
        app.timer.start() // Resume timer
        console.log('Game resumed')
    })
    panel.addControl(button)
    app.pause.scene = scene
    return app
}
