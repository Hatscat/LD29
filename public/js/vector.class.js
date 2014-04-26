/*
** Vector 3D class
*/

var Vector = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.getX = function() {
        return this.x;
    };
    
    this.getY = function() {
        return this.y;
    };

    this.getZ = function() {
        return this.z;
    };

    this.vectorByDots = function(dot1, dot2)
    {
	this.x = dot2.x - dot1.x;
    this.y = dot2.y - dot1.y;
    this.z = dot2.z - dot1.z;
    };
    
    
    this.halfVector = function(vec) {
        return new Vector(
            this.getX() + (vec.getX() - this.getX()) / 2,
            this.getY() + (vec.getY() - this.getY()) / 2,
            this.getZ() + (vec.getZ() - this.getZ()) / 2
        );
    };
    
    this.equals = function(vec) {
        return vec.getX() === this.getX() && vec.getY() === this.getY() && vec.getZ() === this.getZ();
    };
    
    this.addVector = function(vec) {
        return new Vector(this.getX() + vec.getX(), this.getY() + vec.getY() , this.getZ() + vec.getZ());
    };
    
    this.subtractVector = function(vec) {
        return new Vector(this.getX() - vec.getX(), this.getY() - vec.getY() , this.getZ() - vec.getZ());
    };
    
    this.multiply = function(scalar) {
        return new Vector(
            this.getX() * scalar,
            this.getY() * scalar,
            this.getZ() * scalar
        );
    };
    
    this.multiplyVector = function(vec) {
        return new Vector(
            this.getX() * vec.getX(),
            this.getY() * vec.getY(),
            this.getZ() * vec.getZ()
        );
    };
    
    this.divide = function(scalar) {
        return new Vector(
            this.getX() / scalar,
            this.getY() / scalar,
            this.getZ() / scalar
        );
    };
    
    this.invert = function(scalar) {
        return new Vector(
            -this.getX(),
            -this.getY(),
            -this.getZ()
        );
    };
    
    this.dotProduct = function(vec) {
        return this.getX() * vec.getX() + this.getY() * vec.getY() + this.getZ() * vec.getZ();
    };
    
    this.isCollinaire = function(vec) {
        return  this.getX() * vec.getY() - this.getY() * vec.getX() === 0
            &&  this.getX() * vec.getZ() - this.getZ() * vec.getX() === 0
            &&  this.getY() * vec.getZ() - this.getZ() * vec.getY() === 0;
    };
    /*
    this.reflect = function(vec) {
        var newVec     = vec.multiply(2);
        var dotProduct = this.dotProduct(vec);
        newVec = newVec.multiply(dotProduct);
        return this.subtractVector(newVec);
    };
    */
    this.reflectX = function() {
        return new Vector(-this.getX(), this.getY(), this.getZ());
    };
    
    this.reflectY = function() {
        return new Vector(this.getX(), -this.getY(), this.getZ());
    };
    this.reflectZ = function() {
        return new Vector(this.getX(), this.getY(), -this.getZ());
    };
    this.scale = function(factor) {
        return new Vector(
            this.getX() * factor,
            this.getY() * factor,
            this.getZ() * factor
        );
    };
    
    this.scaleX = function(factor) {
        return new Vector(
            this.getX() * factor,
            this.getY(),
            this.getZ()
        );
    };
    
    this.scaleY = function(factor) {
        return new Vector(
            this.getX(),
            this.getY() * factor,
            this.getZ()
        );
    };
    this.scaleZ = function(factor) {
        return new Vector(
            this.getX(),
            this.getY(),
            this.getZ() * factor
        );
    };
    this.getLength = function() {
        return Math.sqrt(Math.pow(this.getX(), 2.0) + Math.pow(this.getY(), 2.0)+ Math.pow(this.getZ(), 2.0));
    };
    /*
    this.normalise = function() {
	var fLength = this.getLength();
    	if (fLength > 1e-08)
    		return new Vector(this.getX() / fLength, this.getY() / fLength);	
    	return this.clone(); // Might cause issues in IE.
    };
    */
    this.clone = function() {
        return new Vector(this.getX(), this.getY(), this.getZ());
    };

    this.contraVector = function() {
        return this.invert();
    };
    /*
    this.lessThan = function(vector) {
        return (this.getX() > vector.getX() && this.getY() > vector.getY());
    };
    */
    this.clear = function() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
    };

};
