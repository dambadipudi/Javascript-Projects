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
    return { x_pos: Math.floor(Math.random()*context.canvas.width),
             y_pos: Math.floor(Math.random()*context.canvas.height) };
}

function getRandomColor() {
    // 16777216 is decimal equivalent of 0xFFFFFF
    var color = Math.floor(Math.random() * 16777216).toString(16);
    // Make sure to get a 6 digit number by appending extra 0s as needed
    return '#000000'.slice(0, -color.length) + color;
}

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

function drawPaintSplatter() {
    paintSplatterCount ++;
    context.beginPath();
    context.fillStyle = getRandomColor();
    var randomPosition = getRandomLocation();
   
    //Select a random number each time for width of the splatter
    var standard_deviation = Math.random()*20;
    console.log("Inside drawPaintSplatter function \n");
    var splatterCount = 0;
    while(splatterCount < 20) {
        splatterCount++;
        context.arc(randomPosition.x_pos + standard_deviation * gaussianRand(),
                    randomPosition.y_pos + standard_deviation * gaussianRand(),
                    Math.round(Math.random()*15),
                    0,
                    2*Math.PI);
        context.fill();
        context.closePath();
        console.log("Filled circle number "+splatterCount + "\n");
    }
    
    while(paintSplatterCount < 5) {
        console.log("Calling paintSplatterCount no " + paintSplatterCount + "\n");
        setTimeout(drawPaintSplatter(), 1000);
    }
}

function drawOnCanvas() {
    paintSplatterCount = 0;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    drawPaintSplatter();         
}
