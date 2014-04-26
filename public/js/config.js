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
			player_radius 			: 10,
			player_velocity 		: 2,
			ball_radius 			: 3,
			ball_velocity 			: 2,
			canvas_width 			: window.innerWidth / 2,
			canvas_height 			: window.innerHeight / 2,
			canvas 					: p_canvas,
			gl 						: webgl_context,
			socket 					: io.connect(),
			vertex_shader_inputs 	: [],
			keys_down 				: {},
			player 					: null,
			ghosts 					: {},
			time 					: 0,
			old_time 				: 0,
			delta_time 				: 1,
			keys_config 			: "azerty_keys",
			player_initial_position : {
				x 	: 0,
				y 	: 0,
				z 	: 0
			},
			ball_initial_position : {
				x 	: 0,
				y 	: 0,
				z 	: 0
			},
			azerty_keys : {
				up 		: 90,
				down 	: 83,
				left 	: 81,
				right 	: 68,
				jump 	: 32
			},
			qwerty_keys : {
				up 		: 87,
				down 	: 83,
				left 	: 65,
				right 	: 68,
				jump 	: 32
			},
			arrow_keys : {
				up 		: 38,
				down 	: 40,
				left 	: 37,
				right 	: 39,
				jump 	: 32
			}
		};

		p_canvas.width = config.canvas_width;
		p_canvas.height = config.canvas_height;

		return config;

	} catch (p_error) {

		document.body.innerHTML = 'WebGL not supported.';
		throw p_error;
	}
}
