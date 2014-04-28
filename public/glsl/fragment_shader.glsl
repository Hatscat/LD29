#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

varying vec2 coord;

//uniform vec3 colors[5];
uniform vec3 cam_pos;
uniform vec3 net_pos;
uniform vec3 ball_pos;
uniform vec3 player_pos;
//uniform vec3 ghosts_pos;
uniform float net_height;
uniform float ball_radius;
uniform float player_radius;
uniform float time;

const int iteration_max 	= 200;
const float edge_detail 	= 0.01;
const float distance_max	= 50.0;
//const float PI 				= 3.14159265;

const vec3 color_bg 			= vec3(0.0, 0.0, 0.0);
const vec3 color_player 		= vec3(0.1, 0.0, 0.2);
const vec3 color_player_motif 	= vec3(0.0, 0.5, 0.0);
const vec3 color_ball 			= vec3(0.9, 0.1, 0.0);
const vec3 color_ball_motif 	= vec3(0.8, 0.2, 0.0);
const vec3 color_net 			= vec3(0.5, 0.5, 0.5);
const vec3 color_net_motif 		= vec3(0.9, 0.9, 0.0);
const vec3 color_wall 			= vec3(0.4, 0.2, 0.0);
const vec3 color_wall_motif 	= vec3(0.2, 0.1, 0.0);

vec3 current_color;


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
** return the first pixel of an element founded
*/
float distance_field (in vec3 p) {

	float distance_min 	= distance_max;
	float player 		= sphere(p, player_pos, player_radius);
	float ball 			= sphere(p, ball_pos, ball_radius);
	float net 			= floor(length(p - net_pos)) - sin(p.x) * sin(p.x) + p.z;
	float wall 			= floor(mod(p.z, 1.5) + 0.5) - sin(p.y) * sin(p.y);

	if (player < distance_min)
	{
		distance_min = player;
		current_color = color_player - player * 10.0;
	}
	if (ball < distance_min)
	{
		distance_min = ball;

		if (mod(sin(length(p)), 0.5) < 0.25)
		{
			current_color = color_ball_motif;
		}
		else
		{
			current_color = color_ball;
		}
	}
	if (net < distance_min)
	{
		distance_min = net;

		if (rand(vec2(p.x, p.y)) > 0.85)
		{
			current_color = color_net_motif;
		}
		else
		{
			current_color = color_net;
		}
	}
	if (wall < distance_min)
	{
		distance_min = wall;
		
		if (mod(p.x * p.y * sin(time * 0.001), 2.0) < 1.0)
		{
			current_color = color_wall_motif;
		}
		else
		{
			current_color = color_wall;
		}
	}

	return distance_min;
}

/*
** return the color of a given pixel on screen (vec3)
*/
vec3 get_color (float p_x, float p_y)
{
	vec3 dir 		= normalize(vec3(5.0, p_x, p_y * 0.5));
	vec3 ray_pos 	= cam_pos;
	float distance 	= 0.0;

	for (int i = 0; i < iteration_max; i++)
	{
		distance = distance_field(ray_pos);

		if (distance < edge_detail)
		{
			break;
		}
		else if (length((ray_pos += distance * dir) - cam_pos) > distance_max)
		{
			return color_bg;
		}
	}

	return current_color * 0.02 * pow(distance_max / length(ray_pos - cam_pos), 2.0); // light
}

/*
** MAIN
*/
void main (void)
{
	vec3 color 		= get_color(coord.x, coord.y);
	gl_FragColor 	= vec4(color, 1.0);
}
