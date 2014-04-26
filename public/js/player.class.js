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
	this.velocity 	= {};
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
			console.log(i1);

			switch (i1)
			{
				case 'up' :
					this.velocity.x = 50;
				break;
				case 'down' :
					this.velocity.x = -50;
				break;
				case 'left' :
					this.velocity.z = -50;
				break;
				case 'right' :
					this.velocity.z = 50;
				break;
				case 'jump' :
					if(this.vector.getY() === 0){
	 					this.velocity.y = 50;
					}
				break;
			}
		}
	}

	my_player_move(this._config); // event server
};
c_player.prototype.update = function () {

	this._check_inputs();
	physics(this);
};

function physics (that) {
	if(that.vector.getY() > 0 || that.velocity.y > 0){
		that.velocity.y -= that._config.gravity * that._config.delta_time;
	}
	else
	{
		that.vector.y = 0;
		that.velocity.y = 0;
	}

	if(that.velocity.x > 0 || that.velocity.x < 0)
	{
		that.velocity.x /= 7;
		if(that.velocity.x <= 2 && that.velocity.x >= 2)
		{
			that.velocity.x = 0;
		}
	}
	if(that.velocity.z > 0 || that.velocity.z < 0)
	{
		that.velocity.z /= 7;
		if(that.velocity.z <= 2 && that.velocity.z >= 2)
		{
			that.velocity.z = 0;
		}
	}
		that.velocity.z = that.velocity.z|0;
		that.velocity.x = that.velocity.x|0;
		that.velocity.y = that.velocity.y|0;

	that.vector = that.vector.addVector(new c_vector(that.velocity.x,that.velocity.y,that.velocity.z));
	
	if(that.vector.getY() < 0)
	{
		that.vector.y = 0;
	}
	that.x = that.vector.getX();
	that.y = that.vector.getY();
	that.z = that.vector.getZ();
};

c_player.prototype.getMass = function() {
<<<<<<< HEAD
	return this._config.player_mass;
=======
	return parseInt(this._config.player_mass);
>>>>>>> aff9e9e07497c9ebcbf5c3ceb2ee0793ef5a2bfd
};


function potentialEnergy(that) {
    return that.getMass() * that._config.gravity * Math.abs(that.vector.getY());   // Potential Energy = mass * gravity * height
};

function kineticEnergy(that) {
    return 0.5 * that.getMass() * Math.pow(that._config.player_velocity, 2);  // Kinetic Energy = 1/2  mass * v^2
};

function MecaniqueEnergy(that) {
	return potentialEnergy(that) + kineticEnergy(that);
};

/*

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
};*/
