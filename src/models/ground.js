var CreateGround = function (scene) {
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution : 0.7});
    return ground;
}