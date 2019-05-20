import { CST } from "../CST";


export class PlayScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: CST.SCENES.PLAY,
        });
    }
    preload() {
        
        this.load.image("Dungeon", "./assets/image/Dungeon.png");
        this.load.tilemapTiledJSON("mappy", "./assets/maps/mappy.json");
    }

    create() {
        
        let mappy = this.add.tilemap("mappy");

        let terrain = mappy.addTilesetImage("Dungeon", "Dungeon");
        // let itemset = mappy.addTilesetImage("items");

        //layers
        let botLayer = mappy.createStaticLayer("bottom", [terrain], 0, 0).setDepth(-2);
        let middleLayer = mappy.createStaticLayer("floor", [terrain], 0, 0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("wall", [terrain], 0, 0).setDepth(0);
        let objectsLayer = mappy.createStaticLayer("objects", [terrain], 0, 0).setDepth(1);


    }
}