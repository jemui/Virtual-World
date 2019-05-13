/**
 * Specifies a Cube. A subclass of geometry.
 * 
 * Bug: 
 * New textures replace old ones. 
 * New textures are created and textured, but old ones are ignored. 
 * 
 * @author Lucas N. Ferreira
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @param {Image} image Takes in texture for texture coordinates (Optional)
   * @param {Custom} custom Renders initial cube differently (Optional)
   * @returns {Cube} Cube created
   */
  constructor(shader, x, y, image, size, height) { //image
      super(shader, x, y);

      if(size == null) 
          this.size = 0.5;
      else 
          this.size = size;

      // add this to existing z 
      if(height == null) 
          this.height = 0;
      else if(height == 2)
          this.height = this.size;
      else if(height == 3)
          this.height = this.size*2;
      else 
          this.height = this.size*3;

      this.vertices = this.generateCubeVertices(this.size, this.height);
      this.faces = {0: this.vertices};
      this.image = image;
      

      for(var i = 0; i < this.vertices.length; i+=6) {
          this.vertices[i].texCoord   = [1.0, 1.0];
          this.vertices[i+1].texCoord = [0.0, 1.0];
          this.vertices[i+2].texCoord = [0.0, 0.0];
          this.vertices[i+3].texCoord = [0.0, 0.0];
          this.vertices[i+4].texCoord = [1.0, 0.0];
          this.vertices[i+5].texCoord = [1.0, 1.0];
      }
    //   this.translationMatrix = new Matrix4();

    //     this.translationMatrix.setTranslate(0.1, 0, 0.5);
    //     this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    //     this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

    //     this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(size, height) {
      var vertices = []

      // avoid clipping by dividing by a number greater than size
      //var size = document.getElementById("size").value/10;
    //  var size = this.size;
      // convert to gl coordinates
      var x = this.x;//(this.x/canvas.width)*2-1;
      var y = height+0.21; //this is height  //this.y-size;//(this.y/canvas.height)*-2+1;
      var z = size; // new "y." Affects position but cant change :/

      console.log(x + " " + y + " " + size);
      // front face
      var vertex1 = new Vertex( x+size, y+size, z);  // v0 
      var vertex2 = new Vertex( x-size, y+size, z); // v1
      var vertex3 = new Vertex( x-size, y-size, z); // v2
      var vertex4 = new Vertex( x-size, y-size, z); // v2 
      var vertex5 = new Vertex( x+size, y-size, z); // v3
      var vertex6 = new Vertex( x+size, y+size, z); // v0

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // right face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x+size, y+size , z); // v0
      vertex3 = new Vertex( x+size, y-size, z); // v3
      vertex4 = new Vertex( x+size, y-size, z); // v3
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // back face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y-size, -z); // v7
      vertex4 = new Vertex( x-size, y-size, -z); // v7
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // left face
      vertex1 = new Vertex( x-size, y+size, -z); // v6 
      vertex2 = new Vertex( x-size, y+size , z); // v1
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x-size, y-size, -z); // v7
      vertex6 = new Vertex( x-size, y+size, -z); // v6

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // top face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y+size, z); // v1
      vertex4 = new Vertex( x-size, y+size, z); // v1
      vertex5 = new Vertex( x+size, y+size, z); // v0
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // bottom face
      vertex1 = new Vertex( x+size, y-size, -z); // v4
      vertex2 = new Vertex( x-size, y-size , -z); // v7
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x+size, y-size, z); // v3
      vertex6 = new Vertex( x+size, y-size, -z); // v4
  
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);
      return vertices;
  }

  render() {
    //   // Object's gl coordinates
    //    var x = (this.x/canvas.width)*2-1;
    //    var y = (this.y/canvas.height)*-2+1;

    //    // Translate origin to center of the object and update matrix
    //    this.translationMatrix = new Matrix4();
    //    this.translationMatrix.setTranslate(x, y, 0);
    //    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

    //    // Rotate the object
    //    this.rotationMatrix = new Matrix4();
    //    this.rotationMatrix.setRotate(0.5, 1, 1, 0);
    //    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

    //    // Translate object back for proper rotation
    //    this.translationMatrix.setTranslate(-x, -y, 0);
    //    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    //    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

    //    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
