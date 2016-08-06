// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
//here the two numbers specify the width and height of the canvas in the game
var score;

var labelScore;
var player;
var gapStart = game.rnd.integerInRange(1, 6);

function changeScore(){
  score=300;
  labelScore.setText(score.toString);
}

function clickHandler(event) {
    //alert("The position is: " + event.x + "," + event.y);
    game.add.sprite(event.x, event.y, "playerImg");
}


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/jamesBond.gif");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe.png");
}

function spaceHandler() {
    game.sound.play("score");
}

function moveRight(){
  player.x=player.x+10;
}

function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count=0; count<8; count=count+1) {
        if(count != gapStart && count != gapStart + 1) {
            game.add.sprite(0, count * 50, "pipeBlock");
        }
    }
}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player=game.add.sprite(10, 270, "playerImg");

    game.physics.arcade.enable(player);

    game.stage.setBackgroundColor("#F3D3A3");
    game.add.text(500,380, "Welcome to my game");
    game.input.onDown.add(clickHandler);
    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
    labelScore = game.add.text(20,20,"0");
    player.x=150;
    player.y=200;
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                   .onDown.add(moveRight);
    generatePipe();


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}
