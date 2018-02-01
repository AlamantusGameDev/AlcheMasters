import seedRandom from 'seedrandom';
import moment from 'moment';

import GAME from '../constants/game';
import { closestMultipleOf } from '../classes/helper';
import { Geolocation } from '../classes/geolocation';

import { Player } from '../models/player';
import { MapIcon } from '../models/map-icon';

export class MapState extends Phaser.State {
  constructor (...args) {
    super(...args);

    this.position = null;
    this.timesRun = 0;

    this.icons = [];
  }

  create () {
    Geolocation.getCoords((coords) => {
      this.position = coords;
      console.log(this.position);
      this.generate();
    });
  }

  generate () {
    const now = moment.utc();
    const year = now.year();
    const month = now.month() + 1;
    const day = now.date();
    const latitudeInt = Math.round(this.position.latitude * 100);
    const longitudeInt = Math.round(this.position.longitude * 100);

    const seed = (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(latitudeInt).toString().padStart(5, '0')
      + (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(longitudeInt).toString().padStart(5, '0')
      + year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
    console.log('seed', seed);

    const random = seedRandom(seed);
    const hour = now.hour();
    // console.log('hour', hour);
    const minute = now.minute();
    // console.log('minute', minute);
    const generationsToday = Math.floor(((hour * 60) + minute) / 5);
    console.log('generationsToday', generationsToday);

    console.log('curTime', now.format('h:mm:ss a'));
    for (let i = 0; i < generationsToday; i++) {
      random(); // Run random() to get it to the right seeded number
      if (i >= generationsToday - 3) {
        const minutesAgo = (generationsToday - (i + 1)) * 5;
        const timeXMinutesAgo = moment.utc(now).subtract(minutesAgo, 'minutes');
        const roundedMinute = Math.floor(timeXMinutesAgo.minute() / 5) * 5;
        const genTime = timeXMinutesAgo.minute(roundedMinute).second(0);
        console.log('genTime', genTime.format('h:mm:ss a'));
        const icon = new MapIcon(this.game, i, this.icons.length, genTime);
        this.icons.push(icon);
      }
    }
    console.log(this.icons);
  }

  update () {
    // if (this.position !== null) {
    //   console.log(this.position);
    // }
  }

  render () {
    // this.game.debug.body(this.player);
  }

  shutdown () {
    this.icons.forEach(icon => {
      icon.destroy();
    });
    this.icons = [];
  }
}
