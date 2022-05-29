import * as PIXI from "pixi.js"

export class Fish extends PIXI.Sprite {
    private speed: number;
    public alive = true;
    public deadTexture: PIXI.Texture;
    private fishTexture: PIXI.Texture;
    
    constructor(texture: PIXI.Texture, deadTexture: PIXI.Texture) {

        super(texture)
        this.deadTexture = deadTexture;
        this.fishTexture = this.fishTexture;

        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerdown', () => this.fishClicked())
        
        //de kleur van de vissen wordt hier bepaalt
        const myfilter = new PIXI.filters.ColorMatrixFilter()
        this.filters = [myfilter]
        myfilter.hue(Math.random() * 360, false) 

        //de positie van de vissen wordt hier bepaalt
        this.x = Math.random() * 1200;
        this.y = Math.random() * 275;

        //hier wordt de snelheid van de vissen bepaalt
        this.speed = Math.random() * 3

        //hier wordt de groote van de vis bepaalt
        this.scale.set(0.4 + (Math.random() * 0.6))

        let area = this.getBounds()
        let greenbox = new PIXI.Graphics()
        greenbox.lineStyle(2, 0x33FF33, 1)
        greenbox.drawRect(0, 0, area.width, area.height)
        this.addChild(greenbox)
    }

    kill() {
        this.alive = false;
    }

    public update(delta: number) {
        //hier wordt de snelheid toegepast zodat ze bewegen
        if(this.alive == true) {
        this.x -= this.speed
        if (this.x < -150) {
            this.x = 1300;
            this.y = Math.random() * 275;
        }
        } else {
            this.y -= 1
            if(this.y < -150) {
                this.alive = true;
            }
        }
       
    }

    public fishClicked() {
        console.log(this.alive)
        this.alive = !this.alive;
        if(!this.alive) {
            this.texture = this.deadTexture;
        }
    }
}

export class Bubble extends PIXI.Sprite {
   private  speed: number;
    
    constructor(texture: PIXI.Texture) {
        super(texture)

        //de positie van de bubbels wordt hier bepaalt
        this.x = Math.random() * 1200;
        this.y = Math.random() * 400;

        //hier wordt de snelheid van de bubbels bepaalt
        this.speed = Math.random() * 0.5
    }

    update(delta: number) {
        //hier wordt de snelheid toegepast zodat ze bewegen
        this.y -= this.speed
        this.x -= Math.cos(this.y * 0.10)
            if (this.y < -50) {
                this.y = 420;
                this.x = Math.random() * 1200;
            }
    }
}