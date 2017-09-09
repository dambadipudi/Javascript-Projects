var context;
var paintSplatterCount = 0;

/**
 * After the page loads, prepare the Canvas
 */
$(document).ready(function(){
    context = document.getElementById('paint_splatter_canvas').getContext("2d");
    document.getElementById("splatter_button").addEventListener("click", drawOnCanvas);
});

function getRandomLocation() {
    return { x_pos: Math.floor(Math.random()*context.canvas.width*3/4),
             y_pos: Math.floor(Math.random()*context.canvas.height*3/4) };
}

function getRandomColor() {
    // 16777216 is decimal equivalent of 0xFFFFFF
    var color = Math.floor(Math.random() * 16777216).toString(16);
    // Make sure to get a 6 digit number by appending extra 0s as needed
    return '#000000'.slice(0, -color.length) + color;
}
var previous = false;
var y2 = 0;

function gaussianRand(mean, std) {
      var y1,x1,x2,w;
      if (previous) {
        y1 = y2;
        previous = false;
      } else {
        do {
          x1 = Math.random()*2 - 1;
          x2 = Math.random()*2 - 1;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1);
        w = Math.sqrt((-2 * Math.log(w))/w);
        y1 = x1 * w;
        y2 = x2 * w;
        previous = true;
      }

      var m = mean || 0;
      var s = std || 1;
      return y1*s + m;
}

function drawPaintSplatter() {
    paintSplatterCount ++;
    
    //context.restore();
    context.fillStyle = getRandomColor();
    var randomPosition = getRandomLocation();
   
    //Select a random number each time for width of the splatter
    var standard_deviation = Math.random()*5;
    
    console.log("Inside drawPaintSplatter function " + paintSplatterCount + "\n");
    
    context.beginPath();
    for(var splatterCount = 0; splatterCount < 600; splatterCount++) {
        var dot_x = gaussianRand(randomPosition.x_pos, standard_deviation);
        var dot_y = gaussianRand(randomPosition.y_pos, standard_deviation);
        context.arc(dot_x,
                    dot_y,
                    Math.random()*2,
                    0,
                    2*Math.PI);
        context.fill();
        //console.log("Dot location "+dot_x + ", " + dot_y + "\n");
    }
    context.closePath();
    
    if(paintSplatterCount < 5) {
        setTimeout(drawPaintSplatter, 500);
    }

}

function drawOnCanvas() {
    paintSplatterCount = 0;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    console.log("Clearing canvas and painting again,splatter count -" + paintSplatterCount + "\n");    
    drawPaintSplatter();
}
