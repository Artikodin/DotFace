console.log("Main");
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'jeu');
centerX=game.width/2,
platformY = game.height/1.1;
game.log = function(){
    console.log("%c  Lancement de l'interface "+game.state.getCurrentState().state.current+" Class  ","color:white;background:red");
}

game.state.add('boot', boot);
game.state.add('preload', preload);
game.state.add('mainMenu', mainMenu);
game.state.add('main', main);
game.state.start('boot');
