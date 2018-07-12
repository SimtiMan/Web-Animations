// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}


var funkySin =1;
var funkyCos=1;
const colorArray = ['#00bdff', '#4d39ce', '#088eff'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    reinitialize()
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
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI*2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50,250);
    this.lastMouse={x: x, y: y};

}

Particle.prototype.update = function() {
    const lastPoint = {x: this.x , y:this.y};
    //Move points over time
    this.radians += this.velocity;

    //Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    //Circular Motion
    var sinF = document.getElementById("sinF").value;
    if(isNaN(sinF)){
        funkySin=Math.sin(this.radians);
    }

    var cosF = document.getElementById("cosF").value;
    if(isNaN(cosF)){
        funkyCos=Math.cos(this.radians);
    }

    this.x = this.lastMouse.x + Math.cos(this.radians)*funkySin*this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radians)* funkyCos*this.distanceFromCenter;

    this.draw(lastPoint)
}

Particle.prototype.draw = function(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x,lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();

}

// Implementation
var particles;
var particule =100;

function reinitialize() {
    
    var nP = parseInt(document.getElementById("nrBlue").value);
    if(!isNaN(nP)){
        particule = nP;
    }

    var cul1 = document.getElementById("culoare1").value;
    colorArray[4]=cul1;

    var cul2 = document.getElementById("culoare2").value;
  colorArray[5]=cul2;

  var cul3 = document.getElementById("culoare3").value;
  colorArray[6]=cul3;



    particles = [];
    for (var i = 0; i < particule; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius,randomColor(colorArray)));
    }
    console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(2,2,2,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height)


     particles.forEach(particle => {
      particle.update();
     });

}

reinitialize()
animate()
