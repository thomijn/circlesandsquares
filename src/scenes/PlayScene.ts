import { CST } from "../CST";
import { characterBait } from "../objects/characterBait"
import { pushBlock } from "../objects/pushBlock"
import { enemy } from "../objects/enemy";
import { bait } from "../objects/bait";

export class PlayScene extends Phaser.Scene {
    private player: characterBait;
    private blockGroup: Phaser.Physics.Arcade.Group
    private bait: bait
    private baitCounter: number
    private keyObj: Phaser.Input.Keyboard.Key
    private Keyboard: any
    private canpickup: boolean;
    private enemyGroup: Phaser.Physics.Arcade.Group;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor() {
        super({
            key: CST.SCENES.PLAY
        });
        document.addEventListener("joystick1button1", () => this.placeBait())
        this.baitCounter = 1;
        this.canpickup = false
    }

    create(): void {
        //map
        let mappy = this.add.tilemap("mappy");
        let terrain = mappy.addTilesetImage("dungeonTileset", "Dungeon");

        //layers
        let ground = mappy.createStaticLayer("ground", [terrain], 0, 0).setDepth(0);
        let wall = mappy.createStaticLayer("wall", [terrain], 0, 0).setDepth(2);
        let top = mappy.createStaticLayer("top", [terrain], 0, 0).setDepth(1);

        // pushable blocks
        let pushableBlocks = [];
        pushableBlocks = mappy.createFromObjects("pushBlocks", 65, { key: "pushableBlocks" })

        this.blockGroup = this.physics.add.group({ runChildUpdate: true })

        for (let i = 0; i < pushableBlocks.length; i++) {
            this.blockGroup.add(new pushBlock(this, pushableBlocks[i].x, pushableBlocks[i].y))
        }

        //enemies
        let enemies = [];
        enemies = mappy.createFromObjects("enemies", 66, { key: "enemies" })

        this.enemyGroup = this.physics.add.group({ runChildUpdate: true })

        for (let i = 0; i < enemies.length; i++) {
            this.enemyGroup.add(new enemy(this, enemies[i].x, enemies[i].y))
        }
        this.enemyGroup.setVelocityX(100)

        // players
        this.player = new characterBait(this)

        //map collisions
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, top);

        this.physics.add.collider(this.player, this.blockGroup, this.bounceWall, null, this)
        this.physics.add.collider(this.player, this.enemyGroup, this.gameOver, null, this)

        this.physics.add.collider(this.enemyGroup, ground);
        this.physics.add.collider(this.enemyGroup, wall);
        this.physics.add.collider(this.enemyGroup, top, this.collidewall, null, this);

        this.physics.add.collider(this.enemyGroup, this.blockGroup, this.enemyDie, null, this)

        this.physics.add.collider(this.blockGroup, top)


        //tile property collisions
        ground.setCollisionByProperty({ collides: true });
        wall.setCollisionByProperty({ collides: true });
        top.setCollisionByProperty({ collides: true });

        this.keyObj = this.input.keyboard.addKey('B');  // Get key object
        this.Keyboard = this.input.keyboard.addKeys("F");
    }

    placeBait() {
        setTimeout(() => {
            this.canpickup = true
        }, 1000);
        if (this.baitCounter !== 0) {
            this.bait = new bait(this, this.player.x, this.player.y)
            this.baitCounter--
        }
        this.physics.add.overlap(this.player, this.bait, this.pickupBait, null, this)
        this.physics.add.overlap(this.enemyGroup, this.bait, this.eatBait, null, this)
    }

    pickupBait() {
        if (this.input.keyboard.checkDown(this.keyObj, 0) && this.canpickup == true) {
            this.bait.destroy(true)
            this.baitCounter++
            this.canpickup = false
            console.log("works")
        }
    }

    eatBait(b: bait, e: enemy) {

        e.setVelocity(0)

        setTimeout(() => {
            this.bait.destroy()
        }, 2500);

        setTimeout(() => {
            e.setVelocity(100)
            this.canpickup = false
            this.baitCounter++
        }, 3000);
    }

    bounceWall(p: characterBait, b: pushBlock): void {
        //move block when pushed
        if (b.body.touching.left && this.Keyboard.F.isDown) {
            b.setVelocityX(175)
        } else if (b.body.touching.right && this.Keyboard.F.isDown) {
            b.setVelocityX(-175)
        } else if (b.body.touching.up && this.Keyboard.F.isDown) {
            b.setVelocityY(175)
        } else if (b.body.touching.down && this.Keyboard.F.isDown) {
            b.setVelocityY(-175)
        }
    }

    collidewall(e: enemy) {

        setTimeout(() => {
            e.collideWall()
        }, 500);
    }

    gameOver() {
        this.scene.start("gameover");
    }

    enemyDie(e: enemy, b: pushBlock) {
        if (b.body.velocity.x !== 0 || b.body.velocity.y !== 0) {
            e.destroy()

            var particles = this.add.particles('blood');

            this.emitter = particles.createEmitter({
                lifespan: 300,
                speed: 75,
                scale: { start: 0.1, end: 0.05 },
                x: e.x,
                y: e.y + 20
            });
            
            setTimeout(() => {
                this.emitter.stop()
            }, 300);
            

            // slow block down
            setTimeout(() => {
                b.setVelocity(0);
            }, 150);
        } else {
            this.collidewall(e)
        }


    }

    update() {
        if (this.input.keyboard.checkDown(this.keyObj, 1000)) {
            this.placeBait()
        }

        this.player.update()
    }
}
