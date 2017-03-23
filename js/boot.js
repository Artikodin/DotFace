boot={
	init: function() {
        game.log();// appel du debug
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    },
	preload: function() {
    	// load preloader assets
    	game.load.image("loading", "assets/loading.png");// charge les images de l'interface de chargement du jeu
		game.load.image("logo", "assets/logo.png");
  	},
  	create: function() {
    	// setup game environment
    	// scale, input etc..

    	// Physique du jeu
    	game.physics.startSystem(Phaser.Physics.ARCADE);

    	

    	this.game.state.start('preload');
  }
}