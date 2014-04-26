#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

varying vec2 coord;

uniform vec3 cam_pos;
uniform vec3 cam_dir;
uniform vec3 net_pos;
uniform vec3 ball_pos;
uniform vec3 player_pos;
uniform vec3 ghosts_pos;
uniform float net_height;
uniform float ball_radius;
uniform float player_radius;
uniform float time;

const int iteration_max 	= 200;
const float edge_detail 	= 0.01;
const float distance_max	= 60.0;
const float PI 				= 3.14159265;
const vec3 color_dark 		= vec3(0.0, 0.0, 0.0);

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
** domain operations
*/

// float op_repet (in vec3 p_A, in vec3 p_count)
// {
// 	return primitive(mod(p_A, p_count) - 0.5 * p_count);
// }

/*
** distance deformations
*/

// float op_displace (in vec3 p_A)
// {
// 	return primitive(p_A) + displacement(p_A);
// }

// float op_blend (in vec3 p_A)
// {
// 	return smin(primitiveA(p_A) + primitiveB(p_A));
// }

/*
** primitives
*/

float sphere (in vec3 p_center, in float p_radius)
{
  return length(p_center) - p_radius;
}

/*
** return the first element founded
*/

float distance_field (in vec3 p) {

	return min(sphere(player_pos, player_radius), min(1.0/p.z, p.z));
}

/*
** return the color of a given pixel on screen
*/

vec3 get_color (float p_x, float p_y)
{
	vec3 dir = cam_dir;
	dir += vec3(-p_x * 0.15, p_x * 0.15, p_y * 0.15);
	dir = normalize(dir);

	float d = 0.0;
	bool maxIterationsReached = true;

	vec3 ray_pos = cam_pos;

	for (int i = 0; i < iteration_max; i++)
	{
		d = distance_field(ray_pos);

		if (d < edge_detail)
		{
			maxIterationsReached = false;
			break;
		}
		else
		{
			ray_pos += d * dir;
		}
		if (length(ray_pos - cam_pos) > distance_max)
		{
			//return vec3(0.5);
			return color_dark;
		}
	}

	if (maxIterationsReached) {
	 	return vec3(0.3, 0.1, 0.0);
	}


	float light = min(1.0, 0.03 * pow(distance_max / (length(ray_pos - cam_pos) + 0.1), 2.0));

	if (mod(floor(mod(ray_pos.x, 2.0)) + floor(mod(ray_pos.z, 2.0)), 2.0) < 1.0) {
		return vec3(0.4, 0.2, 0.1) * light;
	}
	return vec3(0.6, 0.2, 0.1) * light;
}

/*
** MAIN
*/

void main (void)
{
	vec3 color 		= get_color(coord.x, coord.y);
	gl_FragColor 	= vec4(color, 1.0);
}


