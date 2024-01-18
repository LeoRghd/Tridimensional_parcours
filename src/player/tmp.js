// const skeleton = model.skeletons[0]

// skeleton.animationPropertiesOverride =
//     new BABYLON.AnimationPropertiesOverride()
// skeleton.animationPropertiesOverride.enableBlending = true
// skeleton.animationPropertiesOverride.blendingSpeed = 0.05
// skeleton.animationPropertiesOverride.loopMode = 1

// Player
// idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false)
// runAnim.start(true, 1.0, runAnim.from, runAnim.to, false);
// jumpAnim.start(true, 1.0, jumpAnim.from, jumpAnim.to, false);
// sambaAnim.stop();
// walkAnim.stop();
// walkBackAnim.stop();
// walkVelocity.set(0, 0, 0)
// rotateVelocity.set(0, 0, 0)
playerAggregate.body.setLinearVelocity(stopVector)
// playerAggregate.body.setAngularVelocity(rotateVelocity)
moving = false

// stopVector = new BABYLON.Vector3(0, 0, 0)
// rotateLeftRight = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI / 2)

// const getBoxDirection = function () {
//     const forward = BABYLON.Vector3.TransformCoordinates(
//         new BABYLON.Vector3(0, 0, 1),
//         player.computeWorldMatrix(true)
//     );
//     const direction = forward.subtract(player.position);
//     return direction;
// }
// const smoothRotate = function () {
//     const dir = getBoxDirection();
//     const rot = BABYLON.Quaternion.FromLookDirectionRH(dir, BABYLON.Vector3.Up());
//     // const [mesheRoot] = player.getChildMeshes();

//     player.rotationQuaternion =
//         player.rotationQuaternion || BABYLON.Quaternion.Identity();
//     BABYLON.Quaternion.SlerpToRef(
//         player.rotationQuaternion,
//         rot,
//         0.1,
//         player.rotationQuaternion
//     );
// }
