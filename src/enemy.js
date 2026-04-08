import { Sprite, Texture } from "pixi.js";

export class Enemy extends Sprite {
    /**
     * @param {Texture} texture pixi.js Texture object
     * @param {number} health 
     */

    constructor(texture) {
        super(texture);
        this.health = 20;
        this.isAlive = true;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    intersects(obj) {
        const tolerance = 70;
        return (
            this.x < obj.x + obj.width - tolerance
            && this.x + this.width > obj.x + tolerance
            && this.y < obj.y + obj.height - tolerance
            && this.y + this.height  > obj.y + tolerance
        );
    }

    shoot() {}
}