/*
** render loop, called by "run()"
*/
function draw (p_config) {
	

	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'time'), p_config.time);

	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionX'), p_config.player.x);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionY'), p_config.player.y);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'positionZ'), p_config.player.z);
	/*p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'angle'), 0);*/
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'sphereX'),   -2.0);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'sphereY'),   0.0);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'pix2plot'), p_config.canvas_width);
/*	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'cameraDx'), 0.5);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'cameraDy'), p_config.canvas_height / (p_config.canvas_width * 0.5) );*/

	/*
gl.uniform1f(gl.getUniformLocation(shaderProgram, 'pix2plot'), 2/(zoom * gl.viewportWidth));
gl.uniform1f(gl.getUniformLocation(shaderProgram, 'cameraDx'), 1/zoom);
gl.uniform1f(gl.getUniformLocation(shaderProgram, 'cameraDy'), gl.viewportHeight / (gl.viewportWidth * zoom) );
	*/
	
	setBuffer(p_config, p_config.vertex_location, p_config.vertex_buffer);
	p_config.gl.drawArrays(p_config.gl.TRIANGLE_STRIP, 0, 4);
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
