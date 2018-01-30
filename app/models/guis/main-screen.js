import {UI} from '../../classes/ui';

export class MainScreen extends UI {
  constructor (state) {
    super('MainScreenGUI', state);
  }

  setup () {
    let game = this.state.game;

    let mainText = this.addText(game.width / 2, game.height * 0.25, 'Phaser Example', {
      font: 'TitleFont',
      size: 48,
    });

    let mainButton = this.addTextButton(game.width / 2, game.height / 2, 'Play', () => {
      this.changeState('Example');
    }, {
      fontSize: 20,
      buttonRadius: {
        tl: 15,
        br: 15,
      },
      buttonPaddingScale: {
        vertical: 0.1,
        horizontal: 0.3,
      },
    });
  }
}