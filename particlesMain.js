var options = {

  "particles":{
    "number" :{
      "value": 200
    },
    "color":{
      "value":"#fff"
    },
    "shape":{
      "type":"circle",
      "stroke":{
        "width":0,
        "color":"#ccc"
      }
    },



    "opacity":{
      "value":20,
      "random":true,
      "anim":{
        "enable":false,
        "speed": 10
      }

    },
    "size":{
      "value": 2,
      "random":false,
      "anim":{
        "enable":false,
        "speed":50
      }
    },

    "line_linked":{
      "enable":true,
      "distance":150,
      "color":"#FFF",
      "width":0.8
    },
    "move":{
      "enable": true,
      "speed":2,
      "direction":"none"

    }
  },
  "interactivity":{
    "events":{
      "onhover":{
        "enable":false,
        "mode":"repulse"
      },
      "onclick":{
        "enable": true,
        "mode":"push"

      }
    },
    "modes":{
      "repulse":{
        "distance":50,
        "duration":0.4
      },
      "bubble":{
        "distance":100,
        "size":10
      }
    }
  }


}
;

particlesJS('particles-jsStyle',options);

function changeShape(){
  var shape = document.getElementById("shape").value;
  options.particles.shape.type = shape;
  particlesJS('particles-jsStyle',options );
}

function changeColor(){
  var color = document.getElementById("color").value;
  options.particles.color.value = color;
  particlesJS('particles-jsStyle',options );
}

function changeSize(){
  var size = document.getElementById("size").value;
  options.particles.size.value = size;
  particlesJS('particles-jsStyle',options );
}

function changeNrBule(){

  var nrBlue = document.getElementById("nrBlue").value;
  options.particles.number.value=nrBlue;
  particlesJS('particles-jsStyle',options );

}

function changeDistance(){
  var distance = document.getElementById("distance").value;
  options.particles.line_linked.distance = distance;
  particlesJS('particles-jsStyle',options );

}

function changeSpeed(){
  var speed = document.getElementById("speed").value;
  options.particles.move.speed = speed;
  particlesJS('particles-jsStyle',options );
}
