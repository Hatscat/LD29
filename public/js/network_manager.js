/*
** new player event cb
*/
function new_player (p_config, p_data) {

	//console.log('new data', p_data);

	if (p_config.player) {

		p_config.ghosts[p_data[0]] = new c_ghost(p_data[0], p_config);

	} else {

		p_config.player = new c_player(p_data[0], p_config);
		p_config.ball = new c_ball(p_config);
		sessionStorage.setItem('id', p_config.player.id);
		run(p_config, p_config.time);

		for (var i1 in p_data[1])
		{
			if (p_data[1][i1] && p_data[0] != p_config.player.id)
			{
				p_config.ghosts[i1] = new c_ghost(i1, p_config);
			}
		}
	}
}

/*
** update one extern player cb
*/
function update_an_ext_player (p_config, p_data) {

	if (p_data[0] != p_config.player.id) {

		//console.log("player " + p_data[0] + " move !");
		var ghost = p_config.ghosts[p_data[0]];
		ghost.x = p_data[1];
		ghost.y = p_data[2];
		ghost.z = p_data[3];
	}
}

/*
** update my player obj
*/
function my_player_move (p_config) {

	p_config.socket.emit('move', [p_config.player.id, p_config.player.x, p_config.player.y, p_config.player.z]);
}

/*
** update a player
*/
function deco_player (p_config, p_data) {

	delete p_config.players[p_data];
	//console.log("deco d'un joueur", p_config.players);
}
