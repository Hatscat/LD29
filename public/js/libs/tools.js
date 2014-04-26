/*
** requestAnimationFrame polyfill by Paul Irish
** https://gist.github.com/paulirish/1579671
*/
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/*
** load files functions, to import shaders, by David Roe
** http://stackoverflow.com/questions/4878145/javascript-and-webgl-external-scripts
*/
function loadFile(url, data, callback, errorCallback) {
	// Set up an asynchronous request
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	// Hook the event that gets called as the request progresses
	request.onreadystatechange = function () {
		// If the request is "DONE" (completed or failed)
		if (request.readyState == 4) {
			// If we got HTTP status 200 (OK)
			if (request.status == 200) {
				callback(request.responseText, data);
			} else { // Failed
				errorCallback(url);
			}
		}
	};
	request.send(null);    
}
function loadFiles(urls, callback, errorCallback) {
	var numUrls = urls.length;
	var numComplete = 0;
	var result = [];
	// Callback for a single file
	function partialCallback(text, urlIndex) {
		result[urlIndex] = text;
		numComplete++;
		// When all files have downloaded
		if (numComplete == numUrls) {
			callback(result);
		}
	}
	for (var i = 0; i < numUrls; i++) {
		loadFile(urls[i], i, partialCallback, errorCallback);
	}
}

/*
** shaders integration functions, by Paulo Falcao
** http://js1k.com/2014-dragons/details/1868
*/
function compileShader(g, shaderSource, shaderType) {
	var shader=g.createShader(shaderType);
	g.shaderSource(shader, shaderSource);
	g.compileShader(shader);
	//******** DEBUG ****************
	var ok = g.getShaderParameter(shader,g.COMPILE_STATUS);
	if (!ok) {throw "Shader Compile Error:" + g.getShaderInfoLog(shader);}
	//******** DEBUG ****************
	return shader;
}
function createProgram(g, vertexShaderSource, fragmentShaderSource) {
	var p=g.createProgram();
	g.attachShader(p, compileShader(g, vertexShaderSource, g.VERTEX_SHADER));
	g.attachShader(p, compileShader(g, fragmentShaderSource, g.FRAGMENT_SHADER));
	g.linkProgram(p);
	//******** DEBUG ****************
	var ok= g.getProgramParameter(p, g.LINK_STATUS);
	if (!ok){throw ("Shader Link Error:" +g.getProgramInfoLog(p));}
	//******** DEBUG ****************
	g.useProgram(p);
	return p;
}


function setBuffer (p_config, p_position, p_positionBuffer, vertices) {

	p_positionBuffer = p_positionBuffer || p_config.gl.createBuffer();
	
	p_config.gl.bindBuffer(p_config.gl.ARRAY_BUFFER, p_positionBuffer);

	if (vertices) {
		p_config.gl.bufferData(p_config.gl.ARRAY_BUFFER, new Float32Array(vertices), p_config.gl.STATIC_DRAW);
	}
	p_config.gl.vertexAttribPointer(p_position, 2, p_config.gl.FLOAT, false, 0, 0);
	
	return p_positionBuffer;
}


/*///////////////////////////////////////////////////////////////////////////////////
var gl;
// ... set up WebGL ...

loadFiles(['vertex.shader', 'fragment.shader'], function (shaderText) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, shaderText[0]);
	// ... compile shader, etc ...
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, shaderText[1]);

	// ... set up shader program and start render loop timer
}, function (url) {
	console.log('Failed to download "' + url + '"');
}); 



var p=createProgram(vs,fs);

//Set Shader vertex data
var pLocation=g.getAttribLocation(p,"p");
g.bindBuffer(g.ARRAY_BUFFER,g.createBuffer());
g.bufferData(g.ARRAY_BUFFER,new Float32Array(
  [-1,-1,
	1,-1,
   -1, 1,
   -1, 1,
	1,-1,
	1, 1]),g.STATIC_DRAW);
g.enableVertexAttribArray(pLocation);
g.vertexAttribPointer(pLocation,2,g.FLOAT,false,0,0);

//Set Shader time variable t
var tLocation=g.getUniformLocation(p,"t");

//Get Inicial Time
var initTime=Date.now();
///////////////////////////////////////////////////////////////////////////////////*/
