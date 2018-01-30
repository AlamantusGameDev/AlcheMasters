window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

import SuperEventEmitter from 'super-event-emitter';

export class Game extends Phaser.Game {
  constructor(...args) {
    super(...args);
    SuperEventEmitter.mixin(this);
  }
}
