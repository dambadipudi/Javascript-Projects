/**
 * After the page loads, prepare the Canvas
 */
$(document).ready(function(){
});

var context;

document.getElementById("start_button").addEventListener("click", drawOnCanvas);

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

function drawOnCanvas() {
    var paintSplatterCount = 0;
    context = document.getElementById('paint_splatter_canvas').getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
    while(paintSplatterCount < 10) {
        paintSplatterCount ++;
        context.beginPath();
        context.strokeStyle = getRandomColor();
        var randomPosition = getRandomLocation();
         //Get a normal distribution for maximum paint near the point and a few paint drop outliers as splatter
        
        context.arc(randomPosition.x_pos,randomPosition.y_pos,50,0,2*Math.PI); // For now just draw a circle
        context.stroke();
    }
}
