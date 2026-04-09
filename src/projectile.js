import { Sprite } from "pixi.js";

export class Projectile extends Sprite {
    constructor(texture) {
        super(texture);
        this.isAlive = true;
    }

    intersects(obj) {
        const tolerance = 10;
        return (
            this.x < obj.x + obj.width - tolerance
            && this.x + this.width > obj.x + tolerance
            && this.y < obj.y + obj.height - tolerance
            && this.y + this.height  > obj.y + tolerance
        );
    }
}