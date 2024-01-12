

const playerWalkSpeed = 0.23;
const playerRunSpeed = 0.1;
const playerSpeedBackwards = 0.01;
const playerRotationSpeed = 0.1;
const runAnimSpeed = 3;
const walkAnimSpeed = 1;

let speed;
let animSpeed;

let moving = false;

var handlePlayerMovement = function (keyStatus, scene, player) {
    const walkAnim = scene.getAnimationGroupByName("Walking");
    const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
    const idleAnim = scene.getAnimationGroupByName("Idle");
    const sambaAnim = scene.getAnimationGroupByName("Samba");

    if (keyStatus.z ||
        keyStatus.s ||
        keyStatus.q ||
        keyStatus.d ||
        keyStatus.b) {
            moving = true;
            if (keyStatus.s && !keyStatus.z) {
                speed = -playerSpeedBackwards;
                walkBackAnim.start(true, 1, walkBackAnim.from, walkBackAnim.to, false);
            }
            else if (keyStatus.z || keyStatus.q || keyStatus.d) {
                speed = keyStatus.Shift ? playerRunSpeed : playerWalkSpeed;
                animSpeed = keyStatus.Shift ? runAnimSpeed : walkAnimSpeed;
                walkAnim.speedRatio = animSpeed;
                walkAnim.start(true, animSpeed, walkAnim.from, walkAnim.to, false);
            }
            if (keyStatus.q) {
                player.rotate(BABYLON.Vector3.Up(), -playerRotationSpeed)
            }
            if (keyStatus.d) {
                player.rotate(BABYLON.Vector3.Up(), playerRotationSpeed)
            }
            if (keyStatus.b) {
                sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
            }
            player.moveWithCollisions(player.forward.scaleInPlace(speed));
        }
    else if (moving){
        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
        sambaAnim.stop();
        walkAnim.stop();
        walkBackAnim.stop();
        moving = false;
    }
};