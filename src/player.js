import { Sprite } from "pixi.js";
import { Projectile } from "./projectile";

export class Player extends Sprite {
    constructor(texture) {
        super(texture);
    }

    shoot(projectileTexture) {
        const projectile = new Projectile(projectileTexture);
        projectile.setSize(7.5, 15);
        projectile.x = this.x + 38;
        projectile.y = this.y + 5;
        return projectile;
    }
}