var getKeyStatus = function (scene) {
    let keyStatus = {
        z: false,
        s: false,
        q: false,
        d: false,
        b: false,
        Shift: false,
        space: false,
    }

    scene.actionManager = new BABYLON.ActionManager(scene)

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            (event) => {
                let key = event.sourceEvent.key
                //key input for test
                if (key == 'e') {
                    // runRay()
                }
                if (key === ' ') {
                    // Utilisez 'Space' au lieu de ' '
                    key = 'space'
                }
                if (key !== 'Shift') {
                    key = key.toLowerCase()
                }
                if (key in keyStatus) {
                    keyStatus[key] = true // Mettez à true lorsque la touche est pressée
                }
            }
        )
    )

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            (event) => {
                let key = event.sourceEvent.key
                if (key === ' ') {
                    // Utilisez 'Space' au lieu de ' '
                    key = 'space'
                }
                if (key !== 'Shift') {
                    key = key.toLowerCase()
                }
                if (key in keyStatus) {
                    keyStatus[key] = false // Mettez à false lorsque la touche est relâchée
                }
            }
        )
    )

    return keyStatus
}
