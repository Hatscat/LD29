/*
** Ghost players class
*/
function c_ghost (p_id, p_config) {

	/*
	** attributs
	*/
	this._id 		= p_id;
	this._config 	= p_config;
	this.x 			= 0;
	this.y 			= 0;
	this.z 			= 0;
	this.radius 	= this._config.player_radius;
}

/*
** methods
*/
c_ghost.prototype._move = function () {


};

c_ghost.prototype.update = function () {

	this._move();

};
