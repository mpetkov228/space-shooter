import { Sprite } from "pixi.js";
import { Projectile } from "./projectile";

export class Player extends Sprite {
    constructor(texture) {
        super(texture);
        this.health = 100;
        this.isAlive = true;
    }

    shoot(projectileTexture) {
        const projectile = new Projectile(projectileTexture);
        projectile.setSize(7.5, 15);
        projectile.x = this.x + 38;
        projectile.y = this.y + 5;
        return projectile;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
            this.isAlive = false;
        }

        console.log(this.health);
    }
}