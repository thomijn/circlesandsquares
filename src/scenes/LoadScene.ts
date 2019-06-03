import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    });
  }
  init() {}
  loadImages() {
    this.load.image("play_button", require("../assets/image/play_button2.png"));
    this.load.image(
      "options_button",
      require("../assets/image/options_button2.png")
    );
    this.load.image("background", require("../assets/image/background2.jpg"));
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

    this.loadImages();
    //load image, spritesheet, sound
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });

    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on("complete", () =>  {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        
        this.scene.start(CST.SCENES.MENU);
    });

    //simulate large load
    for (let i = 0; i < 200; i++) {
      this.load.spritesheet("cat" + i, "./assets/cat.png", {
        frameHeight: 32,
        frameWidth: 32
      });
    }
  }

  create() {}
}
