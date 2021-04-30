
// Provides math problems and checks the answer for validity
mathProblem = function(level) {

    let operations = [];
    let range = 0;

    switch (Number(level)) {

        case 1:
            operations = ['+', '-'];
            range = 11;
            let a = Math.floor(Math.random() * 10);
            let b = Math.floor[Math.random() * 10];
            break;
        case 2:
            operations = ['+', '-'];
            range = 101;
            break;

        case 3:
            operations = ['+', '-', 'x', '/'];
            break;
        default:
            console.log("invalid parameter. Should be 1, 2, or 3");
            return;
    };


    let op = operations[Math.floor(Math.random() * operations.length)];

    if (level == 3) {
        if (op == '+' || op == '-') {
            range = 101;
        }
        else {
            range = 11;
        }
    };

    let a = Math.floor(Math.random() * range);
    let b = Math.floor(Math.random() * range);

    if (op == '-' && b > a) { // prevent negative answers

        let temp = a;
        a = b;
        b = temp;
    }
    if (op == '/') { // prevent the divide by 0 case
        if (b == 0) { b++; } 
        result = a * b;
        a = result; // result / b = a prevents fraction answers
    }

    var calcAnswer = {
        '+': function (x, y) { return x + y; },
        '-': function (x, y) { return x - y; },
        'x': function (x, y) { return x * y; },
        '/': function (x, y) { return x / y; }
    };

    let correctAnswer = calcAnswer[op](a, b);

    // Show the problem and
    // Get input from the user
    let userAnswer = window.prompt(a + ' ' + op + ' ' + b + ' = ', '');

    // check correct
    if (userAnswer == correctAnswer) {
        console.log('Correct');
        return true;
    } else {
        console.log('That is not right');
        return false;
    }

}

// ========================= Player =============================
function Player(game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, 'player');

    // set anchor point to middle of model
    this.anchor.set(0.5, 0.5); 

    // Player animations
    this.animations.add('still', [0]);
    this.animations.add('walk', [1, 0, 2, 0], 7, true);
    this.animations.add('jump', [3, 3, 3, 3, 3, 3], 6);
    
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
};

// Create the model
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Set player movement
Player.prototype.move = function (dir) 
{
    if (this.body.velocity.x < 0) 
    {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) 
    {
        this.scale.x = 1;
    }

    const speed = 200;
    this.body.velocity.x = dir * speed;
};
// Allow player to jump
Player.prototype.jump = function()
{
    const jump_speed = 650;
    let jumped = this.body.touching.down;

    if (jumped)
    {
        this.body.velocity.y = -jump_speed;
    }

    return jumped;
};
// Allow player to bounce
Player.prototype.bounce = function ()
{
    const bounce = 200;
    this.body.velocity.y = -bounce;
};

// ========================== Ghost ===============================
function Ghost(game, x, y) 
{
    Phaser.Sprite.call(this, game, x, y, 'ghost');

    // set anchor point to middle of model
    this.anchor.set(0.5);

    // Ghost animation
    this.animations.add('walk', [0, 1,], 4, true);
    this.animations.add('die', [0, 2, 0, 2, 0, 2, 2, 2, 2], 12);
    this.animations.play('walk');

    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Ghost.speed;
};

// Create Ghost model
Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.prototype.constructor = Ghost;

// ========================== Zombie ===============================
function Zombie(game, x, y) 
{
    Phaser.Sprite.call(this, game, x, y, 'zombie');

    // set anchor point to middle of model
    this.anchor.set(0.5);

    // Zombie animation
    this.animations.add('walk', [0, 1, 2, 1], 4, true);
    this.animations.add('die', [0, 3, 0, 3, 0, 3, 3, 3, 3], 12);
    this.animations.play('walk');

    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Zombie.speed;
};

// Create Zombie model
Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombie.prototype.constructor = Zombie;

// ========================== Chest =================================
function Chest(game, x,y){

    Phaser.Sprite.call(this, game, x, y, 'chest');
    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.animations.add('closed', [0], 1, true);
    this.animations.add('open')
    this.animations.play('closed');
}

// Create Chest model
Chest.prototype = Object.create(Phaser.Sprite.prototype);
Chest.prototype.constructor = Chest;

// ========================== Cliff =================================
function Cliff(game, x,y){

    Phaser.Sprite.call(this, game, x, y, 'cliff');
    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.animations.add('closed', [0], 1, true);
    this.animations.add('open', [1,2,3,4,5], 6)
    this.animations.play('closed');
}

