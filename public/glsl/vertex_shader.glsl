attribute vec2 vertexPosition;
varying vec2 coord;

void main (void) {
	gl_Position = vec4(vertexPosition, 0.0, 1.0);
	coord = vertexPosition.xy;
}