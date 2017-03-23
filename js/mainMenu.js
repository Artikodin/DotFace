mainMenu={
	init: function(){
        game.log();// appel du debug
    },

    create: function(){
        game.add.image(0, 0, 'background');
    	this.logo=game.add.image(centerX, 200, 'logo');
    	this.logo.anchor.setTo(0.5);
    	this.button=game.add.button(centerX, 350, 'play', this.start, this, 1, 0);
    	this.button.anchor.setTo(0.5);

    },

    start: function(){
    	this.game.state.start('main');
    }


}