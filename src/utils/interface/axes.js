// // axes.js
// console.log("Axes script loaded.");

// const setBottomLeftAxis = (scene, camera) => {
//   const axis = new BABYLON.AxesViewer(scene, 1);

//   camera.onViewMatrixChangedObservable.add(() => {
//     var p = camera.position.clone();
//     p.addInPlace(camera.getDirection(new BABYLON.Vector3(0, 0, -15)));
//     p.addInPlace(camera.getDirection(new BABYLON.Vector3(0, -6, 0)));
//     p.addInPlace(camera.getDirection(new BABYLON.Vector3(-6.5, 0, 0)));
//     axis.xAxis.position = p.clone();
//     axis.yAxis.position = p.clone();
//     axis.zAxis.position = p.clone();

//     // Show axes
//     var showAxis = function (size) {
//       // Check if axes already created, then adjust positions
//       if (
//         scene.getMeshByName("axisX") &&
//         scene.getMeshByName("axisY") &&
//         scene.getMeshByName("axisZ")
//       ) {
//         var axisX = scene.getMeshByName("axisX");
//         var axisY = scene.getMeshByName("axisY");
//         var axisZ = scene.getMeshByName("axisZ");

//         axisX.position = axis.xAxis.position;
//         axisY.position = axis.yAxis.position;
//         axisZ.position = axis.zAxis.position;
//       }
//       // If no axes created, create text plane, labels, and axes
//       else {
//         // Text Plane
//         var makeTextPlane = function (text, color, size) {
//           var dynamicTexture = new BABYLON.DynamicTexture(
//             "DynamicTexture",
//             50,
//             scene,
//             true
//           );
//           dynamicTexture.hasAlpha = true;
//           dynamicTexture.drawText(
//             text,
//             5,
//             40,
//             "bold 36px Arial",
//             color,
//             "transparent",
//             true
//           );
//           var plane = new BABYLON.Mesh.CreatePlane(
//             "TextPlane",
//             size,
//             scene,
//             true
//           );
//           plane.material = new BABYLON.StandardMaterial(
//             "TextPlaneMaterial",
//             scene
//           );
//           plane.material.backFaceCulling = false;
//           plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
//           plane.material.diffuseTexture = dynamicTexture;
//           return plane;
//         };

//         // Rescale of labels
//         var labelSize = size * 5;

//         // X
//         var axisX = BABYLON.Mesh.CreateLines(
//           "axisX",
//           [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0)],
//           scene
//         );
//         axisX.color = new BABYLON.Color3(1, 0, 0);
//         var xChar = makeTextPlane("X", "red", labelSize / 10);
//         xChar.position = new BABYLON.Vector3(1.625 * size, 0.05 * size, 0);

//         // Y
//         var axisY = BABYLON.Mesh.CreateLines(
//           "axisY",
//           [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0)],
//           scene
//         );
//         axisY.color = new BABYLON.Color3(0, 1, 0);
//         var yChar = makeTextPlane("Y", "green", labelSize / 10);
//         yChar.position = new BABYLON.Vector3(
//           0.0125 * size,
//           1.625 * size,
//           0.025 * size
//         );

//         // Z
//         var axisZ = BABYLON.Mesh.CreateLines(
//           "axisZ",
//           [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size)],
//           scene
//         );
//         axisZ.color = new BABYLON.Color3(0, 0, 1);
//         var zChar = makeTextPlane("Z", "blue", labelSize / 10);
//         zChar.position = new BABYLON.Vector3(
//           0.10 * size,
//           0 * size,
//           1.625 * size
//         );

//         // Rotation
//         xChar.rotation.x = Math.PI / 2;
//         yChar.rotation.x = Math.PI / 2;
//         zChar.rotation.x = Math.PI / 2;

//         // Parent
//         xChar.parent = axisX;
//         yChar.parent = axisY;
//         zChar.parent = axisZ;
//       }
//     };
//     showAxis(1);
//   });
// };

// window.setBottomLeftAxis = setBottomLeftAxis;
