/**
 *   Paint_Splatter.js file is used to create a paint splatter simulation
 *   A normal distribution is used to draw small dots for the splatter
 *   A random location and random color is chosen for each splatter
 *
 *   Coded by Divya Ambadipudi for Khan Academy Advanced JS: Natural Simulations course
 *
 */



var context; // Context for Canvas object
var paintSplatterCount = 0; // The number of splatters for each simulation

/**
 * After the page loads, get the Canvas context and add button event
 */
$(document).ready(function(){
    context = document.getElementById('paint_splatter_canvas').getContext("2d");
    document.getElementById("splatter_button").addEventListener("click", drawOnCanvas);
});

/**
 *     getRamdomLocation function generates an object with
 *      random x and y coordinates
 *      @return Object 
 */
function getRandomLocation() {
    return { x_pos: Math.floor(Math.random()*context.canvas.width),
             y_pos: Math.floor(Math.random()*context.canvas.height) };
}

/**
 *     getRamdomColor function generates a random hexadecimal string
 *      generated
 *      @return String 
 */
function getRandomColor() {
    // 16777216 is decimal equivalent of 0xFFFFFF
    var color = Math.floor(Math.random() * 16777216).toString(16);
    // Make sure to get a 6 digit number by appending extra 0s as needed
    return '#000000'.slice(0, -color.length) + color;
}

var previous = false; //Variables needed for gaussianRand function
var y2 = 0; // //Variables needed for gaussianRand function

/**
 *     gaussianRand function borrowed from processing.js library
 *     generates random numbers from a normal distribution with given mean and std
 *     Uses default of 0 and 1 if not specified
 *     @param Float mean of the normal distribution required
 *     @param Float standard deviation of the normal distribution required
 *     @return Float 
 */
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


/**
 *     drawPaintSplatter function draws a splatter of dots at random points 
 *     of a normal distribution with current location as mean
 *     then calls itself again after an interval to draw another
 *     splatter at another random position
 */
function drawPaintSplatter() {
    paintSplatterCount ++;
    
    //context.restore();
    context.fillStyle = getRandomColor();
    var randomPosition = getRandomLocation();
   
    //Select a random number each time for width of the splatter
    var standard_deviation = Math.random()*10;
    
    console.log("Inside drawPaintSplatter function " + paintSplatterCount + "\n");
    
    context.beginPath();
    for(var splatterCount = 0; splatterCount < 200; splatterCount++) {
        var dot_x = gaussianRand(randomPosition.x_pos, standard_deviation);
        var dot_y = gaussianRand(randomPosition.y_pos, standard_deviation);
        context.arc(dot_x,
                    dot_y,
                    Math.random()*5,
                    0,
                    2*Math.PI);
        context.fill();
        //console.log("Dot location "+dot_x + ", " + dot_y + "\n");
    }
    context.closePath();
    
    if(paintSplatterCount < 30) {
        setTimeout(drawPaintSplatter, 500);
    }

}

/**
 *     drawOnCanvas function is called when Splatter button is clicked
 *      
 */
function drawOnCanvas() {
    paintSplatterCount = 0; //Initialise the splatter count
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
    console.log("Clearing canvas and painting again,splatter count -" + paintSplatterCount + "\n");    
    drawPaintSplatter(); //Call the function that draws splatters
}
