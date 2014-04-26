/*
** Ghost players class
*/
function c_ghost (p_id, p_config, p_data) {

	/*
	** attributs
	*/
	this._id 		= p_id;
	this._config 	= p_config;
	this.name		= p_data;
	this.x 			= p_data.position.x;
	this.y 			= p_data.position.y;
	this.z 			= p_data.position.z;
}

/*
** methods
*/
c_ghost.prototype._private_methods = function (p_) {


};

c_ghost.prototype.public_methods = function (p_) {


};
