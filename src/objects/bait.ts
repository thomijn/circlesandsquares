import { PlayScene } from "../scenes/PlayScene"

export class bait extends Phaser.Physics.Arcade.Sprite {

    private playScene: PlayScene
    private Keyboard: any


    constructor(scene: PlayScene, x:number , y:number) {
        super(scene, x, y , "bait", 50 )

        this.playScene = scene
        this.scene.add.existing(this)
        this.setDepth(5);
    }

}