/* // Sol
vec2 obj_floor (in vec3 p)
{
	return vec2 (p.y + 10.0, 0.0);
}

// Ball
vec2 obj_sphere (in vec3 p)
{
	float d = length(p) - ball_radius;
	return vec2(d, 1.0);
	//return d;
}

// Union d'objets
vec2 obj_union (in vec2 obj0, in vec2 obj1)
{
	if (obj0.x < obj1.x)
	{
		return obj0;
	}
	else
	{
		return obj1;
	}
}

vec2 distance_to_obj (in vec3 p)
{
	return obj_floor(p);//obj_union(obj_floor(p), obj_sphere(p));
}


// Couleur du sol (damier)
vec3 floor_color (in vec3 p)
{
	if (fract(p.x * 0.2) > 0.2)
	{
		if (fract(p.z * 0.2) > 0.2)
		{
			return vec3(0.0, 0.1, 0.2);
		}
		else
		{
			return vec3(1.0, 1.0, 1.0);
		}
	}
	else
	{
		if (fract(p.z * 0.2) > 0.2)
		{
			return vec3(1.0, 1.0, 1.0);
		}
		else
		{
			return vec3(0.3, 0, 0);
		}
	}
}

// Couleur de la primitive
vec3 prim_c (in vec3 p)
{
	return vec3(0.6, 0.6, 0.8);
}

void main (void)
{
	vec2 q = coord.xy;
	vec2 vPos = -1.0 + 2.0 * q;

	// Inclinaison de la caméra.
	vec3 vuv = vec3(0.0, 1.5, 0.0); 

	// Direction de la caméra.
	vec3 vrp = vec3(0.0, 0.0, 0.0);

	vec3 prp = cam_pos;

	// Configuration de la caméra.
	vec3 vpn = normalize(vrp - prp);
	vec3 u = normalize(cross(vuv, vpn));
	vec3 v = cross(vpn, u);
	vec3 vcv = (prp + vpn);
	vec3 scrCoord = vcv + vPos.x * u * 0.8 + vPos.y * v * 0.8;
	vec3 scp = normalize(scrCoord - prp);

  // Raymarching.
	const vec3 e = vec3(0.02, 0.0, 0.0);
	const float maxd = 100.0; // Profondeur maximale
	vec2 d = vec2(0.02, 0.0);
	vec3 c, p, N;

	float f = 1.0;

	for (int i = 0; i < 256; i++)
	{
		if ((abs(d.x) < 0.001) || (f > maxd)) 
		{
			break;
		}

		f += d.x;
		p = prp + scp * f;
		d = distance_to_obj(p);
	}

	if (f < maxd)
	{
		// y est utilisé pour gérer les matériaux
		if (d.y == 0.0)
		{
			c = floor_color(p);
		}
		else
		{
			c = prim_c(p);
		}

		vec3 n = vec3(d.x - distance_to_obj(p - e.xyy).x,
					  d.x - distance_to_obj(p - e.yxy).x,
					  d.x - distance_to_obj(p - e.yyx).x);

		N = normalize(n);

		float b = dot(N, normalize(prp - p));

		// Simple éclairage Phong, LightPosition = CameraPosition
		gl_FragColor = vec4((b * c + pow(b, 16.0)) * (1.0 - f * 0.01), 1.0);
	}
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Couleur de fond
	}
} */

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////


/* #ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

varying vec2 coord;

uniform float time;
uniform float positionX;
uniform float positionY;
uniform float positionZ;
uniform float sphereX;
uniform float sphereY;
//uniform float pix2plot;

//************************************************************************
//*************************************************************************
//*************************************************************************

vec3 dark     = vec3(0.0);
vec3 ground1  = vec3(1.0, 0.0, 0.0);
vec3 ground2  = vec3(1.0);

float angle         = 0.0;
float cameraDx      = 0.5;
float cameraDy      = 2.0;
float maxDistance   = 60.0;
float dEcran        = 0.5;
float sphereRadius  = 1.9;
float waveAmplitude = 0.2;
float sphereZ       = 1.01;

vec3 position       = vec3(positionX, positionY, positionZ);
vec3 sphereCentre       = vec3(positionX, positionY, positionZ);
//vec3 sphereCentre     = vec3(sphereX, sphereY, sphereZ);

//*************************************************************************
//*************************************************************************
//*************************************************************************

vec2 pixelToPosition(vec2 pixelPos) {
	return vec2(pixelPos.x * cameraDx, pixelPos.y * cameraDy);
}

float rand(vec2 coord) {
	return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float distanceField (in vec3 pos) {

	return min(length(pos - sphereCentre) - sphereRadius, pos.y - sin(pos.x + time) * sin(pos.z) * waveAmplitude);
}


vec3 getColor(float x, float y) {

	vec3 dir = vec3(dEcran*cos(angle), dEcran*sin(angle), 0.0);
	dir += vec3(-x * 0.15 * sin(angle), x * 0.15 * cos(angle), y * 0.15);
	dir = normalize(dir);

	float d = 0.0;
	bool maxIterationsReached = true;

	vec3 rayPosition = position;

	for (int i=0; i < 200; i++) {

		d = distanceField(rayPosition);
		if (d < 0.01) {
			maxIterationsReached = false;
			break;
		} else {
			rayPosition += d * dir;
		}
		if (length(rayPosition - position) > maxDistance) {
			return dark;
		}
	};

	//return(vec3(0.5));
	if (maxIterationsReached) {
		return dark;
	}

	float distance = length(rayPosition - position);

	float light    = min(1.0, 0.03 * pow(maxDistance / (distance + 0.1), 2.0));

	if (mod(floor(mod(rayPosition.x, 2.0)) + floor(mod(rayPosition.z, 2.0)), 2.0) < 1.0) {
		return ground1 * light;
	} else {
		return ground2 * light;
	}
}

void main (void) {
	vec2 pos   = pixelToPosition(coord);
	vec3 color = getColor(pos.x, pos.y);
	gl_FragColor = vec4(color, 1.0);
}
 */