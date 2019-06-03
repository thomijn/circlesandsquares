import { CST } from "../CST";

export class PlayScene extends Phaser.Scene {
    Keyboard: any;
    player!: Phaser.Physics.Arcade.Sprite;
    numberOfBait: number;
    baitTimer: number;
    bait!: Phaser.Physics.Arcade.Sprite;
    baitsgroup!: Phaser.GameObjects.Group;
    enemy!: Phaser.Physics.Arcade.Sprite;
    block!: Phaser.Physics.Arcade.Sprite;
    block2!: Phaser.Physics.Arcade.Sprite;
    block3!: Phaser.Physics.Arcade.Sprite;

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

        this.load.spritesheet("enemy", require("../assets/image/enemy.png"), {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("block", require("../assets/image/block.png"), {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("bait", require("../assets/image/Food.png"), {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {

        //map
        let mappy = this.add.tilemap("mappy");
        let terrain = mappy.addTilesetImage("tileset_dungeon", "Dungeon");
        this.block = this.physics.add.sprite(176, 144, "block").setDepth(5).setImmovable(true);
        this.block2 = this.physics.add.sprite(528, 304, "block").setDepth(5).setImmovable(true);
        this.block3 = this.physics.add.sprite(300, 304, "block").setDepth(5).setImmovable(true);

        //layers
        let ground = mappy.createStaticLayer("ground", [terrain], 0, 0).setDepth(0);
        let wall = mappy.createStaticLayer("wall", [terrain], 0, 0).setDepth(1);
        let top = mappy.createStaticLayer("top", [terrain], 0, 0).setDepth(2);



        // player
        this.player = this.physics.add.sprite(144, 415, "dude").setDepth(5);
        this.enemy = this.physics.add.sprite(300, 350, "enemy").setDepth(5).setImmovable(true);
        this.enemy.flipX = true;

        //map collisions
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, top);

        this.physics.add.collider(this.enemy, ground);
        this.physics.add.collider(this.enemy, wall);
        this.physics.add.collider(this.enemy, top, this.collidewall, undefined, this);

        this.physics.add.collider(this.block, top)
        this.physics.add.collider(this.player, this.block, this.bounceWall, undefined, this)

        this.physics.add.collider(this.block2, top)
        this.physics.add.collider(this.player, this.block2, this.bounceWall, undefined, this)

        this.physics.add.collider(this.block3, top)
        this.physics.add.collider(this.player, this.block3, this.bounceWall, undefined, this)

        this.physics.add.collider(this.enemy, this.block, this.enemyDie, undefined, this)

        this.physics.add.collider(this.enemy, this.block2, this.enemyDie, undefined, this)

        this.physics.add.collider(this.enemy, this.block3)

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

        this.anims.create({
            key: "walkenemy",
            frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 3 }),
            repeat: -1,
            frameRate: 10
        });

        // this.add.grid(this.game.renderer.width/2, this.game.renderer.height/2, 640, 480, 32, 32, 0x057605);

        //keyboard input
        this.Keyboard = this.input.keyboard.addKeys("W, A, S, D, B, F");

        // bait group
        this.baitsgroup = this.add.group()

        //enemy walking
        this.enemy.setVelocityY(-100)

        // enemy animation
        this.enemy.play("walkenemy", true)

    }

    bounceWall() {

        //move block when pushed
        if (this.block.body.touching.left && this.Keyboard.F.isDown)
            this.block.setVelocityX(175)
        else if (this.block.body.touching.right && this.Keyboard.F.isDown) {
            this.block.setVelocityX(-175)
        } else if (this.block.body.touching.up && this.Keyboard.F.isDown) {
            this.block.setVelocityY(175)
        } else if (this.block.body.touching.down && this.Keyboard.F.isDown) {
            this.block.setVelocityY(-175)
        }

        if (this.block2.body.touching.left && this.Keyboard.F.isDown)
            this.block2.setVelocityX(175)
        else if (this.block2.body.touching.right && this.Keyboard.F.isDown) {
            this.block2.setVelocityX(-175)
        } else if (this.block2.body.touching.up && this.Keyboard.F.isDown) {
            this.block2.setVelocityY(175)
        } else if (this.block2.body.touching.down && this.Keyboard.F.isDown) {
            this.block2.setVelocityY(-175)
        }

        if (this.block3.body.touching.left && this.Keyboard.F.isDown)
            this.block3.setVelocityX(175)
        else if (this.block3.body.touching.right && this.Keyboard.F.isDown) {
            this.block3.setVelocityX(-175)
        } else if (this.block3.body.touching.up && this.Keyboard.F.isDown) {
            this.block3.setVelocityY(175)
        } else if (this.block3.body.touching.down && this.Keyboard.F.isDown) {
            this.block3.setVelocityY(-175)
        }
    }

    enemyDie() {
        if (this.block.body.velocity.x !== 0 || this.block.body.velocity.y !== 0) {
            this.enemy.destroy()

            // slow block down
            setTimeout(() => {
                this.block.setVelocity(0);
            }, 150);
        } else{
            this.collidewall()
        }
    }

    collidewall() {

        // AI movement
        let direction =  Phaser.Math.Between(1, 4)
        if (direction == 1) {
            this.enemy.setVelocityY(-100)
        } else if (direction == 2) {
            this.enemy.setVelocityY(100)
        } else if (direction == 3) {
            this.enemy.setVelocityX(100)
            this.enemy.flipX = false;

        } else {
            this.enemy.setVelocityX(-100)
            this.enemy.flipX = true;
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
