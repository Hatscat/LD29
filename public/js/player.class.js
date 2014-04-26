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
	this.x 			= this._config.player_initial_position.x;
	this.y 			= this._config.player_initial_position.y;
	this.z 			= this._config.player_initial_position.z;
	this.radius 	= this._config.player_radius;

}

/*
** methods
*/
c_player.prototype._move = function () {

	var speed = this._config.player_velocity * this._config.delta_time;
	//this.x = ... * speed;

	for (var i1 in this._config[this._config.keys_config])
	{
		if (this._config.keys_down[this._config[this._config.keys_config][i1]])
		{

			console.log(i1);

			switch (i1)
			{
				case 'up' :
					this.z += speed;
				break;
				case 'down' :
					this.z -= speed;
				break;
				case 'left' :

				break;
				case 'right' :

				break;
				case 'jump' :

				break;
			}
		}
	}

	my_player_move(this._config); // event server
};

c_player.prototype.update = function () {

	this._move();
};
