/*
** 3D physics functions
*/

function collision (p_config)
{
	p_config.player.update();
	p_config.ball.update();
	dist = Math.sqrt(Math.pow(p_config.player.vector.x - p_config.ball.vector.x, 2)
					+Math.pow(p_config.player.vector.y - p_config.ball.vector.y, 2)
					+Math.pow(p_config.player.vector.z - p_config.ball.vector.z, 2)
					);
	distCollision = p_config.player.radius + p_config.ball.radius;

	if(dist < distCollision)
	{
		var velocity 	= new c_vector(0,0,0);
		var direction 	= new c_vector(0,0,0);

		velocity.x = p_config.ball.velocity.x - p_config.player.velocity.x;
		velocity.y = p_config.ball.velocity.y - p_config.player.velocity.y;
		velocity.z = p_config.ball.velocity.z - p_config.player.velocity.z;

		direction.x = p_config.ball.vector.x - p_config.player.vector.x;
		direction.y = p_config.ball.vector.y - p_config.player.vector.y;
		direction.z = p_config.ball.vector.z - p_config.player.vector.z;

		direction = direction.normalise().multiply(velocity.getLength());

		p_config.ball.velocity = direction;
	}
}