/*
** Ball class
*/
function c_ball (p_config) {

	/*
	** attributs
	*/
	this._config 			= p_config;
	this.radius 			= p_config.ball_params.radius;
	this.can_apply_gravity 	= false;
	this.can_collide 		= true;

	this.position = {
		x : p_config.ball_params.initial_position.x,
		y : p_config.ball_params.initial_position.y,
		z : p_config.ball_params.initial_position.z
	};

	this.velocity = {
		x : 0,
		y : 0,
		z : 0
	};
}

/*
** methods
*/

c_ball.prototype._apply_edge_limits = function () {

	for (var i1 in this.velocity) {

		var min = this._config.ground_limits[i1 + '_min'] + this.radius;
		var max = this._config.ground_limits[i1 + '_max'] - this.radius;

		if (this.position[i1] < min)
		{
			this.position[i1] = min;
			this.velocity[i1] = -this.velocity[i1] * this._config.ground_friction;
		}
		else if (this.position[i1] > max)
		{
			this.position[i1] = max;
			this.velocity[i1] = -this.velocity[i1] * this._config.ground_friction;
		}
	}
};

c_ball.prototype._player_collision = function () {

	var distance_2_player = vector_pos_dif(this.position, this._config.player.position);

	if (vector_length(distance_2_player) < this.radius + this._config.player.radius)
	{
		if (this.can_collide)
		{
			this.can_collide = false;
			this.can_apply_gravity = true;

			this.velocity = find_vector_end(
				this._config.player.velocity,
				find_vector_end(
					this.velocity,
					vector_scale(
						vector_xyz_normalize(
							vector_pos_dif(
								this.position,
								this._config.player.position
							)
						),
						this._config.ball_params.friction
					)
				)
			);
			//console.log('collision !', this.velocity);
		}
	}
	else
	{
		this.can_collide = true;
	}
};

c_ball.prototype._move = function () {

	for (var i1 in this.velocity) {
		
		if (i1 == 'y' && this.can_apply_gravity) {
			this.velocity[i1] -= this._config.gravity * this._config.delta_time;
		}
		
		this.position[i1] += this.velocity[i1];
	}
};

c_ball.prototype.update = function () {

	this._apply_edge_limits();
	this._player_collision();
	this._move();
};