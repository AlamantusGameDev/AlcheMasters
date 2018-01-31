import seedRandom from 'seedrandom';

import GAME from '../constants/game';
import { closestMultipleOf } from '../classes/helper';
import { Geolocation } from '../classes/geolocation';

export class MapState extends Phaser.State {
  constructor (...args) {
    super(...args);

    this.position = null;
    this.timesRun = 0;
  }

  create () {
    Geolocation.getCoords((coords) => {
      this.position = coords;
      console.log(this.position);
      this.generate();
    });
  }

  generate () {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const latitudeInt = Math.round(this.position.latitude * 100);
    const longitudeInt = Math.round(this.position.longitude * 100);

    const seed = (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(latitudeInt).toString().padStart(5, '0')
      + (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(longitudeInt).toString().padStart(5, '0')
      + year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
    console.log('seed', seed);

    const random = seedRandom(seed);
    const hour = date.getUTCHours();
    console.log('hour', hour);
    const minute = date.getUTCMinutes() + 1;
    console.log('minute', minute);
    const generationsToday = Math.floor(((hour * 60) + minute) / 5);
    console.log('generationsToday', generationsToday);

    for (let i = 0; i < generationsToday; i++) {
      const randomNumber = random();
      if (i >= generationsToday - 3) {
        console.log(randomNumber);
      }
    }
  }

  update () {
    // if (this.position !== null) {
    //   console.log(this.position);
    // }
  }

  render () {
    // this.game.debug.body(this.player);
  }
}
