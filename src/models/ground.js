var CreateGround = function (scene) {
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    return ground;
}