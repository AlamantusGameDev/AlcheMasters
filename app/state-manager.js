import STATE_EVENTS from './constants/state-events';

import { BootstrapState } from './states/bootstrap-state';
import { LoadingState } from './states/loading-state';
import { TitleState } from './states/title-state';
import { ExampleState } from './states/example-state';

export class StateManager {
    constructor(game = null) {
        this.game = game;
        this.setupStates();
        this.setupNativeListeners();
        this.setupListeners();
    }

    setupStates() {
        this.game.state.add('Bootstrap', BootstrapState);
        this.game.state.add('Loading', LoadingState);
        this.game.state.add('Title', TitleState);
        this.game.state.add('Example', ExampleState);
    }

    setupNativeListeners() {
        this.game.state.onStateChange.add((newState, oldState) => {
            if (oldState) {
                // If the old state has bitmapData from UIs, clean it out.
                if (this.game.state.states[oldState].hasOwnProperty('uiElements')) {
                    this.game.state.states[oldState].uiElements.forEach((uiElement) => {
                        uiElement.allBitmapData.forEach((bitmapData) => {
                            bitmapData.destroy();
                        });
                    });
                }
            }

            console.debug('Entering new state: %s', newState);
        });
    }

    setupListeners() {
        this.game.on(STATE_EVENTS.BOOTSTRAP_COMPLETED, () => {
            this.game.state.start('Loading');
        });

        this.game.on(STATE_EVENTS.LOADING_COMPLETED, () => {
            this.game.state.start('Title');
        });
    }

    start() {
        this.game.state.start('Bootstrap');
    }
}
