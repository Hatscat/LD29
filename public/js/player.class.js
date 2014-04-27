/*
** Player class
*/
function c_player (p_id, p_config) {

	/*
	** attributs
	*/
	this._config 	= p_config;
	this.id 		= p_id;
	this.x 			= this._config.player_params.initial_position.x;
	this.y 			= this._config.player_params.initial_position.y;
	this.z 			= this._config.player_params.initial_position.z;
	this.radius 	= this._config.player_params.radius;
	this.on_ground 	= true;

	this.current_direction = {
		x : 0,
		y : 0,
		z : 0
	};

	this.current_velocity = {
		x : 0,
		y : 0,
		z : 0
	};
}

/*
** methods
*/

c_player.prototype._check_key = function (p_key) {

	return this._config.keys_down[this._config[this._config.keys_config][p_key]];
}

c_player.prototype._check_inputs = function () {

	if (this.on_ground)
	{
		this.current_direction.x = -this._check_key('down') | this._check_key('up') | 0;
		this.current_direction.z = -this._check_key('left') | this._check_key('right') | 0;
		this.current_direction.y =  this._check_key('jump') * this._config.player_params.jump_strength | 0;
	}
};

c_player.prototype._is_on_ground = function () {

	return this.y - this._config.ground_limits.y_min - this.radius < 0;
};


c_player.prototype._apply_edge_limits = function () {

	for (var i1 in this.current_velocity) {

		var min = this._config.ground_limits[i1 + '_min'] + this.radius;
		var max = this._config.ground_limits[i1 + '_max'] - this.radius;

		this[i1] = this[i1] < min ? min : this[i1] > max ? max : this[i1];
	}
};

c_player.prototype._move = function () {

	var acceleration_mass_ratio = 1 + (1 / this._config.player_params.mass);
	var decceleration_mass_ratio = 1 - (1 / this._config.player_params.mass);


	for (var i1 in this.current_velocity) {
		if (this.on_ground) {
			this.current_velocity[i1] 	+= this.current_direction[i1]
										* this._config.player_params.acceleration
										* acceleration_mass_ratio
										* (i1 == 'y' || this._config.delta_time);
			this.current_velocity[i1] *= this._config.ground_friction * decceleration_mass_ratio;
		} else if (i1 == 'y') {
			this.current_velocity[i1] -= this._config.gravity * this._config.delta_time;
		}
		this[i1] += this.current_velocity[i1];
	}
};

c_player.prototype.update = function () {

	this.on_ground = this._is_on_ground();
	this._check_inputs();
	this._move();
	this._apply_edge_limits();
	my_player_move(this._config); // event server
};
