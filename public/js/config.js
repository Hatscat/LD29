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
			canvas_width 			: 300,//window.innerWidth,//960,
			canvas_height 			: 300,//window.innerHeight,//570,
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
			gravity 				: 10,
			keys_config 			: 'azerty_keys',
			player_params : {
					radius 			: 20,
					velocity 		: {
						x			:0,
						y			:0,
						z			:0
					},
					speed 			: 2,
					mass		 	: 45,
					initial_position : {
						x 			: 0,
						y 			: 0,
						z 			: 0
					},
			},
			ball_params : {
					radius 			: 6,
					velocity 		: {
						x			:0,
						y			:0,
						z			:0
					},
					speed 			: 2,
					mass		 	: 2,
					initial_position : {
						x 			: 0,
						y 			: 30,
						z 			: 0
				},
			},
			net_params : {
					height 			: 5,
					position : {
						x			: 1,
						y			: 0,
						z 			: 1
					}
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
