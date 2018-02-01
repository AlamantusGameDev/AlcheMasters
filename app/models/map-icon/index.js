import seedRandom from 'seedrandom';
import moment from 'moment';

import GAME from '../../constants/game';
import { closestMultipleOf } from '../../classes/helper';

export class MapIcon extends Phaser.Image {
  constructor(game, generation = 0, index = 0, genTime = null) {
    super(game, 0, 0, 'map-icon');

    this.generation = generation;
    this.index = index;
    this.genTime = genTime;

    this.anchor.set(0.5, 0.5);

    this.random = seedRandom(this.seed);

    this.loadTexture('player');

    this.x = Math.round((this.game.width - this.width) * this.random()) + this.width;
    this.y = Math.round((this.game.height - this.height) * this.random()) + this.height;
    const lifetime = (this.random() * (GAME.MAX_LIFETIME - GAME.MIN_LIFETIME)) + GAME.MIN_LIFETIME;
    this.deathTime = moment.utc(this.genTime).add(lifetime, 'minutes');
    console.log('deaTime', this.deathTime.format('h:mm:ss a'));
    // this.moveSpeedX = this.random() * 3;
    // this.moveSpeedY = this.random() * 3;

    this.game.add.existing(this);
  }

  get seed () {
    const year = this.genTime.year();
    const month = this.genTime.month() + 1;
    const day = this.genTime.date();
    const hour = this.genTime.hour();
    const minute = closestMultipleOf(5, this.genTime.minute());

    return this.generation.toString().padStart(3, '0') + this.index.toString().padStart(2, '0')
      + year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0')
      + hour.toString().padStart(2, '0') + minute.toString().padStart(2, '0');
  }

  update () {
    // console.log('x', this.x, 'y', this.y);
    // this.x += this.moveSpeedX;
    // this.y += this.moveSpeedY;
    if (moment.utc().isAfter(this.deathTime)) {
      this.kill();
    }
  }
}