// Create Cliff model
Cliff.prototype = Object.create(Phaser.Sprite.prototype);
Cliff.prototype.constructor = Cliff;

// ========================= Main Menu =============================
mainMenuState = {};
// Initialize menu
mainMenuState.init = function(){

    this.keys = this.game.input.keyboard.addKeys
    ({
        wkey: Phaser.KeyCode.W
    })
    this.keys.wkey.onDown.add(function()
    {
        this.state.start('selectDifficulty')
    }, this);

}

// Load assets into memory
mainMenuState.preload = function(){

    this.game.load.image('bg', 'assets/bg.png');
}

// Create Main Menu
mainMenuState.create = function()
{
    // Background
    var bg = this.add.image(0,0,'bg')
        
    bg.displayHeight=this.game.height;
    bg.displayWidth = this.game.width;
    bg.scaleX = 7;
    bg.scaleY = 7;

    // Title
    var titleText = this.add.text(this.game.width / 3, 100, "HOLLOW WOODS" , 
    {
        font: 'bold 30pt Arial',
        fill: 'white',
        align: 'center'
    })

    // Intro Text
    var playtxt = this.add.text(this.game.width / 3, 200, "Press W to Play" , 
    {
        font: 'bold 20pt Arial',
        fill: 'white',
        align: 'center'
    })
    
}

// ============================ Difficulty =============================
var difficulty
selectDifficultyState = {}

// Selecting Difficulty
selectDifficultyState.init = function(){

    // Keyboard Input
    this.keys = this.game.input.keyboard.addKeys
    ({
        wkey: Phaser.KeyCode.W,
        skey: Phaser.KeyCode.S,
        xkey: Phaser.KeyCode.X
    });

    // Easy
    this.keys.wkey.onDown.add(function()
    {
        difficulty = 1
        this.state.start('play', true, false, {level: 0})
    }, this);

    // Medium
    this.keys.skey.onDown.add(function()
    {
        difficulty = 2
        this.state.start('play', true, false, {level: 0})
    }, this);

    // Hard
    this.keys.xkey.onDown.add(function()
    {
        difficulty = 3;
        this.state.start('play',true, false,  {level: 0})
    }, this);

}

// Load asset into memory
selectDifficultyState.preload = function(){
    this.game.load.image('bg', 'assets/bg.png');
}

// Create Difficulty Selection screen
selectDifficultyState.create = function()
{
    // Background
    var bg = this.add.image(0,0,'bg')
    bg.displayHeight= this.game.height;
    bg.displayWidth = this.game.width;
    bg.scaleX = 7;
    bg.scaleY = 7;

    // Instructions
    var instructionText = this.add.text(this.game.width / 3, 100, "Select Difficulty" , 
    {
        font: 'bold 20pt Arial',
        fill: 'white',
        align: 'center'
    })

    // Easy Option
    var easytxt = this.add.text(this.game.width / 3, 150, "W.Easy" , 
    {
        font: 'bold 20pt Arial',
        fill: 'white',
        align: 'center'
    })

    // Medium Option
    var mediumtxt = this.add.text(this.game.width / 3, 200, "S. Medium" , 
    {
        font: 'bold 20pt Arial',
        fill: 'white',
        align: 'center'
    })

    // Hard Option
    var hardtxt = this.add.text(this.game.width / 3, 250, "X. Hard" , 
    {
        font: 'bold 20pt Arial',
        fill: 'white',
        align: 'center'
    })
    
}

// ============================== Main Game ====================================
const levelCount = 2

PlayState = {};

// Initialize Game
PlayState.init = function (data) 
{
    this.level =(data.level || 0) % levelCount
    // Prevent sprites from blurring
    this.game.renderer.renderSession.roundPixels = true;

    // Keyboard Input for Movement
    this.keys = this.game.input.keyboard.addKeys
    ({
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D,
        up: Phaser.KeyCode.W
    });

    this.keys.up.onDown.add(function()
    {
        let jumped = this.player.jump();
    }, this);
};

