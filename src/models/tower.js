
var  createTower = function (w,h,d, scene) {
  var tower = BABYLON.MeshBuilder.CreatePlane("rectangle", {width: w, height: h, depth: d}, scene)
  const texture = new BABYLON.Texture("./utils/textures/rock.png", scene);
  const material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = texture;
  tower.material = material;
  return tower
}