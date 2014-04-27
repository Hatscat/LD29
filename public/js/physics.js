/*
** 3D physics functions
*/
function vector_null () {
	return {x : 0, y : 0, z : 0};
}

function find_vector_end (p_A, p_B) {
	return {	x : p_A.x + p_B.x,
				y : p_A.y + p_B.y,
				z : p_A.z + p_B.z };
}

function vector_pos_dif (p_A, p_B) {
	return {	x : p_A.x - p_B.x,
				y : p_A.y - p_B.y,
				z : p_A.z - p_B.z };
}

function vector_scale (p_A, p_scale) {
	return {	x : p_A.x * p_scale,
				y : p_A.y * p_scale,
				z : p_A.z * p_scale };
}

function inverse_vector (p_A, p_friction_ratio) {
	var inv = -p_friction_ratio || -1;

	return {	x : p_A.x * inv,
				y : p_A.y * inv,
				z : p_A.z * inv };
}

function vector_length_2 (p_A) {
	return p_A.x * p_A.x + p_A.y * p_A.y + p_A.z * p_A.z;
}

function vector_length (p_A) {
	return Math.abs(p_A.x) + Math.abs(p_A.y) + Math.abs(p_A.z);
}

function vector_xyz_normalize (p_A) {
	var normalisation_ratio = vector_length(p_A);
	normalisation_ratio = normalisation_ratio ? normalisation_ratio : 1;

	return {	x : p_A.x / normalisation_ratio,
				y : p_A.y / normalisation_ratio,
				z : p_A.z / normalisation_ratio };
}

function vector_xz_normalize (p_A) {
	var normalisation_ratio = Math.abs(p_A.x) + Math.abs(p_A.z);
	normalisation_ratio = normalisation_ratio ? normalisation_ratio : 1;

	return {	x : p_A.x / normalisation_ratio,
				y : p_A.y,
				z : p_A.z / normalisation_ratio };
}
