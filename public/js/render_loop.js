/*
** render loop, called by "run()"
*/
function draw (p_config) {
	
	var ghosts_pos_array = [];

	for (var i1 in p_config.ghosts)
	{
		ghosts_pos_array.push(p_config.ghosts.x, p_config.ghosts.y, p_config.ghosts.z);
	}

	p_config.gl.uniform3f(p_config.gl.getUniformLocation(p_config.shader_program, 'cam_pos'), p_config.camera_params.position.x, p_config.camera_params.position.z, p_config.camera_params.position.y);
	//p_config.gl.uniform3f(p_config.gl.getUniformLocation(p_config.shader_program, 'cam_dir'), p_config.camera_params.direction.x, p_config.camera_params.direction.z, p_config.camera_params.direction.y);
	p_config.gl.uniform3f(p_config.gl.getUniformLocation(p_config.shader_program, 'net_pos'), p_config.net_params.position.x, p_config.net_params.position.z, p_config.net_params.position.y);
	p_config.gl.uniform3f(p_config.gl.getUniformLocation(p_config.shader_program, 'ball_pos'), p_config.ball.x, p_config.ball.z, p_config.ball.y);
	p_config.gl.uniform3f(p_config.gl.getUniformLocation(p_config.shader_program, 'player_pos'), p_config.player.x, p_config.player.z, p_config.player.y);
	p_config.gl.uniform3fv(p_config.gl.getUniformLocation(p_config.shader_program, 'ghosts_pos'), ghosts_pos_array);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'net_height'), p_config.net_params.height);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'ball_radius'), p_config.ball.radius);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'player_radius'), p_config.player.radius);
	p_config.gl.uniform1f(p_config.gl.getUniformLocation(p_config.shader_program, 'time'), p_config.time);


	//p_config.gl.viewport(0, 0, p_config.gl.canvas.width, p_config.gl.canvas.height);
	setBuffer(p_config, p_config.vertex_location, p_config.vertex_buffer);
	p_config.gl.drawArrays(p_config.gl.TRIANGLE_STRIP, 0, 4);
}
