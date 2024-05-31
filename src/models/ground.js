var CreateGround = function (scene) {
    // var ground = BABYLON.MeshBuilder.CreateGround(
    //     'touch',
    //     { width: 5000, height: 5000},
    //     scene
    // )
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("touch", "utils/img/map.png", {
        width:15000,
        height :15000,
        subdivisions: 50,
        maxHeight: 5000,
        minHeight: 0,
        onReady: (mesh) => {
        var groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.MESH, {mass: 0}, scene)
        }
        });
        const material = new BABYLON.StandardMaterial('ground', scene)
        const texture = new BABYLON.Texture('./utils/textures_ground/red_mud_stones_diff_4k.jpg', scene)
        material.diffuseTexture = texture
        material.specularColor = new BABYLON.Color3.Black();
        ground.material = material
        ground.material.diffuseTexture.uScale = 10;
        ground.material.diffuseTexture.vScale = 10;
        console.log('material', material);  
        ground.position = new BABYLON.Vector3(0, 0, 0)
        ground.isPickable = true
        ground.checkCollisions = true
        console.log('ground', ground.checkCollisions, ground.isPickable, ground.isBlocker);
        return ground
        }
