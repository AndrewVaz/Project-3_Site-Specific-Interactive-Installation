/*
    Andrew Vaz
    Project 3 - Code Prototypes
    Dec 1, 2021

    Description:
    Code from https://github.com/aferriss/p5jsShaderExamples 
    The example I am using is from https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/4_image-effects/4-7_displacement-map
    We used this code last semester for Interactive media

    The Idea I had for this code was that the background showed a forest/nature picture
    and that passing people's silhouettes would been seen walking in the forest to give them a sense of nature.

*/

// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader variable
let camShader;

// the camera variable
let cam;
let img;

// code from https://p5js.org/examples/sound-load-and-play-sound.html
let song;


preload = () => {
    // load the shader
    camShader = loadShader('effect.vert', 'effect.frag');

    // picture from https://unsplash.com/photos/OYFHT4X5isg
    img = loadImage('assets/forest.jpg');

    // code from https://p5js.org/examples/sound-load-and-play-sound.html
    // mp3 from https://bigsoundbank.com/detail-0100-forest.html
    song = loadSound('assets/forest_sound.mp3');
}

setup = () => {
    // shaders require WEBGL mode to work
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    // initialize the webcam at the window size
    cam = createCapture(VIDEO);
    
    cam.size(windowWidth, windowHeight);

    // hide the html element that createCapture adds to the screen
    cam.hide();
    
}

draw = () => {
    
    // shader() sets the active shader with our shader
    shader(camShader);

    // lets just send the cam to our shader as a uniform
    // tex0 is the name of the cam that is being used in the frag file
    camShader.setUniform('tex0', cam); 
    
    
    // tex1 is the name of the background image that is being used in the frag file
    camShader.setUniform('tex1', img);

    // tried using tint to make the cam a bit transparent but it did not work
    // tint(255, 150);

    // keeing this here but not using its value
    camShader.setUniform('amt', map(mouseX, 0, width, 0, 0.2));

    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
    

    // This code is from https://p5js.org/examples/sound-load-and-play-sound.html
    // if I place song.play(); outside of the loop the sound plays over itself 
    // when this happens it sound demonic
    // This statement is saying if the sound is playing write to console
    // when the sound stops, the else statement plays it again 
    if (song.isPlaying()) {
        console.log("song playing")
      } else {
        song.play();
      }
}

windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}
