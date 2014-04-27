/*
** run loop, every frames
*/
//rund = true;//false;
function run (p_config, p_timestamp) {

	p_config.time 			= p_timestamp;
	var elapsed_time 		= p_config.time - p_config.old_time;
	p_config.old_time 		= p_config.time;
	p_config.delta_time 	= elapsed_time * 0.06 || 1;

	//console.log(elapsed_time)
	
//if(rund) {
	p_config.player.update();
	//p_config.ball.update();
	//collision(p_config);
//}

	//

	draw(p_config);
	requestAnimationFrame(function(p_ts){run(p_config, p_ts)});
}
