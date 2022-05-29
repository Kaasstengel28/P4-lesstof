import * as PIXI from "pixi.js"

export class Player extends PIXI.Sprite {
    speedx = 0;
    speedy = 0;

    constructor(texture: PIXI.Texture) {
        super(texture)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        //de positie van de bubbels wordt hier bepaalt
        this.x = 200;
        this.y = 400;

        this.scale.set(0.4 + 0.2)

        // let area = this.getBounds()
        // let greenbox = new PIXI.Graphics()
        // greenbox.lineStyle(2, 0x33FF33, 1)
        // greenbox.drawRect(0, 0, area.width, area.height)
        // this.addChild(greenbox)
    }

    update(delta: number) {
        this.x += this.speedx
        this.y += this.speedy    

        if (this.x > 2000) {
            this.x = -100;
        } else if (this.x < -100) {
            this.x = 2000
        } else if (this.y < -20) {
            this.x = -100;
            this.y =  150;
        }
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.speedx = -3
                break
            case "D":
            case "ARROWRIGHT":
                this.speedx = 3
                break
            case "W":
            case "ARROWUP":
                this.speedy = -3
                break
            case "S":
            case "ARROWDOWN":
                this.speedy = 3
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
            case "D":
            case "ARROWRIGHT":
                this.speedx = 0
                break;
            case "W":
            case "ARROWUP":
            case "S":
            case "ARROWDOWN":
                this.speedy = 0
                break
        }
    }
}
