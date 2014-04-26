/*
** Player class
*/
function c_player (p_id, p_config) {

	//var that 		= this;

	/*
	** attributs
	*/
	this._config 	= p_config;
	this.id 		= p_id;
	this.x 			= this._config.player_params.initial_position.x;
	this.y 			= this._config.player_params.initial_position.y;
	this.z 			= this._config.player_params.initial_position.z;
	this.radius 	= this._config.player_params.radius;
	this.vector		= new c_vector(this.x,this.y,this.z);
	this.velocity 	= new c_vector(	p_config.player_params.velocity.x,
									p_config.player_params.velocity.y,
									p_config.player_params.velocity.z
									);
	this.velocity.x = 0;
	this.velocity.y = 0;
	this.velocity.z = 0;
}
/*
** methods
*/

c_player.prototype._check_inputs = function () {

	var speed = this._config.player_velocity * this._config.delta_time;
	//this.x = ... * speed;
	for (var i1 in this._config[this._config.keys_config])
	{
		//console.log(i1 + ":"+this._config[this._config.keys_config][i1]);
		//console.log(this._config.keys_down[this._config[this._config.keys_config][i1]]);
		if (this._config.keys_down[this._config[this._config.keys_config][i1]])
		{
			//console.log(i1);

			switch (i1)
			{
				case 'up' :
					this.velocity.x = 10;
				break;
				case 'down' :
					this.velocity.x = -10;
				break;
				case 'left' :
					this.velocity.z = -10;
				break;
				case 'right' :
					this.velocity.z = 10;
				break;
				case 'jump' :
					if(this.vector.getY() === 0){
	 					this.velocity.y += 50;
					}
				break;
			}
		}
	}

	my_player_move(this._config); // event server
};
c_player.prototype.update = function () {
	this._check_inputs();
	this.move();
};

c_player.prototype.move = function () {
// on applique la gravité
if(this.vector.getY() > 0){
	this.velocity.y -= this._config.gravity * this._config.delta_time;
}
//	on applique la reaction
if(this.vector.getY() < 0)
{
	if(this.velocity.y >= this.getMass() || -this.getMass() >= this.velocity.y){
		this.velocity.y = - (this.velocity.y - this.vector.getY());
	}
	else
	{
		this.vector.y = 0;
		this.velocity.y = 0;
	}
}
 
// force de frotement
if(this.vector.getY() <= 0)
{
	this.velocity.x /= 2;
	this.velocity.z /= 2;
}
//	on arrondi les force
	this.velocity.x = this.velocity.x|0;
	this.velocity.y = this.velocity.y|0;
	this.velocity.z = this.velocity.z|0;


//	on applique les force
	this.vector = this.vector.addVector(new c_vector(this.velocity.x,this.velocity.y,this.velocity.z));
	this.x = this.vector.getX();
	this.y = this.vector.getY();
	this.z = this.vector.getZ();

};

c_player.prototype.getMass = function() {
	return this._config.player_params.mass;
};