// Load assets into memory
PlayState.preload = function() 
{
    this.game.load.json('lvl0', 'data/lvl0.json');
    this.game.load.json('lvl1', 'data/lvl1.json');
    
    this.game.load.image('bg', 'assets/bg.png');
    this.game.load.image('rock', 'assets/rock.png');
    this.game.load.image('rock-small', 'assets/rock-small2.png');
    this.game.load.image('rock-medium', 'assets/rock-medium2.png');
    this.game.load.image('rock-large', 'assets/rock-large2.png');
    this.game.load.image('wall', 'assets/wall.png');
    
    this.game.load.spritesheet('player', 'assets/player_walking-2.png', 42, 60);
    this.game.load.spritesheet('ghost', 'assets/ghost-2.png', 39, 60);
    this.game.load.spritesheet('zombie', 'assets/zombie-2.png', 39, 60);
    this.game.load.spritesheet('chest', 'assets/chest.png', 45, 40);
    this.game.load.spritesheet('cliff', 'assets/cliff.png', 112, 190)
};

//Create the game with level variable to select level
PlayState.create = function() 
{
    this.game.add.image(0, 0, 'bg');
    this._loadLevel(this.game.cache.getJSON(`lvl${this.level}`));
    
};

//Update Function for game: runs all calculations that are happening at runtime
PlayState.update = function () 
{
    this._handleCollisions();
    this._handleInput();
};

//Update Function for the player: all interactions with the Player
Player.prototype.update = function () 
{
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) 
    {
        this.animations.play(animationName);
    }
};

// Set Animation for the Player
Player.prototype._getAnimationName = function () 
{
    // default animation
    let name = 'still'; 

    // jumping
    if (this.body.velocity.y < 0) 
    {
        name = 'jump';
    }
    // falling
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) 
    {
        name = 'still';
    }
    // walking
    else if (this.body.velocity.x !== 0 && this.body.touching.down) 
    {
        name = 'walk';
    }

    return name;
};

// Update Function for the Ghost: all interactions with the Ghost
Ghost.prototype.update = function () 
{
    // body touches right wall 
    if (this.body.touching.right || this.body.blocked.right) 
    {
        // move left
        this.body.velocity.x = -Ghost.speed; 
        // flip frame
        this.scale.x = -1;
    }
    // body touches left wall
    else if (this.body.touching.left || this.body.blocked.left) 
    {
        // move right
        this.body.velocity.x = Ghost.speed; 
        // flip frame
        this.scale.x = 1;
    }
};

// Death function for the Ghost: removes model from game and plays death animation
Ghost.prototype.die = function ()
{
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function ()
    {
        this.kill();
    }, this);
};

// Ghost movement speed
Ghost.speed = 100;
// Update Function for the Zombie: all interactions with the Zombie
Zombie.prototype.update = function () 
{
    // body touches right wall 
    if (this.body.touching.right || this.body.blocked.right) 
    {
        // move left
        this.body.velocity.x = -Zombie.speed; 
        // flip frame
        this.scale.x = -1;
    }
    // body touches left wall
    else if (this.body.touching.left || this.body.blocked.left) 
    {
        // move right
        this.body.velocity.x = Zombie.speed; 
        // flip frame
        this.scale.x = 1;
    }
};

// Death Function for the Zombie: removes model and plays death animation
Zombie.prototype.die = function ()
{
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function ()
    {
        this.kill();
    }, this);
};

// Zombie movement speed
Zombie.speed = 75;

// Variables for Cliff operation
let result
let opened = false

// Plays animation of Cliff opening
Cliff.prototype.open = function ()
{
    this.animations.play('open')
}

// Update Function for the Cliff: all interactions with the Cliff
Cliff.prototype.update = function(){

    if(result && !opened){
        opened = true
        this.open()
    }

}

// Math Function: runs the Math Question Function and plays the chest's open animations 
Chest.prototype.open = function()
{
    
    do{
        result = mathProblem(difficulty)
    }while(!result)

    this.animations.play('open').onComplete.addOnce(function (){
        this.kill()
    },this)
};

