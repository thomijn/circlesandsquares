import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }
  init() {}
  loadImages() {
    this.load.image("play_button", require("../assets/image/play_button.png"));
    this.load.image(
      "options_button",
      require("../assets/image/options_button.png")
    );
    this.load.image("background", require("../assets/image/background.jpg"));
  }
  loadAudio() {
    this.load.setPath("../assets/audio");

    for (let prop in CST.AUDIO) {
      //@ts-ignore
      this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
    }
  }
  // @ts-ignore

  loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
    this.load.setPath("../assets/sprite");

    for (let prop in CST.SPRITE) {
      //@ts-ignore
      this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
    }
  }
  preload() {
    //load image, spritesheet, sound
    this.loadImages();

    //create loading bar
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff //white
      }
    });

    //simulate large load

    for (let i = 0; i < 100; i++) {
      this.load.spritesheet("cat" + i, "./assets/cat.png", {
        frameHeight: 32,
        frameWidth: 32
      });
    }

    this.load.on("progress", (percent: number) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50
      );
    });

    this.load.on("complete", () => {
      this.scene.start(CST.SCENES.MENU);
    });
  }
  create() {}
}
