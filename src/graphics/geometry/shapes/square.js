/**
 * Specifies a Square. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, x, y, image) {
      super(shader, x, y);

      this.vertices = this.generateSquareVertices();

      this.vertices[0].texCoord = [1.0, 1.0];
      this.vertices[1].texCoord = [0.0, 1.0];
      this.vertices[2].texCoord = [0.0, 0.0];
      this.vertices[3].texCoord = [0.0, 0.0];
      this.vertices[4].texCoord = [1.0, 0.0];
      this.vertices[5].texCoord = [1.0, 1.0];

      this.faces = {0: this.vertices};
      this.image = image;
      this.rot = 0;   

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = this.x;//(this.x/canvas.width)*2-1;
      var y = this.y;//(this.y/canvas.height)*-2+1;
      var z = 0.0;
//console.log("square : " + x);
      //var size = document.getElementById("size").value/10;
      var size = 0.5;

      // Vertices
    //   var vertex1 = new Vertex(x,  y, x);
    //   var vertex2 = new Vertex(-x, y, x);
    //   var vertex3 = new Vertex(-x, y, -x);
    //   var vertex4 = new Vertex(-x, y, -x);
    //   var vertex5 = new Vertex(x,  y, -x);
    //   var vertex6 = new Vertex(x,  y, x);

      var vertex1 = new Vertex(x+size,  0, y+size);
      var vertex2 = new Vertex(x-size,  0, y+size);
      var vertex3 = new Vertex(x-size,  0, y-size);
      var vertex4 = new Vertex(x-size,  0, y-size);
      var vertex5 = new Vertex(x+size,  0, y-size);
      var vertex6 = new Vertex(x+size,  0, y+size);

      // var vertex1 = new Vertex(x+size,  0, x+size);
      // var vertex2 = new Vertex(x-size,  0, x+size);
      // var vertex3 = new Vertex(x-size,  0, x-size);
      // var vertex4 = new Vertex(x-size,  0, x-size);
      // var vertex5 = new Vertex(x+size,  0, x-size);
      // var vertex6 = new Vertex(x+size,  0, x+size);

      // var vertex1 = new Vertex(x, x, z);
      // var vertex2 = new Vertex(-x, x, z);
      // var vertex3 = new Vertex(-x, -x, z);
      // var vertex4 = new Vertex(-x, -x, z);
      // var vertex5 = new Vertex(x, -x, z);
      // var vertex6 = new Vertex(x, x, z);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
  }

  // Rotates the square every frame
  render() {
    // // Object's gl coordinates
    // var x = (this.x/canvas.width)*2-1;
    // var y = (this.y/canvas.height)*-2+1;

    // // Translate origin to center of the object and update matrix
    // this.translationMatrix = new Matrix4();
    // this.translationMatrix.setTranslate(x, y, 0);
    // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

    // // Rotate the matrix around object's center
    // this.rotationMatrix = new Matrix4();
    // this.rotationMatrix.setRotate(-0.5, 0, 0, 1);
    // this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

    // // Translate object back for proper rotation
    // this.translationMatrix.setTranslate(-x, -y, 0);
    // this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

     //this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
