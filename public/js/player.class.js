/*
** Player class
*/
function c_player (p_id, p_config) {

	var that 		= this;
	
	/*
	** attributs
	*/
	this._id 		= p_id;
	this._config 	= p_config;
	this.x 			= p_config.player_position.x;
	this.y 			= p_config.player_position.y;
	this.z 			= p_config.player_position.z;
}

/*
** methods
*/
c_player.prototype._private_methods = function (p_) {


};

c_player.prototype.public_methods = function (p_) {


};
