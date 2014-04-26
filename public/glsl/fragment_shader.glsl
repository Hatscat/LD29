#ifdef GL_FRAGMENT_PRECISION_HIGH
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
uniform float pix2plot;

/*************************************************************************/
/*************************************************************************/
/*************************************************************************/

vec3 dark     = vec3(0.0);
vec3 ground1  = vec3(1.0, 0.0, 0.0);
vec3 ground2  = vec3(1.0);

float angle 		= 0.0;
float cameraDx		= 0.5;
float cameraDy		= 2.0;
float maxDistance 	= 60.0;
float dEcran 		= 0.5;
float sphereRadius 	= 1.9;
float waveAmplitude = 0.2;
float sphereZ 		= 1.01;

vec3 position 		= vec3(positionX, positionY, positionZ);
vec3 sphereCentre 	= vec3(sphereX, sphereY, sphereZ);

/*************************************************************************/
/*************************************************************************/
/*************************************************************************/

vec2 pixelToPosition(vec2 pixelPos) {
	return vec2(pixelPos.x * cameraDx, pixelPos.y * cameraDy);
}

float rand(vec2 coord) {
	return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float distanceField (in vec3 pos) {

	return min(length(pos - sphereCentre) - sphereRadius, pos.z - sin(pos.x + time) * sin(pos.y) * waveAmplitude);
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

	if (mod(floor(mod(rayPosition.x, 2.0)) + floor(mod(rayPosition.y, 2.0)), 2.0) < 1.0) {
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
    