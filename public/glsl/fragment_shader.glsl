#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

varying vec2 coord;

uniform vec3 cam_pos;
uniform vec3 net_pos;
uniform vec3 ball_pos;
uniform vec3 player_pos;
uniform vec3 ghosts_pos;
uniform float net_height;
uniform float ball_radius;
uniform float player_radius;
uniform float time;

const int iteration_max 	= 250;
const float edge_detail 	= 0.01;
const float distance_max	= 50.0;
//const float PI 				= 3.14159265;
const vec3 bg_color 		= vec3(0.0, 0.0, 0.0);
const vec3 ground_color_1 	= vec3(0.15, 0.07, 0.0);
const vec3 ground_color_2 	= vec3(0.31, 0.15, 0.0);


float rand (vec2 coord)
{
	return fract(sin(dot(coord.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

/*
** sphere primitive
*/

float sphere (in vec3 p_A, in vec3 p_B, in float p_radius)
{
  return length(p_A - p_B) - p_radius;
}

/*
** return the first element founded
*/

float distance_field (in vec3 p) {

	return min(
		sphere(p, player_pos, player_radius),
		min(
			sphere(p, ball_pos, ball_radius),
			min(
				floor(length(p - net_pos)) - sin(p.x) * sin(p.x) + p.z,
				floor(mod(p.z, 1.5) + 0.5) - sin(p.y) * sin(p.y)
			)
		)
	);
}

/*
** return the color of a given pixel on screen
*/

vec3 get_color (float p_x, float p_y)
{
	vec3 dir 						= normalize(vec3(5.0, p_x, p_y * 0.5));
	vec3 ray_pos 					= cam_pos;
	float d 						= 0.0;
	bool max_iterations_reached 	= true;

	for (int i = 0; i < iteration_max; i++)
	{
		d = distance_field(ray_pos);

		if (d < edge_detail)
		{
			max_iterations_reached = false;
			break;
		}
		else if (length((ray_pos += d * dir) - cam_pos) > distance_max)
		{
			return bg_color;
		}
	}

	if (max_iterations_reached) {
	 	return bg_color;
	}

	float light = 0.02 * pow(distance_max / (length(ray_pos - cam_pos) + 0.1), 2.0);

	if (mod(ray_pos.x * sin(time * 0.001) * ray_pos.y, 2.0) < 1.0 && rand(vec2(sin(ray_pos.x + time), ray_pos.y)) > 0.8)
	{
		return ground_color_1 * light;
	}

	return ground_color_2 * light;
}

/*
** MAIN
*/

void main (void)
{
	vec3 color 		= get_color(coord.x, coord.y);
	gl_FragColor 	= vec4(color, 1.0);
}
