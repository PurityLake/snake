class Snake {
    constructor(x, y) {
        this.pos = { x: x, y: y };
        this.dir = { x: -1, y: 0 };
    }
}

const tileSize = 32;
const tilesX = 25;
const tilesY = 20;
const width = tileSize * tilesX;
const height = tileSize * tilesY;

function getXYFromIndex(x, y) {
    return [Math.floor(x * tileSize), Math.floor(y * tileSize)];
}

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var upKey = { };
var downKey = { };
var leftKey = { };
var rightKey = { };

var snake = { };
var newWidth = width;
var newHeight = height;
var widthDifference = 0;
var heightDifference = 0;
var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("snakehead", "assets/snakehead.png", {
        frameWidth: tileSize,
        frameHeight: tileSize
    });

    for (var i = 0; i < width; i++) {
        if (newWidth % tileSize != 0) {
            newWidth--;
        }
    }

    for (var i = 0; i < height; i++) {
        if (newHeight % tileSize != 0) {
            newHeight--;
        }
    }
    widthDifference = width - newWidth;
    heightDifference = height - newHeight;
}


function create() {
    var g = this.add.grid(widthDifference / 2, heightDifference / 2, newWidth, newHeight, tileSize, tileSize,
        0x550000).setAltFillStyle(0xFF0000).setOrigin(0, 0);
    
    var [x, y] = getXYFromIndex(snake.tileX, snake.tileY);
    snake = new Snake(x - tileSize / 2, y - tileSize / 2grunt);
    snake.tileX = Math.floor(tilesX / 2);
    snake.tileY = Math.floor(tilesY / 2);

    snake.sprite = this.add.sprite(x - tileSize / 2, y - tileSize / 2, "snakehead");
    snake.chompanim = this.anims.create({
        key: "chomp",
        frames: this.anims.generateFrameNumbers("snakehead", { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
    });

    snake.sprite.anims.play("chomp", true);

    upKey = this.input.keyboard.addKey("up");
    downKey = this.input.keyboard.addKey("down");
    leftKey = this.input.keyboard.addKey("left");
    rightKey = this.input.keyboard.addKey("right");
}

var t = 0;

function update(time, delta) {
    t += delta;
    if (t >= 1000) {
        snake.tileX += snake.dir.x;
        snake.tileY += snake.dir.y;
        var [x, y] = getXYFromIndex(snake.tileX, snake.tileY);
        snake.x = x - tileSize / 2;
        snake.y = y - tileSize / 2;
        snake.sprite.x = snake.x;
        snake.sprite.y = snake.y;
        t = 0;
    }
    if (upKey.isDown && snake.dir.y != 1) {
        snake.sprite.angle = 90;
        snake.dir.x = 0;
        snake.dir.y = -1;
    } else if (rightKey.isDown && snake.dir.x != -1) {
        snake.sprite.angle = 180;
        snake.dir.x = 1;
        snake.dir.y = 0;
    } else if (downKey.isDown && snake.dir.y != -1) {
        snake.sprite.angle = 270;
        snake.dir.x = 0;
        snake.dir.y = 1;
    } else if (leftKey.isDown && snake.dir.x != 1) {
        snake.sprite.angle = 0;
        snake.dir.x = -1;
        snake.dir.y = 0;
    }
}