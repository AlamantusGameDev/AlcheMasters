import GAME from '../constants/game';
import STATE_EVENTS from '../constants/state-events';

import {MainScreen} from '../models/guis/main-screen';

export class TitleState extends Phaser.State {
    constructor (...args) {
        super(...args);

        this.map = null;
        this.layer = null;
    }

    create () {
        this.gui = new MainScreen(this);
        this.gui.show();

        this.game.trigger(STATE_EVENTS.EXAMPLE_COMPLETED);
    }

    update () {
        // this.physics.arcade.collide(this.game.player, this.layer);
    }

    render () {
        // this.game.debug.body(this.game.player);
    }
}
