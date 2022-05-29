import * as PIXI from 'pixi.js'
//fotos importeren
import playerImage from "./images/shark.png"
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import backgroundImage from "./images/bruhground.png"
import deathImage from "./images/bones.png"
import foregroundImage from "./images/foreground.png"
//classes importeren
import { TilingSprite } from 'pixi.js'
import { Bubble, Fish } from "./entities"
import { Player } from "./gamer"
import { Foreground } from "./wereld"

export class game {
    //hier import hij de classes
    private fish: Fish;
    private fishes: Fish[];
    private bubble: Bubble;
    private bubbles: Bubble[];
    private player: Player;

    private foreground: Foreground;
    private background: PIXI.TilingSprite

    private pixi: PIXI.Application
    private loader: PIXI.Loader
    private mylistener: EventListener


    constructor() {
        this.fishes = [];
        this.bubbles = [];

        this.mylistener = (e: Event) => this.logMessage(e)
        window.addEventListener('click', this.mylistener)

        //het gameveld wordt aangemaakt
        this.pixi = new PIXI.Application({ width: 1200, height: 400 })
        document.body.appendChild(this.pixi.view)

        //laad de images alvast
        this.loader = new PIXI.Loader()
        this.loader
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', backgroundImage)
            .add('deadTexture', deathImage)
            .add('playerTexture', playerImage)
            .add('foreground', foregroundImage)
        //al zijn de images geladen roept hij de functie aan
        this.loader.load(() => this.doneLoading())
    }
    //hier  zet hij de event listeners uit
    private logMessage(e: Event) {
        console.log("hij is maar nu niet meer")
        window.removeEventListener("click", this.mylistener)
    }

    //zodra de sprites klaar zijn met laden begint hij met updaten
    private doneLoading() {
        //hier maakt hij de wereld (achtergrond/voorgrond) aan
        this.background = new PIXI.TilingSprite(this.loader.resources["waterTexture"].texture!, 1200, 400)
        this.pixi.stage.addChild(this.background)
        this.foreground = new Foreground(this.loader.resources["foreground"].texture!)
        this.pixi.stage.addChild(this.foreground)

        //hier maakt hij alle sprites aan
        this.fish = new Fish(this.loader.resources["fishTexture"].texture!, this.loader.resources["deadTexture"].texture!)
        this.pixi.stage.addChild(this.fish)
        this.player = new Player(this.loader.resources["playerTexture"].texture!)
        this.pixi.stage.addChild(this.player)
        this.bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
        this.pixi.stage.addChild(this.bubble)

        //hier zorgt hij ervoor dat er meerdere sprites komen
        for (let i = 0; i < 5; i++) {
            let temp = new Fish(this.loader.resources["fishTexture"].texture!, this.loader.resources["deadTexture"].texture!);
            this.pixi.stage.addChild(temp);
            this.fishes.push(temp);

            let temp2 = new Bubble(this.loader.resources["bubbleTexture"].texture!);
            this.pixi.stage.addChild(temp2);
            this.bubbles.push(temp2);
        }
        //dit zorgt ervoor dat de update functie kan updaten
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    private update(delta: number) {
        //hier checkt hij of de vissen dood zijn en geeft hij de juiste texture
        if (!this.fish.alive) {
            this.fish.texture = this.fish.deadTexture;
        }

        //dit update de vissen zodat ze bewegen
        this.fish.update(delta)
        for(let fish of this.fishes) {
            fish.update(delta)
            if(this.fishCollision(this.player, fish)) {
                console.log("fish = aangeraakt")
                // this.fish.alive = !this.fish.alive;
                fish.kill()
            }

        }

        //dit update de bubbels zodat ze bewegen
        for(let bubble of this.bubbles) {
            bubble.update(delta)
        }

        //dit update de ahtergrond en de player
        this.background.tilePosition.x += 0.25
        this.player.update(delta)

        //hier checkt hij voor de collision
        if (this.groundCollision(this.player, this.foreground)) {
            console.log("grond = aangeraakt")
            this.player.y = 220;
        }
    }
    //hier wordt ervoor gezorgt dat collision bestaat?
    private groundCollision(player: PIXI.Sprite, ground: PIXI.Sprite) {
        const bounds1 = player.getBounds()
        const bounds2 = this.foreground.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }


    private fishCollision(player: PIXI.Sprite, fish: PIXI.Sprite) {
        const bounds1 = player.getBounds()
        const bounds3 = this.fish.getBounds()

        return bounds1.x < bounds3.x + bounds3.width
            && bounds1.x + bounds1.width > bounds3.x
            && bounds1.y < bounds3.y + bounds3.height
            && bounds1.y + bounds1.height > bounds3.y;
    }
}

new game()