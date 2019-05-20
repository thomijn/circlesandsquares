import { CST } from "../CST";


export class PlayScene extends Phaser.Scene {
    Keyboard: any;
    player!: Phaser.Physics.Arcade.Sprite;
    constructor() {
        super({
            key: CST.SCENES.PLAY,
        });
    }
    preload() {

        this.load.image("Dungeon", "./assets/image/tileset_dungeon.png");
        this.load.tilemapTiledJSON("mappy", "./assets/maps/level_01..json");

        this.load.spritesheet('dude',
            './assets/image/character.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    create() {

        let mappy = this.add.tilemap("mappy");

        let terrain = mappy.addTilesetImage("tile_set", "Dungeon");
        // let itemset = mappy.addTilesetImage("items");

        //layers

        let ground = mappy.createStaticLayer("Ground", [terrain], 0, 0).setDepth(0);
        let holes = mappy.createStaticLayer("Holes", [terrain], 0, 0).setDepth(1);

        let blocks = mappy.createStaticLayer("Blocks", [terrain], 0, 0).setDepth(2);
        let walls = mappy.createStaticLayer("Walls", [terrain], 0, 0).setDepth(3);
        let entrance = mappy.createStaticLayer("Entrance", [terrain], 0, 0).setDepth(4);




        this.player = this.physics.add.sprite(100, 450, 'dude').setDepth(5);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
            frameRate: 10,

        });

        this.Keyboard = this.input.keyboard.addKeys("W, A, S, D")

    }

    update(time: number, delta: number) {

        if (this.Keyboard.D.isDown === true) {
            this.player.setVelocityX(64);
            this.player.play("walk", true);
            this.player.flipX = false;
        } 
        
        if(this.Keyboard.A.isDown === true) {
            this.player.setVelocityX(-64);
            this.player.play("walk", true);
            this.player.flipX = true;
        }

        if(this.Keyboard.W.isDown === true) {
            this.player.setVelocityY(-64);
            this.player.play("walk", true);
        }

        if(this.Keyboard.S.isDown === true) {
            this.player.setVelocityY(64);
            this.player.play("walk", true);
        }

        if(this.Keyboard.A.isUp && this.Keyboard.D.isUp){
            this.player.setVelocityX(0);
        }

        
        if(this.Keyboard.S.isUp && this.Keyboard.W.isUp){
            this.player.setVelocityY(0);
        }

        

    }
}