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
	this.Vector		= new Vector(this.x,this.y,this.z);
	this.radius 	= this._config.player_radius;

}

/*
** methods
*/
c_player.prototype._check_inputs = function () {

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
					this._move(new Vector(_config.player_velocity,0,0));
				break;
				case 'down' :
					this._move(new Vector(-_config.player_velocity,0,0));
				break;
				case 'left' :
					this._move(new Vector(0,0,-_config.player_velocity));
				break;
				case 'right' :
					this._move(new Vector(0,0,_config.player_velocity));
				break;
				case 'jump' :
					this._move(new Vector(0,_config.player_velocity,0));
				break;
			}
			console.log("Vector =" + this.Vector.getX() + " " + this.Vector.getY() + " " + this.Vector.getZ());
		}
	}

	my_player_move(this._config); // event server
};

c_player.prototype.update = function () {

	this._check_inputs();
};

c_player.prototype._move = function (Vector) {
	this.Vector.addVector(Vector);
	this.Em = MecaniqueEnergy(this);
	this.velocity = this.Vector.multiply(this.Em);
};

c_player.prototype.getMass = function() {
	return _config.player_mass;
};




function potentialEnergy(that) {
    return that.getMass() * 20 * that.Vector.getY();   // Potential Energy = mass * gravity * height
};

function kineticEnergy(that) {
    return 0.5 * that.mass * Math.pow(that.velocity.length(), 2);  // Kinetic Energy = 1/2  mass * v^2
};

function MecaniqueEnergy(that)
{
	return MecaniqueEnergy(that) + kineticEnergy(that);
};

move = function (deltaTime) {
    var kineticEnergy = this.totalEnergy - this.potentialEnergy();
    if (kineticEnergy < 0) {
        return;
    }
    
    var speed = Math.sqrt(2 * kineticEnergy / this.mass);        // directly deduced from the formula : Kinetic Energy = 1/2  mass * v^2
    
    //this.localVectors   = game.ground.getLocalVectors(this.pos.x);
    this.velocity       = this.localVectors.i.multiply(speed);   // we constrain the sledding to follow the curve
    
    this.totalEnergy   -= this.friction * speed * deltaTime;     // fake friction formula, but gives reallistic results : sledding loses energy proportionnal to the distance
    
    this.pos.x         += this.velocity.x * deltaTime;
    this.pos.z         += this.velocity.z * deltaTime;
    this.pos.y          = game.ground.f(this.pos.x);             // we constrain the sledding to follow the curve
};
