function createFollowCamera(scene, player, lock) {
    const camera = new BABYLON.ArcRotateCamera(
        'followCamera',
        -30,
        0,
        4,
        new BABYLON.Vector3(0, 0, 10),
        scene
    )

    camera.speed = 0.1
    camera.attachControl(scene, true)
    const cylinder = player.parent
    // const parent = 
    const head = cylinder.getChildren().find(function(element) {
      return element.name === "head"
    })
    camera.setTarget(head)

    if (!lock) return camera

    var isLocked = false

    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {
        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (!isLocked) {
            canvas.requestPointerLock =
                canvas.requestPointerLock ||
                canvas.msRequestPointerLock ||
                canvas.mozRequestPointerLock ||
                canvas.webkitRequestPointerLock
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock()
            }
        }

        //continue with shooting requests or whatever :P
        if (evt === 0) {
            castRay()
        } //(left mouse click)
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
    }

    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function () {
        var controlEnabled =
            document.mozPointerLockElement ||
            document.webkitPointerLockElement ||
            document.msPointerLockElement ||
            document.pointerLockElement ||
            null

        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            return (isLocked = false)
        } else {
            //camera.attachControl(canvas);
            return (isLocked = true)
        }
    }

    // Attach events to the document
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    document.addEventListener('mspointerlockchange', pointerlockchange, false)
    document.addEventListener('mozpointerlockchange', pointerlockchange, false)
    document.addEventListener(
        'webkitpointerlockchange',
        pointerlockchange,
        false
    )

    //Désactiver le clic drag de la caméra
    // camera.inputs.attached.pointers.buttons = [ 2]
    return camera
}
