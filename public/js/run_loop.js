/*
** run loop, every frames
*/
rund = false;
function run (p_config, p_timestamp) {

	p_config.time 			= p_timestamp;
	var elapsed_time 		= p_config.time - p_config.old_time;
	p_config.old_time 		= p_config.time;
	p_config.delta_time 	= elapsed_time * 0.06;

if(rund){
	p_config.player.update();
	p_config.ball.update();
	collision(p_config);
}

	//

	//draw(p_config);
	requestAnimationFrame(function(p_ts){run(p_config, p_ts)});
}
