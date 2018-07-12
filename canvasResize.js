var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

//var maxRadius = 30;
var minRadius =2;


var colorArray=[
  '#E6F5F7',
  '#9FE3DD',
  '#08AFEE',
  '#F3F3F3',

];


window.addEventListener('mousemove',
 function (event){
   mouse.x=event.x;
   mouse.y=event.y;

})

window.addEventListener('resize',function(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  init();
});

function Circle(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius= radius;
  this.minRadius=radius;
  this.color = colorArray[Math.floor(Math.random()* colorArray.length)];
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y , this.radius , 0, Math.PI * 2, false);
    c.strokeStyle ='blue';
    c.fillStyle = this.color;
    c.fill();

  }

  this.update=function(){
    if(this.x + this.radius>innerWidth || this.x- this.radius <0){
      this.dx=-this.dx;
    }

    if(this.y+this.radius>innerHeight || this.y- this.radius <0){
      this.dy=-this.dy;
    }
    this.x=this.x+this.dx;
    this.y=this.y+this.dy;

    //interactivity
    if(mouse.x - this.x < 50 && mouse.x-this.x > -50
      && mouse.y - this.y < 50 && mouse.y-this.y > -50)
      {
        var maxRadius = parseInt(document.getElementById("maxRadius").value);
        if(this.radius<maxRadius){
              this.radius +=1;
        }

      }
    else if(this.radius >this.minRadius){
      this.radius-=1;
    }

    this.draw();

  }
}



var circleArray=[];
var nrBluee = 1000;

function reinitialize() {
    circleArray.length=0;
   var n = parseInt(document.getElementById("nrBlue").value);
    if(!isNaN(n)) {
      nrBluee = n;
    }
    var culoare1 = document.getElementById("operators1").value;
   colorArray[1]=culoare1;

    var culoare2 = document.getElementById("operators2").value;
    colorArray[2]=culoare2;

    var culoare3 = document.getElementById("operators3").value;
    colorArray[3]=culoare3;



    for(var i =0 ; i<nrBluee;i++){
      var radius =Math.random() * 3 + 1;
      var x= Math.random() *  (innerWidth - (radius * 2) + radius);
      var y= Math.random() * (innerHeight- (radius*2)+ radius);
      var dx=(Math.random() - 0.5)*5;
      var dy=(Math.random() - 0.5)*5;

      circleArray.push(new Circle(x,y,dx,dy,radius));

    }
}


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);

  for(var i =0 ; i< circleArray.length;i++){
    circleArray[i].update();
  }


}

reinitialize();
animate();
