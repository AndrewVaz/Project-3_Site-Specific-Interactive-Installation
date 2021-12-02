precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

// how much to displace by (controlled by mouse)
uniform float amt;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the webcam as a vec4 using texture2D
  vec4 cam = texture2D(tex0, uv);

  // lets get the average color of the rgb values
  float avg = dot(cam.rgb, vec3(0.33333));

  // then spread it between -1 and 1 *try 4.0 -2.0 for deeper results
  avg = avg * 2.0 - 1.0;

  // we will displace the image by the average color times the amt of displacement 
  
  // Orginal code: float disp = avg * amt;
  // I do not want the displacement created by the mouse movement 
  // So I added a static value so that the person's silhouette can be seen 
  float disp = avg * .02;
  


  // displacement works by moving the texture coordinates of one image with the colors of another image
  // add the displacement to the texture coordinages * try using minus
  vec4 pup = texture2D(tex1, uv + disp);

 
  // output the image
  gl_FragColor = pup;
}


/*
  code from https://thebookofshaders.com/06/
  Tried to change the colour of my silhouette but couldn't have two gl_FragColor

  // global stuff
  uniform vec2 u_resolution;
  uniform float u_time;

  vec3 colorA = vec3(0.149,0.141,0.912);
  vec3 colorB = vec3(1.000,0.833,0.224);


  // in main
  vec3 color = vec3(0.0);
  float pct = abs(sin(u_time));

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    // gl_FragColor = vec4(color,3.0);
*/