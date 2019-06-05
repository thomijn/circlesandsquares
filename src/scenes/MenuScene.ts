
import { Arcade } from "../utils/arcade"
import { MonsterHunter } from "../main"
import { CST } from "../CST";
export class MenuScene extends Phaser.Scene {

  private arcade!: Arcade

  constructor() {
    super({
      key: CST.SCENES.MENU
    });
  }
  init() { }
  create() {

    let g = this.game as MonsterHunter
    this.arcade = g.arcade

    document.addEventListener("joystick1button0", () => this.nextGame())


    let background = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setDepth(0);

    let playButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        "play_button"
      )
      .setDepth(2);

    let optionsButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 100,
        "options_button"
      )
      .setDepth(2);

    playButton.setInteractive();
    
    playButton.on("pointerup", () => {
      this.scene.start(CST.SCENES.PLAY);
    })


    optionsButton.setInteractive();

    optionsButton.on("pointerup", () => {
      //options
    });
  }

  public update(): void {
    for (let joystick of this.arcade.Joysticks) {
      joystick.update()
    }
  }

  private nextGame() {

    this.scene.start(CST.SCENES.PLAY)
  }

}
