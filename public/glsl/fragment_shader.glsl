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
const float distance_max	= 60.0;
//const float PI 				= 3.14159265;
const vec3 bg_color 		= vec3(0.0, 0.0, 0.0);
const vec3 ground_color_1 	= vec3(0.15, 0.07, 0.0);
const vec3 ground_color_2 	= vec3(0.31, 0.15, 0.0);


float rand (vec2 coord)
{
	return fract(sin(dot(coord.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

/*
** distance operations
*/

float op_union (in float p_A, in float p_B)
{
	return min(p_A, p_B);
}

float op_substract (in float p_A, in float p_B)
{
	return max(-p_A, p_B);
}

float op_intersect (in float p_A, in float p_B)
{
	return max(p_A, p_B);
}

/*
** primitives
*/

float sphere (in vec3 p_A, in vec3 p_B, in float p_radius)
{
  return length(p_A - p_B) - p_radius;
}

float plane (in vec3 p_A, in vec3 p_B, in vec4 n)
{
  // n must be normalized
  return dot(p_A - p_B, n.xyz) + n.w;
}


/*
** return the first element founded
*/

float distance_field (in vec3 p) {

	//return min(length(pos - sphereCentre) - sphereRadius, pos.y - sin(pos.x + time) * sin(pos.z) * waveAmplitude);

	return min(
		sphere(p, player_pos, player_radius),
		min(
			floor(length(p - net_pos)) - sin(p.x) * sin(p.x) + p.z,
			floor(mod(p.z, 1.5) + 0.5) - sin(p.y) * sin(p.y)
			)
		);
}

/*
** return the color of a given pixel on screen
*/

vec3 get_color (float p_x, float p_y)
{

	//return vec3(0.5);
	vec3 dir 						= normalize(vec3(5.0, p_x, p_y * 0.5)); // + / -
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

	float light = min(1.0, 0.014 * pow(distance_max / (length(ray_pos - cam_pos) + 0.1), 1.9));

	//if (mod(floor(mod(ray_pos.x, 2.0)) + floor(mod(ray_pos.y, 2.0)), 2.0) < 1.0)
	//if (mod(ray_pos.x * ray_pos.y, 2.0) < 1.0)
	if (mod(ray_pos.x * ray_pos.y, 2.0) < 1.5 && rand(vec2(sin(ray_pos.x + time), ray_pos.y)) > 0.8)
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
