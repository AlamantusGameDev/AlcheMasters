import seedRandom from 'seedrandom';
import moment from 'moment';

import GAME from '../../constants/game';

import { MapIcon } from './index';

export class IconGeneration {
  constructor(game, generation = 0, genTime = null, position = {}) {
    // super(game);

    // this.updateOnlyExistingChildren = true;
    
    this.game = game;
    this.generation = generation;
    this.genTime = genTime ? genTime : moment.utc();
    this.position = {
      latitude: position.hasOwnProperty('latitude') ? position.latitude : 0,
      longitude: position.hasOwnProperty('longitude') ? position.longitude : 0,
    };

    this.icons = [];

    this.random = seedRandom(this.seed);
    console.log('seed', this.seed);
    this.generateIcons();
  }

  get seed () {
    const year = this.genTime.year();
    const month = this.genTime.month() + 1;
    const day = this.genTime.date();
    const latitudeInt = Math.round(this.position.latitude * 100);
    const longitudeInt = Math.round(this.position.longitude * 100);

    return (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(latitudeInt).toString().padStart(5, '0')
      + (Math.sign(latitudeInt) >= 0 ? '+' : '-') + Math.abs(longitudeInt).toString().padStart(5, '0')
      + this.generation.toString().padStart(3, '0') + year.toString()
      + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
  }

  generateIcons () {
    const numberOfIcons = GAME.MAX_ICONS_PER_GENERATION * this.random();
    console.log('numberOfIcons', numberOfIcons);
    for (let i = 0; i < numberOfIcons; i++) {
      const icon = new MapIcon(this.game, this.generation, this.icons.length, this.genTime);
      this.icons.push(icon);
    }
  }
}
