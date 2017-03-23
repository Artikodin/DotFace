preload={
	init: function() {
        game.log();// appel du debug
    },
  	preload: function() {
    	// load all game assets
    	// images, spritesheets, atlases, audio etc..
		// création d'une barre de chargement en cours
        var loadingBar = game.add.sprite(320, 360, "loading");
        loadingBar.anchor.setTo(0.5);

        game.load.setPreloadSprite(loadingBar);// mise à jour de la barre de chargement

        // ajoute un logo au dessus de la barre de chargement
        var logo = game.add.sprite(320, 280, "logo").anchor.setTo(0.5);
        // chargement du background
    	this.load.image('background', 'assets/bg.jpg');
        // chargement de la platform et de son decor
    	this.load.image('platform', 'assets/platform.png');
        this.load.image('house', 'assets/house.png');
        // Chargement du joueur1 et du joueur2
        this.load.image('char1', 'assets/char1.png');
        this.load.image('char2', 'assets/char2.png');
        // Chargement des barres de boost
        this.load.image('red', 'assets/red.png');
        this.load.image('blue', 'assets/blue.png');
        this.load.image('boostvide', 'assets/boostvide.png');
        // chargement du boutton jouer
        this.load.atlas('play', 'assets/button.png', 'data/button.json');
        this.load.atlas('son', 'assets/son.png', 'data/son.json');
        // chargement des nuages
        this.load.image('nuage1', 'assets/nuage1.png');
    	this.load.image('nuage2', 'assets/nuage2.png');
        // chargement des sons
        game.load.audio('punch', 'sons/punch.mp3');
        game.load.audio('jump', 'sons/jump.mp3');
        game.load.audio('acceleration', 'sons/acceleration.mp3');
        // Source https://www.youtube.com/watch?v=CT8t_1JXWn8
        game.load.audio('theme', 'sons/what.mp3');
 	},
  	create: function() {
    	this.game.state.start('mainMenu');
  	}
};