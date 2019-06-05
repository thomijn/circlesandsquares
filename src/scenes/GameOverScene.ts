import { CST } from "../CST";

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: "gameover"
        });
    }

    create() {
        let restartButton = this.add
            .image(
                this.game.renderer.width / 2,
                this.game.renderer.height / 2,
                "restart_button"
            )
            .setDepth(1);

        let menuButton = this.add
            .image(
                this.game.renderer.width / 2,
                this.game.renderer.height / 2 + 100,
                "menu_button"
            )
            .setDepth(1);

            restartButton.setInteractive();

            restartButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
            });

            menuButton.setInteractive();

            menuButton.on("pointerup", () => {
                this.scene.start(CST.SCENES.MENU);
            });

        this.add
        .image(0, 0, "background")
        .setOrigin(0)
        .setDepth(0);
    }

}