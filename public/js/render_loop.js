/*
** run loop, every frames
*/
function run (p_config, p_timestamp) {

	p_config.time 			= p_timestamp;
	var elapsed_time 		= p_config.time - p_config.old_time;
	p_config.old_time 		= p_config.time;
	p_config.delta_time 	= elapsed_time * 0.06;

	for (var i1 in p_config.players) {

		//p_config.players[i1].move(p_config);
	}

	//

	draw(p_config);
	requestAnimationFrame(function(p_ts){run(p_config, p_ts)});
}

/*
** render loop, called by "run()"
*/
function draw (p_config) {
	
	/*gl.uniform1f(gl.getUniformLocation(shaderProgram, 'time'), demo.currentTime * 0.001);

	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'positionX'), player.x);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'positionY'), player.y);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'positionZ'), player.z);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'angle'),     player.angle);
	//console.log(parseFloat(sphereX))
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'sphereX'),   parseFloat(sphereX));
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'sphereY'),   parseFloat(sphereY));

	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'pix2plot'), 2/(zoom * gl.viewportWidth));
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'cameraDx'), 1/zoom);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, 'cameraDy'), gl.viewportHeight / (gl.viewportWidth * zoom) );

	setBuffer(vertexPosition, vertexPositionBuffer);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);*/
}

/*
function setBuffer (position, positionBuffer, vertices) {
    positionBuffer = positionBuffer || gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    if (vertices) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    
    return positionBuffer;
}
*/