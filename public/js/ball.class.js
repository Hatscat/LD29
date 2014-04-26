/*
** Ball class
*/
function c_ball (p_config) {

	/*
	** attributs
	*/
	this._config 	= p_config;
	this.x 			= 0;
	this.y 			= 0;
	this.z 			= 0;
	this.radius 	= this._config.ball_radius;
}

/*
** methods
*/
c_ball.prototype._move = function () {

	var speed = this._config.ball_velocity * this._config.delta_time;
	//this.x = ... * speed;
};

c_ball.prototype.update = function () {

	this._move();
};
