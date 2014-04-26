/*
** first script launched, initialize things
*/

addEventListener('load', init_home_page);

/*
** create a home page with jQuery,
** launch the game after le login
*/
function init_home_page () {
	//
	init_game();
}
/*
** create a canvas balise,
** create client & server events,
** initialise WebGl
** launch the run loop
*/
function init_game () {

	var canvas = document.createElement('canvas');
	var config = new_config(canvas);


	loadFiles(['glsl/vertex_shader.glsl', 'glsl/fragment_shader.glsl'], function (shaderText) {

		config.shader_program 	= createProgram(config.gl, shaderText[0], shaderText[1]);
		config.vertex_location 	= config.gl.getAttribLocation(config.shader_program, 'vertexPosition');
		config.time_location	= config.gl.getUniformLocation(config.shader_program, 'time');
		config.vertex 			= [	1.0,	1.0,
									-1.0,	1.0,
									1.0,	-1.0,
									-1.0,	-1.0];
									
		//config.gl.bindBuffer(config.gl.ARRAY_BUFFER, config.gl.createBuffer());
		//config.gl.bufferData(config.gl.ARRAY_BUFFER, new Float32Array(config.vertex), config.gl.STATIC_DRAW);
		config.gl.enableVertexAttribArray(config.vertex_location);
		//config.gl.vertexAttribPointer(config.vertex_location, 2, config.gl.FLOAT, false, 0, 0);

		config.vertex_buffer = setBuffer(config, config.vertex_location, null, config.vertex);

		manage_input_events(config.keys_down);
		manage_server_events(config);
		config.socket.emit('new', sessionStorage.getItem('id'));
		document.body.appendChild(canvas);
	},
	function (url) {
		console.log('Failed to download "' + url + '"');
	});
}
/*
** set keyboard inputs into config
*/
function manage_input_events (p_keys_down) {

	addEventListener('keydown', function (e) {
		console.log(e.keyCode);
		p_keys_down[e.keyCode] = true;
	}, false);
	addEventListener('keyup', function (e) {
		p_keys_down[e.keyCode] = false;
	}, false);
}
/*
** reroute server events
*/
function manage_server_events (p_config) {

	p_config.socket.on('new', function(e){new_player(p_config,e)});
	p_config.socket.on('move', function(e){update_an_ext_player(p_config,e)});
	p_config.socket.on('deco', function(e){deco_player(p_config,e)});
}
