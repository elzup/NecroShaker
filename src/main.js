require('pixi.js');
require('p2');
import Phaser from 'phaser';
import Pacman from './states/pacman';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'NecroShaker-game');
game.state.add('Game', Pacman, true);

game.state.start('boot');
