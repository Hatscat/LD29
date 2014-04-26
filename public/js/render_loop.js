/*
** render loop, called by "run()"
*/
function draw (p_config) {
	
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'time'), p_config.time);

	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionX'), p_config.player.x);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionY'), p_config.player.y);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionZ'), p_config.player.z);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'angle'), 0); // p_config.player.angle
	//console.log(parseFloat(sphereX))
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'sphereX'),   parseFloat(1.233));
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'sphereY'),   parseFloat(2.13));

	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'pix2plot'), 2 / (p_config.gl.viewportWidth));
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'cameraDx'), 1);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'cameraDy'), p_config.gl.viewportHeight / (p_config.gl.viewportWidth * 1) );

	//setBuffer(p_config, vertexPosition, vertexPositionBuffer);
	p_config.gl.drawArrays(p_config.gl.TRIANGLE_STRIP, 0, 6);
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