import { CST } from "../CST";

export class PlayScene extends Phaser.Scene {
    Keyboard: any;
    player!: Phaser.Physics.Arcade.Sprite;
    numberOfBait: number;
    baitTimer: number;
    bait!: Phaser.Physics.Arcade.Sprite;
    baitsgroup!: Phaser.GameObjects.Group;
    enemy!: Phaser.Physics.Arcade.Sprite;


    constructor() {
        super({
            key: CST.SCENES.PLAY

        });

        this.numberOfBait = 3;
        this.baitTimer = 1;
  

    }



    preload() {
        this.load.image("Dungeon", require("../assets/image/tileset_dungeon.png"));
        this.load.tilemapTiledJSON("mappy", require("../assets/maps/testmap.json"));

        this.load.spritesheet("dude", require("../assets/image/character.png"), {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("bait", require("../assets/image/Food.png"), {
            frameWidth: 16,
            frameHeight: 16
        });
    }
    create() {
       
        this.cameras.main.setSize(640, 480)
        this.cameras.main.setViewport(0,0,640,480);


        //map
        let mappy = this.add.tilemap("mappy",);
        let terrain = mappy.addTilesetImage("tileset_dungeon", "Dungeon");

        //layers
        let ground = mappy.createStaticLayer("ground", [terrain], 0, 0).setDepth(0);
        let wall = mappy.createStaticLayer("wall", [terrain], 0, 0).setDepth(1);
        let top = mappy.createStaticLayer("top", [terrain], 0, 0).setDepth(2);

        // player
        this.player = this.physics.add.sprite(144, 415, "dude").setDepth(5);
        this.enemy = this.physics.add.sprite(300, 350   , "dude").setDepth(5).setImmovable(true);

        //map collisions
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, top);

        this.physics.add.collider(this.enemy, ground);
        this.physics.add.collider(this.enemy, wall);
        this.physics.add.collider(this.enemy, top, this.collidewall, undefined, this);


       

        //tile property
        ground.setCollisionByProperty({ collides: true });
        wall.setCollisionByProperty({ collides: true });
        top.setCollisionByProperty({ collides: true });

        //animations
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("dude", { start: 3, end: 5 }),
            frameRate: 10
        });

        // this.add.grid(this.game.renderer.width/2, this.game.renderer.height/2, 640, 480, 32, 32, 0x057605);

        //keyboard input
        this.Keyboard = this.input.keyboard.addKeys("W, A, S, D, B, F");

        // bait group
        this.baitsgroup = this.add.group()

        this.enemy.setVelocityY(-100)

    }

    // collide(){
    //     if(this.Keyboard.F.isDown && this.enemy.body.touching.left){
    //          this.enemy.setVelocityX(128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.right){
    //         this.enemy.setVelocityX(-128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.up){
    //         this.enemy.setVelocityY(128)
    //     } else if(this.Keyboard.F.isDown && this.enemy.body.touching.down){
    //         this.enemy.setVelocityY(-128)
    //     }
    // }

    collidewall(){
        
        let direction = Phaser.Math.Between(1, 4)
        console.log(direction)
        if(direction == 1) {
            this.enemy.setVelocityY(-100)
            this.enemy.play("walk", true);
        } else if(direction == 2) {
            this.enemy.setVelocityY(100)
            this.enemy.play("walk", true);

        } else if(direction ==3) {
            this.enemy.setVelocityX(100)
            this.enemy.play("walk", true);


        } else{
            this.enemy.setVelocityX(-100)
            this.enemy.play("walk", true);

        }

       
    }

    update(time: number, delta: number) {
        // bait pickup
        if (
            this.physics.world.overlap(this.player, this.baitsgroup) &&
            this.Keyboard.B.isDown &&
            this.baitTimer == 1
        ) {
            this.numberOfBait++;
            console.log("works");
        }


        if (
            this.Keyboard.B.isDown &&
            this.numberOfBait > 0 &&
            this.baitTimer == 1 &&
            !this.physics.world.overlap(this.player, this.baitsgroup)
        ) {
            this.numberOfBait--;
            this.baitTimer = 0;
            this.baitsgroup.add(this.physics.add
                .sprite(this.player.x, this.player.y, "bait")
                .setDepth(5)
                .setScale(1.25)
                .setFrame(21)
                .setImmovable(true))

            setTimeout(() => {
                this.baitTimer = 1;
            }, 500);
        }

        // player movement
        if (this.Keyboard.W.isDown) {
            this.player.setVelocityY(-100);
            this.player.play("walk", true);
            this.player.flipX = false;
        }

        if (this.Keyboard.S.isDown) {
            this.player.setVelocityY(100);
            this.player.play("walk", true);
        }

        if (this.Keyboard.A.isDown) {
            this.player.setVelocityX(-100);
            this.player.play("walk", true);
            this.player.flipX = true;
        }

        if (this.Keyboard.D.isDown) {
            this.player.setVelocityX(100);
            this.player.play("walk", true);
            this.player.flipX = false;
        }

        if (this.Keyboard.A.isUp && this.Keyboard.D.isUp) {
            this.player.setVelocityX(0);
        }

        if (this.Keyboard.S.isUp && this.Keyboard.W.isUp) {
            this.player.setVelocityY(0);
        }

        if (this.physics.world.collide(this.player, this.enemy)) {
        }



    }
}