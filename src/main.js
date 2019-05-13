var shader = null;
var count = 0;
var timer = 0;

// change to 32x32 later
// 8 x 8 rn
var map = [
    [3, 2, 2, 1, 3, 2, 2, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();
  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  // Add uniforms
  var idMatrix = new Matrix4();
  var identityMat = new Matrix4();

  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  shader.addUniform("u_ViewMatrix", "mat4", identityMat.elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_Sampler", "sampler2D", 0);

  inputHandler.readTexture("objs/sky.jpg", function(image) {
      var shape = new Cube(shader, 0, 0, image, 5);
      scene.addGeometry(shape);
  })


  inputHandler.readTexture("objs/grass2.png", function(image) {
      // for loop to create plane later, or scale it
      var shape;
     // shape = new Square(shader, -0.5, -0.5, image);
     // scene.addGeometry(shape);
     
     // size is x (0.5). change to 16 later to make it 32 by 32

// shape = new Square(shader, -0.5, -0.5, image);
//           scene.addGeometry(shape);

      for(var i = -3; i < 3; i+= 1) {
        for(var j = -3; j < 3; j += 1) {
          //shape = new Square(shader, -0.5, -0.5, image);
          shape = new Square(shader, i, j, image);
          scene.addGeometry(shape);
        }
      }
     // shape = new Square(shader, 0.5, 0, image);
       // scene.addGeometry(shape);
  })


  inputHandler.readTexture("objs/dirt.jpg", function(image) {
      
      var shape;
      console.log("map len ", map.length);
      // position for x val will be updated per j val 
      var posX = -5;
      var posY = -5;  // posZ
      
      // row and col will be the same length
      for(var i = 0; i < map.length; i++) {
        //  console.log("i ", i);
          for(var j = 0; j < map.length; j++) {
         //   console.log("j ", j);
          //  console.log(map[i][j]);
              posX+=0.3;
              if(map[i][j] == 1) {
                  shape = new Cube(shader, posX, posY, image, 0.2);
                  scene.addGeometry(shape);
              } 
              else if(map[i][j] == 2) {
                  shape = new Cube(shader, posX, posY, image, 0.2);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posY, image, 0.2, 2);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 3) {
                  shape = new Cube(shader, posX, posY, image, 0.2);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posY, image, 0.2, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posY, image, 0.2, 3);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 4) {
                  shape = new Cube(shader, posX, posY, image, 0.2);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posY, image, 0.2, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posY, image, 0.2, 3);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posY, image, 0.2, 4);
                  scene.addGeometry(shape);
              }

          }
          posY+=0.3;
      }

      // shape = new Cube(shader, 0, 0, image, 0.2);
      // scene.addGeometry(shape);
  })




  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();

  




  // Load the initial textured cube
  // var image = new Image();
  // image.src = 'objs/sky.jpg';

  // // Add the cube into the scene once the image is loaded
  // image.onload = function() {
  //   var shape = new Cube(shader, 130, 200, image, 1);
  //   scene.addGeometry(shape);
  // }

  // Update global counter for fluctuating triangles and moving circles
  var tick = function() {
    count++;
    timer++;

    if(count == 30) 
      count = 0;

    requestAnimationFrame(tick);
  }
  tick();
}
