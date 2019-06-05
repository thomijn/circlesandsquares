import { CST } from "../CST";

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: "gameover"
        });
    }

    create() {
        let playAgainButton = this.add.text(400, 420, 'CLICK TO PLAY AGAIN ', { fontFamily: 'Arial', fontSize: 22, color: '#ff3434' }).setOrigin(0.5).setDepth(5)

        playAgainButton.setInteractive();

        playAgainButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        });

        this.add
            .image(0, 0, "background")
            .setOrigin(0)
            .setDepth(0);
    }

}