import { PlayScene } from "../scenes/PlayScene"
import { OpeningScene } from "../scenes/OpeningScene";

export class pushBlock extends Phaser.Physics.Arcade.Sprite {
 
    constructor(scene: Phaser.Scene, x:number, y:number) {
        super(scene, x, y, "pushBlock")


        this.scene.add.existing(this)
        this.setDepth(5)
        this.addPhysics()
        this.setImmovable(true)
    }

    private addPhysics() {
        this.scene.physics.add.existing(this);
        this.setSize(this.displayWidth, this.displayHeight)
        this.setCollideWorldBounds(true)
    }
}