var shader = null;
var count = 0;
var timer = 0;

// change to 32x32 later
// 8 x 8 rn
var map = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4],
    [4, 0, 2, 2, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4],
    [4, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
    [4, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 4],
    [4, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 4],
    [4, 0, 3, 0, 0, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 2, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 4],
    [4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], 
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
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

  inputHandler.readTexture("objs/sky.jpg", function(image) {//sky.jpg
      var shape = new Cube(shader, 0, 0, image, 16);
      scene.addGeometry(shape);
  })


  inputHandler.readTexture("objs/grass3.png", function(image) {
      // for loop to create plane later, or scale it
      var shape;

  // 16 x 16 rn
      for(var i = -8; i < 9; i+= 1) {
        for(var j = 0; j < 17; j += 1) {
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
      var posX = -8;
      var posZ = 0; 
      var size = 0.5;

      // row and col will be the same length
      for(var i = 0; i < map.length; i++) {
        //  console.log("i ", i);
          for(var j = 0; j < map.length; j++) {
         //   console.log("j ", j);
          //  console.log(map[i][j]);
              posX += size*2;
              console.log(posZ);
              if(map[i][j] == 1) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
              } 
              else if(map[i][j] == 2) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 3) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 3);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 4) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 3);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 4);
                  scene.addGeometry(shape);
              }

          }
          // reset positon x and move along z
          posX = -8;
          posZ += size*2;
      }

  })

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();

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
