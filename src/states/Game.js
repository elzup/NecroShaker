import Phaser from 'phaser';

class Game extends Phaser.State {

  constructor() {
    super();
    this.map = null;
    this.layer = null;
    this.player = null;
    this.controls = null;
    this.lastKey = null;

    this.loopTime = Phaser.Timer.SECOND * 0.8;

    this.tileSize = 32;
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  preload() {
    this.load.baseURL = './assets/';
    const image_path = 'images/';
    this.load.tilemap('map', 'tile_properties.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', image_path + 'tiles.png');

    // player
    this.load.spritesheet('player', 'images/player1.png', this.tileSize, this.tileSize);

    // sound
    this.load.audio('sfx', 'sounds/mix.mp3');
  }

  create() {
    this.stage.backgroundColor = '#787878';

    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tile-set', 'tiles');
    this.map.createLayer('tile-layer');

    // this.player = new Phaser.TilemapLayer(this, this.map, 0, this.tileSize, this.tileSize, 'player');
    // this.player.loadTexture('player');
    this.player = this.add.sprite(this.tileSize, this.tileSize, 'player');
    this.player.anchor.setTo(0, 0);
    this.player.position.setTo(0, 0);
    this.player.animations.add('idle', [0, 0, 1, 1], 1, true);
    this.player.animations.add('jump', [2], 1, true);
    this.player.animations.add('run', [4], 1, true);
    this.player.direction = Phaser.NONE;
    this.player.movable = false;
    this.controls = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
    };

    this.fx = this.add.audio('sfx');
    this.fx.allowMultiple = true;
    this.fx.addMarker('tic', 9.0, 0.1);
    this.time.events.loop(this.loopTime, this.everyTic, this);
  }

  everyTic() {
    this.fx.play('tic');
    this.player.movable = true;
  }

  update() {
    if (!this.player.movable) {
      return;
    }
    if (this.lastKey && this.lastKey.isDown) {
      return;
    }
    this.lastKey = null;
    this.player.direction = Phaser.NONE;
    if (this.controls.up.isDown) {
      this.player.y -= this.tileSize;
      this.player.direction = Phaser.UP;
      this.lastKey = this.controls.up;
    } else if (this.controls.down.isDown) {
      this.player.y += this.tileSize;
      this.player.direction = Phaser.DOWN;
      this.lastKey = this.controls.down;
    } else if (this.controls.left.isDown) {
      this.player.x -= this.tileSize;
      this.player.direction = Phaser.LEFT;
      this.lastKey = this.controls.left;
    } else if (this.controls.right.isDown) {
      this.player.x += this.tileSize;
      this.player.direction = Phaser.RIGHT;
      this.lastKey = this.controls.right;
    } else {
      return;
    }
    this.player.movable = false;
  }
}

export default Game;
