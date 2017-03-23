main={
	init: function(){
        game.log();// appel du debug
    },

    create: function(){

        // Affiche le fond du jeu
        this.background = this.game.add.sprite(0,0, 'background');
        // Affiche la plateforme
        this.platform = this.game.add.sprite(centerX,platformY, 'platform');
        // Le point d'ancrage est mis au milieu de la plateforme
        this.platform.anchor.setTo(0.5, 0.5);

        // Active la physique de la plateforme
        game.physics.arcade.enable(this.platform);
        // La plateforme ne tombe pas si un joueur se pose dessus
        this.platform.body.immovable = true;
    
        // Création du batiment qui vient masquer la plateforme 
        this.house=this.game.add.sprite(centerX*0.88,platformY*0.99, 'house');
        this.house.anchor.setTo(0.5, 0.5);

        // Initialise le joueur1
        this.char1 = this.game.add.sprite(centerX*0.8,platformY*0.8, 'char1');
        game.physics.arcade.enable(this.char1);
        this.char1.anchor.setTo(0.5);
        // Initialise le rebond lors des chutes
        this.char1.body.bounce.y = 0.2;
        // Initialise la gravité du joueur1
        this.char1.body.gravity.y = 300;
        // Initialise la collision avec le bord de la fenêtre
        this.char1.body.collideWorldBounds = false;
        this.char1.body.immovable = false;
        // On place le personnage avec sa tête vers la droite
        this.char1Position = 'right';
        // Le boost est initialisé à 0
        this.boost1=0;
        
        // Initialise le joueur2
        this.char2 = this.game.add.sprite(centerX/0.8,platformY*0.8, 'char2');
        game.physics.arcade.enable(this.char2);
        this.char2.anchor.setTo(0.5);
        this.char2.body.bounce.y = 0.2;
        this.char2.body.gravity.y = 300;
        this.char2.body.collideWorldBounds = false;
        this.char2Position = 'left';
        this.boost2=0;

        // Initialisation des barres de boost
        this.redBar=this.game.add.sprite(40, 80, 'red');
        this.blueBar=this.game.add.sprite(730, 80, 'blue');
        // Les barres on une largeur de 0
        this.redBar.scale.x=0;
        this.blueBar.scale.x=0;
        // Initialisation des conteneurs de boost
        this.game.add.sprite(40, 80, 'boostvide');
        this.game.add.sprite(680, 80, 'boostvide');

        // Initialisation du nuage
        this.nuage=this.game.add.sprite(400, 200, 'nuage1');
        game.physics.arcade.enable(this.nuage);
        this.nuage.anchor.setTo(0.5, 0.5);

        this.nuage2=this.game.add.sprite(40, 80, 'nuage2');
        game.physics.arcade.enable(this.nuage2);
        this.nuage2.anchor.setTo(0.5, 0.5);

        // Initialisation du score
        this.point1=0;
        this.point2=0;
        this.score1 = game.add.text(40, 40, 'Score: 0', { fontSize: '32px', fill: '#ff0000' });
        this.score2 = game.add.text(630, 40, 'Score: 0', { fontSize: '32px', fill: '#0071bc' });

        // Initialisation du button on off son
        this.button=game.add.button(30, 550, 'son', this.sonChange, this, 1, 0);
        this.son=true;

        /**** AUDIO ****/
        this.soundTheme = game.add.audio('theme', 0.5, true);
        this.soundTheme.play();
        this.punch=game.add.audio('punch', 1);
        this.jump=game.add.audio('jump', 1);
        this.acceleration=game.add.audio('acceleration', 1);


    },
    // execute une fonction plusieur fois par secondes
    update: function() {


        // Recuperation des valeurs absolues de la vitesse de chaque joueur
        this.realSpeed1=Math.abs(this.char1.body.velocity.x);
        this.realSpeed2=Math.abs(this.char2.body.velocity.x);

        this.nuage2.body.velocity.x=5;
        this.nuage.body.velocity.x=10;

        // Augmente la taille des bars en fonction du boost
        this.redBar.scale.x=0.01*this.boost1;
        this.blueBar.scale.x= -0.01*this.boost2;

        // Initialise la colision entre le joueur1 et la platform
        game.physics.arcade.collide(this.char1, this.platform);
        game.physics.arcade.collide(this.char2, this.platform);
        game.physics.arcade.collide(this.char1, this.char2, this.collisionHandler, null, this);
        
        // Detection de la touche du clavier pour le saut seulement si je joueur touche le sol
        if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && this.char1.body.touching.down){
            this.char1.body.velocity.y = -200;
            this.jump.play();
        }
        // Détection des touches  du clavier
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.D)){
            // Le personnage se retrouve en position droite
            this.char1Position = 'right';
            // Le joueur1 accelère lorsque la touche est enfoncé
            this.char1.body.velocity.x += 10;
            // Retourne le joueur
            this.char1.scale.x = 1;
        }else if(game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
            // Le personnage se retrouve en position gauche
            this.char1Position = 'left';
            // Le joueur1 accelère lorsque la touche est enfoncé
            this.char1.body.velocity.x -= 10;
            // Retourne le joueur
            this.char1.scale.x = -1;
        }else{
            this.slow('char1');
        }
        // Detection de la touche du clavier pour le boost seulement si la barre de boost est chargé à 20
        if(game.input.keyboard.justPressed(Phaser.Keyboard.S) && this.boost1>20){
            this.acceleration.play();
            this.boost1-=20;
            console.log(this.boost1);
            if(this.char1Position=='right')
                this.char1.body.velocity.x += 100;
            else
                this.char1.body.velocity.x -= 100;
        }


        // Meme que le précedent sans appel de la fonction
        if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.char2.body.touching.down){
            this.char2.body.velocity.y = -200;
            this.jump.play();
        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
            this.char2Position = 'right';
            this.char2.body.velocity.x += 10;
            this.char2.scale.x = -1;
        }else if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
            this.char2Position = 'left';
            this.char2.body.velocity.x -= 10;
            this.char2.scale.x = 1;
        }else{
            this.slow('char2');
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) && this.boost2>20){
            this.acceleration.play();
            this.boost2-=20;
            console.log(this.boost2);
            if(this.char2Position=='right')
                this.char2.body.velocity.x += 100;
            else
                this.char2.body.velocity.x -= 100;
        }


        // Lorsque l'un des deux joueurs sort du terrain la fonction killChar est appelée
        this.char1.checkWorldBounds = true;
        this.char1.events.onOutOfBounds.add(this.killChar1, this);
        this.char2.checkWorldBounds = true;
        this.char2.events.onOutOfBounds.add(this.killChar2, this);


        this.nuage.checkWorldBounds = true;
        this.nuage.events.onOutOfBounds.add(this.killNuage, this);
        this.nuage2.checkWorldBounds = true;
        this.nuage2.events.onOutOfBounds.add(this.killNuage2, this);

    },

    sonChange:function(){
        if(this.son){
            this.son=false;
            this.button.setFrames(3,2);
            this.soundTheme.stop();
        }else{
            this.son=true;
            this.button
            this.button.setFrames(1,0);
            this.soundTheme.play();
        }
    },

    render: function() {

    // game.debug.bodyInfo(this.char1, 16, 24);

    // // game.debug.body(sprite);
    // // game.debug.body(sprite2);

    },

    // Fonction test
    test: function(){
        console.log('test inside');
    },

    // Function qui s'execute si le joueur 1 meurt
    killChar1: function(){
        // réinitialise l'emplacement du joueur 1 
        this.char1.reset(centerX*0.8, platformY*0.5);
        // réinitialise le boost à zero
        this.boost1=0;
        // Incremente le compteur de point du joueur 2
        this.point2+=1;
        // Modifie la valeur du score affiché à l'écran
        this.score2.text='Score: '+this.point2;
    },

    killChar2: function(){
        this.char2.reset(centerX/0.8, platformY*0.5);
        this.boost2=0;
        this.point1+=1; 
        this.score1.text='Score: '+this.point1;
    },

    killNuage: function(){
        this.nuage.reset(0, 150);
    },

    killNuage2: function(){
        this.nuage2.reset(0, 40);
    },

    // fonction callback appelée lors d'un contact entre les deux joueurs
    collisionHandler: function() {
        // joue le son de collision 
        this.punch.play();
        
        if(this.char1Position=='right' && this.char2Position=='left'){
            // collision si les joueur sont face à face
            console.log('collision face à face1');

            // éjecte (petite éjection) le joueur1 lors de la collision
            this.char1.body.velocity.y = -2*this.realSpeed2*0.25;
            this.char1.body.velocity.x = -2*this.realSpeed2*0.5;
            // ralentit le joueur1 lors de la collision
            this.slow('char1');
            // augmente le boost du joueur1 lors de la collision
            this.boost('char1');

            // éjecte (petite éjection) le joueur2 lors de la collision
            this.char2.body.velocity.y = -2*this.realSpeed1*0.25;
            this.char2.body.velocity.x = 2*this.realSpeed1*0.5;
            // ralentit le joueur2 lors de la collision
            this.slow('char2');
            // augmente le boost du joueur2 lors de la collision
            this.boost('char2');


        }else if(this.char1Position=='left' && this.char2Position=='right'){
            // collision face à face2
            console.log('collision face à face2');
            this.char1.body.velocity.y = -2*this.realSpeed2*0.25;
            this.char1.body.velocity.x = 2*this.realSpeed2*0.5;
            this.slow('char1');
            this.boost('char1');

            this.char2.body.velocity.y = -2*this.realSpeed1*0.25;
            this.char2.body.velocity.x = -2*this.realSpeed1*0.5;
            this.slow('char2');
            this.boost('char2');

        // Expulsion lorsque l'un des deux joueurs est dos à l'autre
        }else if(this.char1Position=='left' && this.char2Position=='left'){
            if(this.char1.body.touching.left){
                // Ejecte (petite éjection) le joueur2 lors de la collision
                this.char1.body.velocity.y = -2*this.realSpeed1*0.1;
                this.char1.body.velocity.x = 2*this.realSpeed1*0.2;
                // Ralenti le joueur1 lors de la collision
                this.slow('char1');
                // Augmente le boost du joueur1 lors de la collision
                this.boost('char1');

                // Ejecte (GROSSE éjection) le joueur2 lors de la collision
                this.char2.body.velocity.y = -2*this.realSpeed1*0.4;
                this.char2.body.velocity.x = -2*this.realSpeed1*0.7;
                // Ralenti le joueur2 lors de la collision
                this.slow('char2');
                // Le joueur2 n'a pas de boost supplémentaire lors de la collision


            }else if(this.char2.body.touching.left){
                // j1 expulsé à gauche
                console.log('j1 expulsé à gauche');
                this.char2.body.velocity.y = -2*this.realSpeed2*0.1;
                this.char2.body.velocity.x = 2*this.realSpeed2*0.2;
                this.slow('char2');
                this.boost('char2');
                this.char1.body.velocity.y = -2*this.realSpeed2*0.4;
                this.char1.body.velocity.x = -2*this.realSpeed2*0.7;
                this.slow('char1');
            }
        }else if(this.char1Position=='right' && this.char2Position=='right'){
            if(this.char1.body.touching.right){
                // j2 expulsé à droite
                console.log('j2 expulsé à droite');
                this.char1.body.velocity.y = -2*this.realSpeed1*0.1;
                this.char1.body.velocity.x = 2*this.realSpeed1*0.2;
                this.slow('char1');
                this.boost('char1');
                this.char2.body.velocity.y = -2*this.realSpeed1*0.4;
                this.char2.body.velocity.x = 2*this.realSpeed1*0.7;
                this.slow('char2');
            }else if(this.char2.body.touching.right){
                // j1 expulsé à droite
                console.log('j1 expulsé à droite');
                this.char2.body.velocity.y = -2*this.realSpeed2*0.1;
                this.char2.body.velocity.x = 2*this.realSpeed2*0.2;
                this.slow('char2');
                this.boost('char2');
                this.char1.body.velocity.y = -2*this.realSpeed2*0.4;
                this.char1.body.velocity.x = 2*this.realSpeed2*0.7;
                this.slow('char1');
            }
        }
        if(this.char2.body.touching.down && this.char1.body.touching.up){
            this.char2.body.velocity.y = -100;
        }else if(this.char1.body.touching.down && this.char2.body.touching.up){
            this.char1.body.velocity.y = -100;
        }
    
    },

    // fonction qui permet de réduire la vitesse de chaque personnage progressivement 
    slow: function(char){
        // arrondit la vitesse à une dixaine
        this.char1.body.velocity.x=Math.floor((this.char1.body.velocity.x+5)/10)*10;
        this.char2.body.velocity.x=Math.floor((this.char2.body.velocity.x+5)/10)*10;
        if(char=='char1'){
            // permet de réduire la vitesse progressivement du personnage 1
            if(this.char1.body.velocity.x > 0)
                this.char1.body.velocity.x -= 10;
            else if (this.char1.body.velocity.x < 0)
                this.char1.body.velocity.x += 10;
        }else if(char == 'char2'){
             // permet de réduire la vitesse progressivement du personnage 2
            if(this.char2.body.velocity.x > 0)
                this.char2.body.velocity.x -= 10;
            else if (this.char2.body.velocity.x < 0)
                this.char2.body.velocity.x += 10;
        }
    },

    // fonction qui remplit la barre de boost avec 10% de la vitesse de chaque personnage
    boost: function(char){
        if(char=='char1'){
            // incrémente le boost1 de 10% de la vitesse du personnage 1
            this.boost1+=0.1*Math.abs(Math.floor((this.char1.body.velocity.x+5)/10)*10);
            if(this.boost1>=100)
                this.boost1=100;
        }else if(char=='char2'){
            // incrémente le boost2 de 10% de la vitesse du personnage 2
            this.boost2+=0.1*Math.abs(Math.floor((this.char2.body.velocity.x+5)/10)*10);
            if(this.boost2>=100)
                this.boost2=100;
        }
    }
}

function test(){
   console.log('test outside'); 
}