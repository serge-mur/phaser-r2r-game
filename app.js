var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('layer_08', 'images/layer_08.png');
    this.load.image('layer_07', 'images/layer_07.png');
    this.load.image('layer_06', 'images/layer_06.png');
    this.load.image('layer_05', 'images/layer_05.png');
    this.load.image('layer_04', 'images/layer_04.png');
    this.load.image('layer_03', 'images/layer_03.png');
    this.load.image('layer_02', 'images/layer_02.png');    
    this.load.image('layer_01', 'images/layer_01.png');
}

function create() {
    this.bg_08 = this.add.tileSprite(512, 288, 1024, 576, 'layer_08');    
    this.bg_07 = this.add.tileSprite(512, 288, 1024, 576, 'layer_07');    
    this.bg_06 = this.add.tileSprite(512, 288, 1024, 576, 'layer_06');    
    this.bg_05 = this.add.tileSprite(512, 288, 1024, 576, 'layer_05');    
    this.bg_04 = this.add.tileSprite(512, 288, 1024, 576, 'layer_04');    
    this.bg_03 = this.add.tileSprite(512, 288, 1024, 576, 'layer_03');    
    this.bg_02 = this.add.tileSprite(512, 288, 1024, 576, 'layer_02');
    this.bg_01 = this.add.tileSprite(512, 288, 1024, 576, 'layer_01');
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
}