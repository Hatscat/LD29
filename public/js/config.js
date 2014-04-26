/*
** return a brand new config
*/
function new_config (p_canvas) {
	
	try {
		var webgl_options = {
			antialias 				: true,
			stencil 				: true
		};
		var webgl_context = p_canvas.getContext('webgl', webgl_options)
						 || p_canvas.getContext('experimental-webgl', webgl_options);
		var config = {
			gravity 				: 10,
			player_size 			: 10,
			player_velocity 		: 2,
			ball_size 				: 3,
			canvas_width 			: window.innerWidth / 2,
			canvas_height 			: window.innerHeight / 2,
			canvas 					: p_canvas,
			gl 						: webgl_context,
			socket 					: io.connect(),
			vertex_shader_inputs 	: [],
			keys_down 				: {},
			players 				: {},
			time 					: 0,
			old_time 				: 0,
			delta_time 				: 1
		};

		p_canvas.width = config.canvas_width;
		p_canvas.height = config.canvas_height;

		return config;

	} catch (p_error) {

		document.body.innerHTML = 'WebGL not supported.';
		throw p_error;
	}
}