// Collision Function: handles all the collisions between objects in the game except for Player interactions
PlayState._handleCollisions = function () 
{
    this.game.physics.arcade.collide(this.player, this.platforms); // Player & Terrain
    this.game.physics.arcade.collide(this.ghost, this.platforms); // Ghost & Terrain
    this.game.physics.arcade.collide(this.chest, this.platforms); // Chest & Terrain
    this.game.physics.arcade.collide(this.ghost, this.wall); // Ghost & Walking Limit
    this.game.physics.arcade.collide(this.ghost, this.platforms); // Ghost & Terrain
    this.game.physics.arcade.collide(this.zombie, this.wall); // Zombie & Walking Limit
    this.game.physics.arcade.collide(this.zombie, this.platforms); // Zombie & Terrain

    // tests for overlap between player and ghost
    this.game.physics.arcade.overlap(this.player, this.ghost, this._playerHitsEnemy, null, this);
    this.game.physics.arcade.overlap(this.player, this.zombie, this._playerHitsEnemy, null, this);
    this.game.physics.arcade.overlap(this.player, this.chest, this._playerHitsChest, null, this);
    this.game.physics.arcade.overlap(this.player, this.cliff,this._playerHitsCliff, null, this)
};

// Interaction between Player & Enemy
PlayState._playerHitsEnemy = function (player, enemy) 
{
    if(player.body.velocity.y > 0)// Player must be in the air and land on enemy to kill
    {
        player.bounce();
        enemy.die();
    }
    else // Game restarts current level
    {
        this.game.state.restart(true, false,{level:this.level});
    }
};

// Interaction between Player & Chest
PlayState._playerHitsChest = function (player, chest)
{
    if(player.body.velocity.y > 0) // Player must be jumping to activate
    {
        player.bounce();
        this.game.state.pause()
        chest.open(this.cliff);
        this.state.resume()
        
    }
}

// Interaction between Player & Cliff
PlayState._playerHitsCliff = function()
{
    if(opened){

        opened = false;
        result = false;
        this.state.restart(true, false, {level: this.level + 1})
    
    }
}

// Bind keys for Player movement
PlayState._handleInput = function () 
{
    if (this.keys.left.isDown) // Left arrow for left movement
    { 
        this.player.move(-1);
    }
    else if (this.keys.right.isDown) // Right arrow for right movement
    { 
        this.player.move(1);
    }
    else // Otherwise no movement
    {
        this.player.move(0);
    }
};

// Load level and place models 
PlayState._loadLevel = function(data) 
{
    this.platforms = this.game.add.group();
    this.ghost = this.game.add.group();
    this.zombie = this.game.add.group();
    this.wall = this.game.add.group();
    this.chest = this.game.add.group();
    this.cliff = this.game.add.group();
    this.wall.visible = false;

    console.log(this.level)
    // place platforms
    data.platforms.forEach(this._placePlatform, this);
    // place other models
    this._placeModels({player: data.player, ghost: data.ghost, zombie: data.zombie, chest:data.chest, cliff: data.cliff});

    const gravity = 1200;
    this.game.physics.arcade.gravity.y = gravity; 
};

// Place Invisible Walking Barriers
PlayState._placeWall = function(x, y, side)
{
    let sprite = this.wall.create(x, y, 'wall');
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);

    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

// Place platforms
PlayState._placePlatform = function(platform)
{
    let sprite = this.platforms.create(platform.x, platform.y, platform.image);
    this.game.physics.enable(sprite);
    
    this._placeWall(platform.x, platform.y, 'left');
    this._placeWall(platform.x + sprite.width, platform.y, 'right');
    
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;
};

// Place Animated models
PlayState._placeModels = function(data)
{
    data.ghost.forEach(function (ghost)// Place Ghost
    {
        let sprite = new Ghost(this.game, ghost.x, ghost.y);
        this.ghost.add(sprite);
    }, this);

    data.zombie.forEach(function (zombie)// Place Zombie
    {
        let sprite = new Zombie(this.game, zombie.x, zombie.y);
        this.zombie.add(sprite);
    }, this);

    data.chest.forEach(function(chest)// Place Chest
    {
        let sprite = new Chest(this.game, chest.x, chest.y);
        this.chest.add(sprite)
    }, this)

    data.cliff.forEach(function(cliff)// Place Cliff
    {
        let sprite = new Cliff(this.game, cliff.x, cliff.y);
        this.cliff.add(sprite)
    }, this)
    // Place Player
    this.player = new Player(this.game, data.player.x, data.player.y);
    this.game.add.existing(this.player);
};

// ============================ Game =================================

window.onload = function () 
{
    let game = new Phaser.Game(960, 675, Phaser.AUTO, 'game');
    game.state.add('mainMenu', mainMenuState);
    game.state.add('selectDifficulty', selectDifficultyState);
    game.state.add('play', PlayState);
    game.state.start('mainMenu');    
};
