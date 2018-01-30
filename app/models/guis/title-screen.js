import { UI } from '../../classes/ui';

export class TitleScreen extends UI {
  constructor (state) {
    super('MainScreenGUI', state);
  }

  setup () {
    let game = this.state.game;

    let titleText = this.addText(game.width / 2, game.height * 0.25, 'AlcheMasters', {
      font: 'TitleFont',
      size: 48,
    });

    let playButton = this.addTextButton(game.width / 2, game.height / 2, 'Play', () => {
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