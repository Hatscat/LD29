/*
** Ball class
*/
function c_ball (p_config) {

	/*
	** attributs
	*/
	this._config 	= p_config;
	this.x 			= p_config.ball_params.initial_position.x;
	this.y 			= p_config.ball_params.initial_position.y;
	this.z 			= p_config.ball_params.initial_position.z;
	this.radius 	= p_config.ball_params.radius;
	this.vector 	= new c_vector(this.x ,this.y ,this.z);
	this.velocity 	= new c_vector(	this._config.ball_params.velocity.x,
									this._config.ball_params.velocity.y,
									this._config.ball_params.velocity.z
									);
}

/*
** methods
*/

c_ball.prototype._move = function () {

	var speed = this._config.ball_velocity * this._config.delta_time;
	//this.x = ... * speed;
};

rtest = false;
c_ball.prototype.update = function () {


	if(rtest)
	{
		rtest = false;
		this.velocity.x = 200;
		this.velocity.y = 30 * 20;
		this.velocity.z = 200;
	}

	this.move();
};

c_ball.prototype.getMass = function() {
	return this._config.ball_params.mass;
};
c_ball.prototype.move = function () {
// on applique la gravité
if(this.vector.getY() > 0){
	this.velocity.y -= this._config.gravity * this._config.delta_time;
}
//	on applique la reaction
if(this.vector.getY() < 0)
{
	this.velocity.x /= 2;
	this.velocity.z /= 2;
	if(this.velocity.y >= this.getMass() || -this.getMass() >= this.velocity.y){
		this.velocity.y = - this.velocity.y * 1/2;
	}
	else
	{
		this.vector.y = 0;
		this.velocity.y = 0;
	}
}

//	on arrondi les force
	this.velocity.x = this.velocity.x|0;
	this.velocity.y = this.velocity.y|0;
	this.velocity.z = this.velocity.z|0;


	console.log("ball : " + this.vector.getX() +" : "+ this.vector.getY() +" : "+ this.vector.getZ() + " : " +this.velocity.y);
//	on applique les force
	this.vector = this.vector.addVector(new c_vector(this.velocity.x,this.velocity.y,this.velocity.z));
	this.x = this.vector.getX();
	this.y = this.vector.getY();
	this.z = this.vector.getZ();

};
