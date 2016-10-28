import Phaser from 'phaser';

class Game extends Phaser.State {

  constructor() {
    super();
    this.map = null;
    this.layer = null;
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
  }

  create() {
    this.stage.backgroundColor = '#787878';

    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tile-set', 'tiles');
    this.map.createLayer('tile-layer');
  }

  checkKeys() {
    if (this.cursors.left.isDown && this.current !== Phaser.LEFT) {
      console.log('left');
    } else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT) {
      console.log('right');
    } else if (this.cursors.up.isDown && this.current !== Phaser.UP) {
      console.log('up');
    } else if (this.cursors.down.isDown && this.current !== Phaser.DOWN) {
      console.log('down');
    }
  }
}

export default Game;
