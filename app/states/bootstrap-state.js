import STATE_EVENTS from '../constants/state-events';

import loaderImagePath from '../assets/images/loader.png';

export class BootstrapState extends Phaser.State {
    constructor (...args) {
        super(...args);
    }

    preload () {
        this.load.image('loader', loaderImagePath);
    }

    create () {
        this.game.stage.backgroundColor = '#000000';

        this.game.trigger(STATE_EVENTS.BOOTSTRAP_COMPLETED);
    }

    update () {

    }

    render () {

    }
}
