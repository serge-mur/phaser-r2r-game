let config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
            arcade: {
                // debug: true
            }
        },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('layer_08', 'images/layer_08.png');
    this.load.image('layer_07', 'images/layer_07.png');
    this.load.image('layer_06', 'images/layer_06.png');
    this.load.image('layer_05', 'images/layer_05.png');
    this.load.image('layer_04', 'images/layer_04.png');
    this.load.image('layer_03', 'images/layer_03.png');
    this.load.image('layer_02', 'images/layer_02.png');    
    this.load.image('layer_01', 'images/layer_01.png');

    this.load.image('player', 'images/player.png');
    this.load.image('enemy', 'images/enemy.png');
    this.load.image('bullet', 'images/bullet.png');

}

function create() {

    let Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.x += this.speed * delta;

            if (this.x > 1024)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.bg_08 = this.add.tileSprite(512, 288, 1024, 576, 'layer_08');    
    this.bg_07 = this.add.tileSprite(512, 288, 1024, 576, 'layer_07');    
    this.bg_06 = this.add.tileSprite(512, 288, 1024, 576, 'layer_06');    
    this.bg_05 = this.add.tileSprite(512, 288, 1024, 576, 'layer_05');    
    this.bg_04 = this.add.tileSprite(512, 288, 1024, 576, 'layer_04');    
    this.bg_03 = this.add.tileSprite(512, 288, 1024, 576, 'layer_03');    
    this.bg_02 = this.add.tileSprite(512, 288, 1024, 576, 'layer_02');
    this.bg_01 = this.add.tileSprite(512, 288, 1024, 576, 'layer_01');
    
    this.player = this.physics.add.sprite(50, 288, 'player');
    this.enemy = this.physics.add.sprite(300, 288, 'enemy');

    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.overlap(this.player, this.enemy, killPlayer, null, this);

    this.physics.add.collider([bullets], this.enemy);
    this.physics.add.overlap([bullets], this.enemy, killEnemy, null, this);

}

function update() {

    this.bg_08.tilePositionX += .03;
    this.bg_07.tilePositionX += .06;
    this.bg_06.tilePositionX += .125;
    this.bg_05.tilePositionX += .25;
    this.bg_04.tilePositionX += .5;
    this.bg_03.tilePositionX += 1;
    this.bg_02.tilePositionX += 2;
    this.bg_01.tilePositionX += 3;    
    
    if (this.cursors.left.isDown) {
        this.player.x -= 2;
    }
    else if (this.cursors.right.isDown) {
        this.player.x += 2;
    }
    if (this.cursors.up.isDown) {
        this.player.y -= 2;
    }
    else if (this.cursors.down.isDown) {
        this.player.y += 2;
    }

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        let bullet = bullets.get();

        if (bullet) {
            bullet.fire(this.player.x, this.player.y);
        }
    }      
}

function killPlayer(player, enemy) {
    this.player.rotation += 0.1;
    this.player.body.setVelocityY(220);
    console.log('kill player!');
}

function killEnemy(enemy, bullet) {

    bullet.setActive(false);
    bullet.setVisible(false);

    this.enemy.rotation += 0.1;
    this.enemy.body.setVelocityY(220);

    console.log('kill enemy!');
}