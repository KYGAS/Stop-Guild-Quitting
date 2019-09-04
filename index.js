module.exports = function StopGuildQuitting(dispatch) {
	
    const command = dispatch.command;
	
	let enabled = true;

	command.add('quitguild', {
		$default() { 
			enabled = !enabled;
			if(!enabled){
				command.message('You can quit your guild now.');
				command.message('10 seconds from now you will be prevented to leave the guild again until the next time you use the command.');
				setTimeout(function(){
					enabled = true;
					command.message("You are safe from leaving the guild again.");
				}, 10000);
			}
			else command.message('You are safe from leaving the guild.');
    	}
	});
	
	dispatch.hook("C_REQUEST_COOLTIME_TO_JOIN_GUILD", 'raw', () => {
		if(enabled) return false;
	});
	
	dispatch.hook("S_REQUEST_COOLTIME_TO_JOIN_GUILD", 'raw', () => {
		if(enabled) return false;
	});
}
