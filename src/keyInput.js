var getKeyStatus = function (scene) {
    let keyStatus = {
        z: false,
        s: false,
        q: false,
        d: false,
        b: false,
        Shift: false,
      };
    
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        (event) => {
        let key = event.sourceEvent.key;
        if(key !== "Shift"){
            key = key.toLowerCase();
        }
        if(key in keyStatus) {
            keyStatus[key] = true;
        }
        }
    )
    );

    scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger, (event) => {
        let key = event.sourceEvent.key;
        if (key !== "Shift"){
            key = key.toLowerCase();
        }
        if (key in keyStatus) {
            keyStatus[key] = false
        }
        }
    )
    );
    
    return keyStatus;
};