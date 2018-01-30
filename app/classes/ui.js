import UICONST from '../constants/ui';
import Helper from './helper';

export class UI {
    constructor (name, state) {
        this.name = name;
        this.state = state;

        // UIs are hidden/inactive by default.
        this.isActive = false;

        if (!this.state.hasOwnProperty('uiElements')) {
            this.state.uiElements = [];
        }
        this.state.uiElements.push(this);
        this.allBitmapData = [];

        this.uiGroup = this.state.add.group();
        this.updateVisibility();

        this.setup();
    }

    setup () {
        // Create the buttons in here this method from the child UI classes.
        // See app/models/guis/main-screen.js for an example.
    }

    changeState (stateName) {
        this.state.game.state.start(stateName);
    }

    show () {
        this.isActive = true;

        this.updateVisibility();
    }

    hide () {
        this.isActive = false;

        this.updateVisibility();
    }

    updateVisibility () {
        this.uiGroup.visible = this.isActive;
    }

    addButton (x, y, imageKey, callback = () => {}, {
        overFrame = undefined,
        outFrame = undefined,
        downFrame = undefined,
        upFrame = undefined,
        anchorX = UICONST.DEFAULT_BUTTON_ANCHOR.x,
        anchorY = UICONST.DEFAULT_BUTTON_ANCHOR.y,
    } = {}) {
        let button = this.state.add.button(x, y, imageKey, callback, this.state, overFrame, outFrame, downFrame, upFrame, this.uiGroup);
        button.anchor.setTo(anchorX, anchorY);
        button.mouseisOver = false;

        // Set the button's neutral tint to just a little bit darker than its regular shade.
        let neutralTint = 0xDDDDDD,
        hoverTint = 0xFFFFFF,
        clickTint = 0xAAAAAA;
        button.tint = neutralTint;

        button.onInputOver.add(() => {
            button.mouseisOver = true;
            button.tint = hoverTint;
        });
        button.onInputOut.add(() => {
            button.mouseisOver = false;
            button.tint = neutralTint;
        });
        button.onInputDown.add(() => {
            button.tint = clickTint;
        });
        button.onInputUp.add(() => {
            if (button.mouseisOver) {
                button.tint = hoverTint;
            }
        });

        return button;
    }

    addText (x, y, text, {
        font = UICONST.DEFAULT_TEXT_FONT,
        size = UICONST.DEFAULT_FONT_SIZE,
        color = UICONST.DEFAULT_TEXT_COLOR,
        outlineColor = UICONST.DEFAULT_TEXT_OUTLINE_COLOR,
        outlineThickness = 0,
        align = UICONST.DEFAULT_TEXT_ALIGNMENT,
        anchorX = UICONST.DEFAULT_TEXT_ANCHOR.x,
        anchorY = UICONST.DEFAULT_TEXT_ANCHOR.y,
    } = {}) {
        let style = {
            font: font,
            fontSize: size,
            align: align,
            fill: color,
            stroke: outlineColor,
            strokeThickness: outlineThickness,
        };
        let webText = this.state.add.text(x, y, text, style, this.uiGroup);
        webText.align = align;
        webText.anchor.setTo(anchorX, anchorY);

        return webText;
    }

    addTextButton (x, y, text, callback = () => {}, {
        buttonColor = UICONST.DEFAULT_TEXTBUTTON_COLOR,
        textColor = UICONST.DEFAULT_TEXTBUTTON_TEXT_COLOR,
        font = UICONST.DEFAULT_TEXTBUTTON_FONT,
        fontSize = undefined,
        anchorX = UICONST.DEFAULT_BUTTON_ANCHOR.x,
        anchorY = UICONST.DEFAULT_BUTTON_ANCHOR.y,
        buttonWidth = undefined,
        buttonHeight = undefined,
        buttonPaddingScale = UICONST.DEFAULT_BUTTON_PADDING_SCALE,
        buttonRadius = UICONST.DEFAULT_BUTTON_RADIUS,
    } = {}) {
        let buttonText = this.addText(0, 0, text, {
            font: font,
            size: fontSize,
            color: textColor,
            anchorX: anchorX,
            anchorY: anchorY,
            outlineThickness: 1,
        });

        if (typeof buttonPaddingScale === 'number') {
            buttonPaddingScale = {
                horizontal: buttonPaddingScale,
                vertical: buttonPaddingScale,
            };
        } else {
            var defaultPadding = {
                horizontal: UICONST.DEFAULT_BUTTON_PADDING_SCALE,
                vertical: UICONST.DEFAULT_BUTTON_PADDING_SCALE,
            };
            for (var side in defaultPadding) {
                buttonPaddingScale[side] = buttonPaddingScale[side] || defaultPadding[side];
            }
        }
        // (1 + buttonPaddingScale) saves some math space while allowing buttonPaddingScale to be a number < 1;
        let bitmapButtonWidth = (buttonWidth) ? buttonWidth : (buttonText.width * (1 + buttonPaddingScale.horizontal)),
            bitmapButtonHeight = (buttonHeight) ? buttonHeight : (buttonText.height * (1 + buttonPaddingScale.vertical));

        // create a new bitmap data object
        let bitmapData = this.state.add.bitmapData(bitmapButtonWidth, bitmapButtonHeight);
        this.allBitmapData.push(bitmapData);

        // draw to the canvas context like normal
        // bitmapData.ctx.beginPath();
        bitmapData.ctx.fillStyle = buttonColor;
        Helper.roundRect(bitmapData.ctx, 0, 0, bitmapButtonWidth, bitmapButtonHeight, buttonRadius);

        // use the bitmap data as the texture for the sprite
        let button = this.addButton(x, y, bitmapData, callback, {
            anchorX: anchorX,
            anchorY: anchorY,
        });

        button.addChild(buttonText);
        buttonText.bringToTop();

        return button;
    }
}