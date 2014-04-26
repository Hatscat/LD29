#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 coord;

uniform float time;
uniform float positionX;
uniform float positionY;
uniform float angle;

uniform float pix2plot;
uniform float cameraX;
uniform float cameraY;
uniform float cameraDx;
uniform float cameraDy;

vec2 pixelToPosition (vec2 pixelPos)
{
	return vec2(pixelPos.x * cameraDx + cameraX, pixelPos.y * cameraDy + cameraY);
}

float rand (vec2 coord)
{
	return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 sky      = vec3(0.0);
vec3 ground1  = vec3(1.0, 0.0, 0.0);
vec3 ground2  = vec3(1.0);
float dEcran  = 0.5;

vec3 getPreciseColor (float x, float y)
{
	vec3 position = vec3(positionX, positionY, 2.0);
	float dzPixel = y * 0.15;
	float dyPixel = x * 0.15;

	if (dzPixel == 0.0)
	{
		return sky;
	}

	float dxIntersectionSol = -(dEcran * (position.z / dzPixel)) + position.x;

	if (dxIntersectionSol > position.x)
	{
		float dyIntersectionSol = position.y + (dxIntersectionSol - position.x) * dyPixel / dEcran;

		if (mod(dxIntersectionSol, 2.0) < 1.0)
		{
			if (mod(dyIntersectionSol, 2.0) < 1.0)
			{
				return ground2;
			}
			else
			{
				return ground1;
			}
		}
		else
		{
			if (mod(dyIntersectionSol, 2.0) < 1.0)
			{
				return ground1;
			}
			else
			{
				return ground2;
			}
		}
	}
	else
	{
		return sky;
	}
}

vec3 getColor (float x, float y)
{
	vec3 color = vec3(0.0);
	
	for (int i=0; i < 5; i++)
	{
		color += getPreciseColor(x + rand(vec2(i, x + y)) * pix2plot, y + rand(vec2(i, y + x)) * pix2plot);
	};

	return color/5.0;
}

void main (void)
{
	vec2 pos   = pixelToPosition(coord);
	vec3 color = getColor(pos.x, pos.y);
	gl_FragColor = vec4(color, 1.0);
}

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
uniform float angle;

uniform float pix2plot;
uniform float cameraX;
uniform float cameraY;
uniform float cameraDx;
uniform float cameraDy;

vec2 pixelToPosition(vec2 pixelPos) {
return vec2(pixelPos.x * cameraDx + cameraX, pixelPos.y * cameraDy + cameraY);
}

float rand(vec2 coord) {
return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 sky      = vec3(0.0);
vec3 ground1  = vec3(1.0, 0.0, 0.0);
vec3 ground2  = vec3(1.0);
float dEcran  = 0.5;

float distanceField (vec3 pos) {
vec3 centre = vec3(sphereX, sphereY, 1.0);
return min(length(pos - centre) - 2.0, pos.z - sin(pos.x + time)*sin(pos.y) * 0.2);
}


vec3 getColor(float x, float y) {
vec3 position = vec3(positionX, positionY, positionZ);
vec3 dir = vec3(dEcran*cos(angle), dEcran*sin(angle), 0.0);
dir += vec3(-x * 0.15 * sin(angle), x * 0.15 * cos(angle), y * 0.15);
dir = normalize(dir);

float d;
bool max = true;

for (int i=0; i < 100; i++) {
d = distanceField(position);
if (d < 0.01) {
max = false;
break;
} else {
position += d * dir;
}
};

if (max) {
return sky;
}

if (mod(position.x, 2.0) < 1.0) {
if (mod(position.y, 2.0) < 1.0) {
if (mod(position.z, 2.0) < 1.0) {
return ground2;
} else {
return ground1;
}
} else {
if (mod(position.z, 2.0) < 1.0) {
return ground1;
} else {
return ground2;
}
}
} else {
if (mod(position.y, 2.0) < 1.0) {
if (mod(position.z, 2.0) < 1.0) {
return ground1;
} else {
return ground2;
}
} else {
if (mod(position.z, 2.0) < 1.0) {
return ground2;
} else {
return ground1;
}
}
}


return vec3(0.5);
}

void main(void) {
vec2 pos   = pixelToPosition(coord);
vec3 color = getColor(pos.x, pos.y);
gl_FragColor = vec4(color, 1.0);
}
 */