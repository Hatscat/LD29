var gl;
function initGL (canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth  = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch(e) {}
    if (!gl) {
        console.error("Could not initialise WebGL");
    }
}


function getShader (gl, id) {
    
    var shaderScript = document.getElementById(id);
    if (shaderScript.length === 0) {
        return null;
    }

    var shader;
    var type = shaderScript.getAttribute('type');
    
    if (type === "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type === "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, shaderScript.innerHTML);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}




var shaderProgram;
var vertexPosition;
function initShaders () {

    var fragmentShader = getShader(gl, "fragmentShader");
    var vertexShader   = getShader(gl, "vertexShader");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);

}


var camera;

var vertexPositionBuffer;

function initBuffers () {
    var vertices = [
         1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
        -1.0, -1.0
    ];
    vertexPositionBuffer = setBuffer(vertexPosition, null, vertices);
}



function setBuffer (position, positionBuffer, vertices) {
    positionBuffer = positionBuffer || gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    if (vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    
    return positionBuffer;
}














var demo = {
    pause: true
};
demo.startTime = Date.now();
demo.currentTime = 0;

demo.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };



demo.onEachFrame = function(callback) {
    var _callback = function() {
        callback();
        requestAnimationFrame(_callback);
    };
    _callback();
};
