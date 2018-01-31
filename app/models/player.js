import { Geolocation } from '../classes/geolocation';

export class Player extends Phaser.Sprite {
  constructor(game, x = 0, y = 0, key = 'player') {
    super(game, x, y, key);

    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.frame = 0;
  }

  update () {
    this.frame++;

    if (this.frame % 3000 === 0) {
      Geolocation.getCoords((coords) => console.log(coords));
    }

    this.x += 1;
  }
}
