/*
** Ball class
*/
function c_ball (p_config) {

	/*
	** attributs
	*/
	this._config 	= p_config;
	this.x 			= this._config.ball_params.initial_position.x;
	this.y 			= this._config.ball_params.initial_position.x;
	this.z 			= this._config.ball_params.initial_position.x;
	this.radius 	= this._config.ball_params.radius;
	this.vector = new c_vector(0,0,0);
	this.velocity 	= {};
	this.velocity.x = 0;
	this.velocity.y = 0;
	this.velocity.z = 0;
}

/*
** methods
*/
c_ball.prototype._move = function () {

	var speed = this._config.ball_velocity * this._config.delta_time;
	//this.x = ... * speed;
};

c_ball.prototype.update = function () {
	physics(this);
};
