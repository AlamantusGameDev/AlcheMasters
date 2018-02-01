import seedRandom from 'seedrandom';
import moment from 'moment';

import { closestMultipleOf } from '../classes/helper';

export class MapIcon extends Phaser.Image {
  constructor(game, generation = 0, index = 0, genTime = null) {
    super(game, 0, 0, 'map-icon');

    this.generation = generation;
    this.index = index;
    this.genTime = genTime;

    this.random = seedRandom(this.seed);

    this.loadTexture('player');

    this.x = Math.round(this.game.width * this.random());
    this.y = Math.round(this.game.height * this.random());
    this.deathTime = moment.utc(this.genTime).add(7 * this.random(), 'minutes');
    // this.lifespan = 10000 * this.random();
    console.log('deaTime', this.deathTime.format('h:mm:ss a'));

    game.add.existing(this);
  }

  get seed () {
    const now = moment.utc();
    const year = now.year();
    const month = now.month() + 1;
    const day = now.date();
    const hour = now.hour();
    const minute = closestMultipleOf(5, now.minute());

    return this.generation.toString().padStart(3, '0') + this.index.toString().padStart(2, '0')
      + year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0')
      + hour.toString().padStart(2, '0') + minute.toString().padStart(2, '0');
  }

  update () {
    if (moment.utc().isAfter(this.deathTime)) {
      this.kill();
    }
  }
}
