/*
** return a brand new config
*/
function new_config (p_canvas) {

	var size_ratio 					= 2;

	try {
		var webgl_options = {
			antialias 				: true,
			stencil 				: true
		};
		var webgl_context = p_canvas.getContext('webgl', webgl_options)
						 || p_canvas.getContext('experimental-webgl', webgl_options);
		var config = {
			canvas_width 			: window.innerWidth / size_ratio,
			canvas_height 			: window.innerHeight / size_ratio,
			canvas 					: p_canvas,
			gl 						: webgl_context,
			socket 					: io.connect(),
			vertex_shader_inputs 	: [],
			keys_down 				: {},
			player 					: null,
			ball 					: null,
			ghosts 					: {},
			time 					: 0,
			old_time 				: 0,
			delta_time 				: 1,
			gravity 				: 0.002,
			ground_friction			: 0.9,
			keys_config 			: 'azerty_keys',
			player_params : {
					radius 			: 0.11,
					acceleration 	: 0.005,
					jump_strength 	: 10.0,
					mass		 	: 45,
					initial_position : {
						x 			: 3.1,
						y 			: 1.0,
						z 			: 0.0
				}
			},
			ball_params : {
					radius 			: 0.11,
					friction 		: 0.1,
					bounce_ratio 	: 0.9,
					mass		 	: 1,
					initial_position : {
						x 			: 4.5,
						y 			: 1.1,
						z 			: 0.0
				},
			},
			net_params : {
					height 			: 5,
					position : {
						x			: 11.0,
						y			: 0.9,
						z 			: 0.0
					},
			},
			ground_limits : {
					x_min			: 2.0,
					x_max			: 5.5,
					y_min			: 0.74,
					y_max			: 1.5,
					z_min			: -0.8,
					z_max			: 0.8
			},
			camera_params : {
					position : {
						x			: 0.0,
						y			: 1.0,
						z 			: 0.0
					},
					direction : {
						x			: 1.0,
						y			: 0.0,
						z 			: 0.0
					}
			},
			azerty_keys : {
				up 					: 90,
				down 				: 83,
				left 				: 81,
				right 				: 68,
				jump 				: 32
			},
			qwerty_keys : {
				up 					: 87,
				down 				: 83,
				left 				: 65,
				right 				: 68,
				jump 				: 32
			},
			arrow_keys : {
				up 					: 38,
				down 				: 40,
				left 				: 37,
				right 				: 39,
				jump 				: 32
			}
		};

		p_canvas.width = config.canvas_width;
		p_canvas.height = config.canvas_height;

		config.gl.viewport(0, 0, config.gl.canvas.width, config.gl.canvas.height);
		return config;

	} catch (p_error) {

		document.body.innerHTML = 'WebGL not supported.';
		throw p_error;
	}
}
