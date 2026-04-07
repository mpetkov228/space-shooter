import { Sprite, Texture } from "pixi.js";

export class Enemy extends Sprite {
    /**
     * @param {Texture} texture pixi.js Texture object
     * @param {number} health 
     */

    constructor(texture, health) {
        super(texture);
        this.health = health;
        this.isAlive = true;
        this.cullable = true;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    shoot() {}
}