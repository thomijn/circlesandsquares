import { CST } from "../CST";
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {
    }
    create() { //creating the menu screen

        //create images (z order)

        

        let face = this.add.image(0, 0, "background").setOrigin(0).setDepth(0);
        
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1);

        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1);

    
        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        })

        optionsButton.setInteractive();

        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        })

    }
}