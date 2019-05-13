/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Camera} Camera object created
    */
    constructor(shader) {
        this.speed = 0.1;

        // Camera view attributes
        this.eye     = new Vector3([0, 1, 1]); 
        this.center  = new Vector3([0,  0.7, -1]);
        this.up      = new Vector3([0,  1,  1]);

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.projectionMatrix = new Matrix4();

        // Specify the viewing volume
        this.projectionMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0, 32);
    }

    rotate() {

    }

    truck(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u); // change to up for rotate

        this.updateView();
    }

    // Rotates the camera’s view horizontally about the camera’s eye location. 
    // You can pan left or pan right. This rotates about a camera’s v axis (center)
    pan(dir) {
          this.center.elements[0] = this.center.elements[0]-dir;    // this is PANNING 

        //  console.log(this.eye.elements[0], " ", this.eye.elements[1], " ", this.eye.elements[2]);
       //   console.log(this.center.elements[0], " ", this.center.elements[1], " ", this.center.elements[2]);
       //   console.log(this.up.elements[0], " ", this.up.elements[1], " ", this.up.elements[2]);
          
       
        //  this.eye.elements[0] = this.eye.elements[0]+dir;  
//this.eye.elements[0] = this.eye.elements[0]+dir;  
      //  this.center.elements[0] = this.center.elements[0]-dir; 
       // this.eye.elements[0] = this.eye.elements[0]+dir;     
        // Add the direction vector to both the eye and center positions
     //   this.up = this.up.add(u);
      
       // this.center = this.center.add(u); // change to up for rotate

        this.updateView();
    }

    tilt(dir) {
        // Add the direction vector to both the eye and center positions
       // this.up = this.up.sub(u);

        //this.eye.elements[1] = this.eye.elements[1]+dir;   
        this.center.elements[1] =  this.center.elements[1]-dir;
        
              
      //this.eye.elements[2] = this.eye.elements[2]+dir;    
    // console.log( this.eye.elements[1]);
       // this.center = this.center.add(u); // change to up for rotate

        this.updateView();
    }
    // Dolly moves a camera closer to, or further from, the location it is 
    // looking at. You can dolly in and dolly out. translation a camera’s n axis.

    // truck along z axis? 
    dolly(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // var u = this.center.cross(n);
        // u = u.normalize();

        // u = u.mul(dir * this.speed);

      //  this.eye = this.eye.add(dir);

       // var v = n.dot(this.eye);
 //this.eye.elements[0] =  this.eye.elements[0]+dir;
  //this.eye.elements[1] =  this.eye.elements[1]+dir;
 //this.eye.elements[1] =  this.eye.elements[1]+dir;

  //this.center.elements[0] =  this.center.elements[0]+dir;
 this.center.elements[1] =  this.center.elements[1]-dir;    //rotates but close to forawrd
 //this.center.elements[2] =  this.center.elements[2]+dir;

 //this.up.elements[0] =  this.up.elements[0]+dir;  // rotates
 //this.up.elements[1] =  this.up.elements[1]+dir;
 //this.up.elements[2] =  this.up.elements[2]+dir;

       // var e = 2;
       // this.eye.elements[e] = this.eye.elements[e]+dir;

       // this.center.elements[e] = this.center.elements[e]+dir;
        //this.center.elements[0] = this.center.elements[0]+dir;    // this is PANNING 
        //  this.eye.elements[0] = this.eye.elements[0]+dir;        // pans too but doesnt work as well. combine?
        console.log(this.eye.elements[2]);
        
        this.updateView();
    }
    zoom(amt) {
       // this.eye.elements[1] =  this.eye.elements[1]+dir;
        this.center.elements[1] = this.center.elements[1]+amt; 
        this.updateView();
    }

    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}
