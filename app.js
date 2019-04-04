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
}

let game = new Phaser.Game(config)

function preload() {
    this.load.image('layer_08', 'images/layer_08.png')
    this.load.image('layer_07', 'images/layer_07.png')
    this.load.image('layer_06', 'images/layer_06.png')
    this.load.image('layer_05', 'images/layer_05.png')
    this.load.image('layer_04', 'images/layer_04.png')
    this.load.image('layer_03', 'images/layer_03.png')
    this.load.image('layer_02', 'images/layer_02.png')    
    this.load.image('layer_01', 'images/layer_01.png')

    this.load.image('player', 'images/player.png')
    this.load.image('enemy', 'images/enemy.png')
    this.load.image('bullet', 'images/bullet.png')

    this.load.spritesheet('enemies', 'images/enemies.png', { frameWidth: 66, frameHeight: 47 })

}

function create() {    

    // enemies animation
    this.anims.create({
        key: 'amam',
        frames: this.anims.generateFrameNumbers('enemies', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    class Enemy extends  Phaser.GameObjects.Sprite {
        constructor (scene) {
            super(scene, 0, 0, 'enemies')
            this.speed = Phaser.Math.Between(3.2, 5.8)
            this.anims.play('amam')
        }
        startOnPath() {
            this.setPosition(1024, Phaser.Math.Between(20, 556))
        }        
        update(time, delta) {
            this.x -= this.speed
            if ((this.x < 0) || (this.y < 0))  {
                this.setActive(false)
                this.setVisible(false)
            }        
        }
    }

    class Bullet extends  Phaser.GameObjects.Image {
        constructor (scene) {
            super(scene, 0, 0, 'bullet')
            this.speed = Phaser.Math.GetSpeed(600, 1)
        }
        fire (x, y) {
            this.setPosition(x, y)
            this.setActive(true)
            this.setVisible(true)
        }
        update (time, delta) {
            this.x += this.speed * delta
            if (this.x > 1024) {
                this.setActive(false)
                this.setVisible(false)
            }
        }
    }

    // parallax
    this.bg_08 = this.add.tileSprite(512, 288, 1024, 576, 'layer_08')    
    this.bg_07 = this.add.tileSprite(512, 288, 1024, 576, 'layer_07')    
    this.bg_06 = this.add.tileSprite(512, 288, 1024, 576, 'layer_06')    
    this.bg_05 = this.add.tileSprite(512, 288, 1024, 576, 'layer_05')    
    this.bg_04 = this.add.tileSprite(512, 288, 1024, 576, 'layer_04')    
    this.bg_03 = this.add.tileSprite(512, 288, 1024, 576, 'layer_03')    
    this.bg_02 = this.add.tileSprite(512, 288, 1024, 576, 'layer_02')
    this.bg_01 = this.add.tileSprite(512, 288, 1024, 576, 'layer_01')

    // enemies group
    enemies = this.physics.add.group({
        classType: Enemy,
        runChildUpdate: true
    })
    // enemy reset respawn time
    this.nextEnemy = 0

    // bullets group
    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    })

    // input
    this.cursors = this.input.keyboard.createCursorKeys()
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
   
    // add player
    this.player = this.physics.add.sprite(50, 288, 'player')
    
    // collision player-enemy
    this.physics.add.collider(this.player, enemies)
    this.physics.add.overlap(this.player, enemies, killPlayer, null, this)

    // collision bullet-enemy    
    this.physics.add.collider(bullets, enemies)
    this.physics.add.overlap(bullets, enemies, killEnemy, null, this)
    
}

function update(time, delta) {
    // parallax
    this.bg_08.tilePositionX += .03
    this.bg_07.tilePositionX += .06
    this.bg_06.tilePositionX += .125
    this.bg_05.tilePositionX += .25
    this.bg_04.tilePositionX += .5
    this.bg_03.tilePositionX += 1
    this.bg_02.tilePositionX += 2
    this.bg_01.tilePositionX += 3    
    
    // movies player
    if (this.cursors.left.isDown) {
        this.player.x -= 2
    }
    else if (this.cursors.right.isDown) {
        this.player.x += 2
    }
    if (this.cursors.up.isDown) {
        this.player.y -= 2
    }
    else if (this.cursors.down.isDown) {
        this.player.y += 2
    }
    // fire
    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        let bullet = bullets.get()
        if (bullet) {
            bullet.fire(this.player.x, this.player.y)
        }
    }

    // respawn enemy
    if (time > this.nextEnemy) {        
        let enemy = enemies.get()
        if (enemy) {
            enemy.setActive(true)
            enemy.setVisible(true)
            // place enemy
            enemy.startOnPath()
            this.nextEnemy = time + 2000
        }       
    }
     
}

killPlayer = (player, enemy) => {
    player.rotation += 0.1
    player.body.setVelocityY(220)
    console.log('kill player!')
}

killEnemy = (bullet, enemy) => {

    bullet.setActive(false)
    bullet.setVisible(false)

    enemy.setActive(false)
    enemy.setVisible(false)

    console.log('kill enemy!')
}