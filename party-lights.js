// ******************************************************
// WARNING: FLASHING LIGHTS!!!!!
//
// Welcome to the party
// Click on the toggle switch to get the party started
// ******************************************************


// ******************************************************
// Setup!
// ******************************************************
function setup() {
    createCanvas(400, 400);
    frameRate(3); // sets speed for lights flashing
}

// ******************************************************
// Define variables
// ******************************************************

var switchOn = false; // store the switch state, starting state is off
var lightArray = [false, false, false, false]; // store each light's state

// set colors for the lights
var colorArray = [
    [140, 40, 235],    // purple
    [242, 242, 22],    // yellow
    [235, 40, 235],    // pink
    [22, 114, 242]     // blue
];

// ******************************************************
// Call draw() function
// ******************************************************

function draw() {

    // lights flash randomly when switch is on
    if (switchOn) {
        for (var i = 0; i < lightArray.length; i++) {
            lightArray[i] = random() > 0.5; // randomly true or false
        }
    }

    // set background color based on which lights are on
    var bgColor = calculateBackgroundColor();
    background(bgColor[0], bgColor[1], bgColor[2]);

    // draw everything!
    drawLights();
    drawSwitch();
}

// ******************************************************
// Calculate background color based on which lights are On
// ******************************************************

function calculateBackgroundColor() {
    var r = 240, g = 240, b = 240; // set default to light gray
    var count = 0; // store how many lights are on

    if (switchOn) {
        r = 0; g = 0; b = 0;
        //check each light and add its color if On
        for (var k = 0; k < 4; k++) {
            if (lightArray[k]) {
                r += colorArray[k][0];
                g += colorArray[k][1];
                b += colorArray[k][2];
                count++;
            }
        }
        //math for blending colors of active lights 
        //and adding light gray to make it faint
        //blend ratio is 30% color + 70% light gray
        if (count > 0) {
            r = r / count * 0.3 + 240 * 0.7; 
            g = g / count * 0.3 + 240 * 0.7;
            b = b / count * 0.3 + 240 * 0.7;
        } else {
            r = 240; g = 240; b = 240;  // no lights On, go back to default
        }
    }

    return [r, g, b];  // will be stored in bgColor
}

// ******************************************************
// Draw lights!
// ******************************************************

function drawLights() {

    // draw a background for the lights
    fill(50);
    rect(50, 150, 300, 100);

    // check if light is On and switch is On
    // if true, set light color to RGB value from colorArray
    for (var j = 0; j < 4; j++) {
        if (lightArray[j] && switchOn) {
            fill(colorArray[j][0], colorArray[j][1], colorArray[j][2]); 
        } 
        else {
            fill(100); // Dark gray when off
        }
        // draw the lights!
        ellipse(87 + j * 75, 200, 50, 50);
    }
}

// ******************************************************
// Draw light switch
// ******************************************************

function drawSwitch() {
    // draw switch base 
    fill(100);
    rect(180, 280, 40, 100, 20);
    
    // draw slider button
    if (switchOn) {
        fill(0, 200, 0); // green when on
        ellipse(200, 310, 35, 35);
        
        // ON label
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("ON", 200, 300);
    } else {
        fill(200, 0, 0); // red when off
        ellipse(200, 350, 35, 35);
        
        // OFF label
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("OFF", 200, 360);
    }
}

// ******************************************************
// Toggle the switch when clicked
// ******************************************************

function mouseClicked() {
    // only toggle if clicking on the switch
    if (mouseX > 180 && mouseX < 220 && mouseY > 280 && mouseY < 380) {
        switchOn = !switchOn; // toggle the state
    }
}