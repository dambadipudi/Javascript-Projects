/**
 * After the page loads, prepare the Canvas
 */
$(document).ready(function(){
    document.getElementById("splatter_button").addEventListener("click", drawOnCanvas);
});

var context;

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

function drawPaintSplatter(x_pos, y_pos) {
    
    //Select a random number each time for width of the splatter
    var standard_deviation = Math.random()*10;
    console.log("Inside drawPaintSplatter function \n");
    var splatterCount = 0;
    while(splatterCount < 10000) {
        splatterCount++;
        context.arc(Math.round(x_pos + standard_deviation * gaussianRand()),
                    Math.round(y_pos + standard_deviation * gaussianRand()),
                    Math.round(Math.random()*5),
                    0,
                    2*Math.PI);
        context.fill();
        console.log("Filled circle number "+splatterCount + "\n");
    }
}

function drawOnCanvas() {
    var paintSplatterCount = 0;
    context = document.getElementById('paint_splatter_canvas').getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
    while(paintSplatterCount < 10) {
        paintSplatterCount ++;
        context.beginPath();
        context.fillStyle = getRandomColor();
        var randomPosition = getRandomLocation();
        setTimeout(drawPaintSplatter(randomPosition.x_pos, randomPosition.y_pos), 1000);
        console.log(paintSplatterCount + " splatter done! " 
    }
}
