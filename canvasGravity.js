// reinitializeial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}


const colorArray = []

var gravity=1;
var friction=0.8;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    reinitialize();
})

addEventListener("click",function(){
  reinitialize();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Ball(x, y,vitezaDX, vitezaDY, radius, color) {
    this.x = x
    this.y = y
    this.vitezaDX = vitezaDX;
    this.vitezaDY=vitezaDY;
    this.radius = radius
    this.color = color
}

Object.prototype.update = function() {
  if(this.y+ this.radius + this.vitezaDY>canvas.height)
  {
      this.vitezaDY= -this.vitezaDY * friction;                                           // loveste fundu ecrenului si se intoarece inapoi
                                                                                          // friction scade dreptat valoare ca sa dea efectul de gravitate
  }
    else{
     var gR = parseInt(document.getElementById("gravity").value)
     if(!isNaN(gR)){
       gravity=gR;

     }
      this.vitezaDY += gravity;
    }

    if(this.x + this.radius + this.vitezaDX >canvas.width || this.x - this.radius <= 0){
      this.vitezaDX = -this.vitezaDX;
    }

    this.x += this.vitezaDX;
    this.y +=this.vitezaDY;
    this.draw()
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
}

// Implementation
var ball;
let objects
var nrBulee =100;

function reinitialize() {
  var nB = parseInt(document.getElementById("nrBlue").value);
  if(!isNaN(nB)){
    nrBulee = nB;
  }

  var cul1 = document.getElementById("culoare1").value;
  colorArray[0]=cul1;

  var cul2 = document.getElementById("culoare2").value;
  colorArray[1]=cul2;

  var cul3 = document.getElementById("culoare3").value;
  colorArray[2]=cul3;

  var cul4 = document.getElementById("culoare4").value;
  colorArray[3]=cul4;


    ballArray = [];
   for(var i=0; i<nrBulee;i++){
     var radius = randomIntFromRange(10,20);
     var x=randomIntFromRange(radius,canvas.width - radius);
     var y=randomIntFromRange(0,canvas.height - radius);
     var vitezaDX = randomIntFromRange(-2,2);
     var vitezaDY = randomIntFromRange(-2,2);
     var color = randomColor(colorArray);
     ballArray.push(new Ball(x,y,vitezaDX,vitezaDY,radius,color));
   }
   console.log(ballArray);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for(var i=0 ; i<ballArray.length;i++){
        ballArray[i].update();
    }


}

reinitialize()
animate()
