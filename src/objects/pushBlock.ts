import { PlayScene } from "../scenes/PlayScene"

export class pushBlock extends Phaser.Physics.Arcade.Sprite {

    private playScene: PlayScene
 
    constructor(scene: PlayScene, x:number, y:number) {
        super(scene, x, y, "pushBlock")

        this.playScene = scene

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