import { Application, Assets, Container, Sprite } from 'pixi.js';
import { Enemy } from './enemy';
import { randInRange } from './utils.js';
import { Player } from './player.js';

const app = new Application();
globalThis.__PIXI_APP__ = app;

const keys = {};

document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

function move(player, time) {
  if (keys["KeyA"] && player.x > 0) player.x -= 2.5 * time.deltaTime;
  if (keys["KeyD"] && player.x + player.width < app.screen.width) player.x += 2.5 * time.deltaTime;
  if (keys["KeyW"] && player.y > 0) player.y -= 2.5 * time.deltaTime;
  if (keys["KeyS"] && player.y + player.height < app.screen.height) player.y += 2.5 * time.deltaTime;
}

function createEnemy(texture) {
  const enemy = new Enemy(texture);
  enemy.x = randInRange(enemy.width, app.screen.width - enemy.width);
  enemy.y = -randInRange(enemy.height, app.screen.height);
  return enemy;
}

(async () => {
  await app.init({ resizeTo: window });

  document.getElementById('pixi-container').appendChild(app.canvas);

  // background
  const backgroundTexture = await Assets.load('assets/background.png');

  const background = new Sprite(backgroundTexture);
  background.setSize(app.screen.width, app.screen.width * (app.screen.height / app.screen.width));

  app.stage.addChild(background);

  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    background.width = app.screen.width;
    background.height = app.screen.height;
  });

  // game container
  const container = new Container();

  app.stage.addChild(container);

  let enemies = [];
  let projectiles = [];

  const texture = await Assets.load('assets/player.png');
  const projectileTexture = await Assets.load('assets/projectile.png');

  // player
  const player = new Player(texture, app.screen.width * 0.5, app.screen.height * 0.8);
  player.x = app.screen.width * 0.5;
  player.y = app.screen.height * 0.8;
  const ratio = player.height / player.width;
  player.setSize(85, 85 * ratio);

  container.addChild(player);

  // enemy
  const enemyTexture = await Assets.load('assets/enemy.png');
  for (let i = 0; i < 8; i++) {
    const enemy = createEnemy(enemyTexture);
    enemies.push(enemy);
    container.addChild(enemy);
  }

  document.addEventListener('click', () => {
    const projectile = player.shoot(projectileTexture);
    // projectile.x = player.x * 1.5;
    projectiles.push(projectile);
    container.addChild(projectile);
  });

  app.ticker.add((time) => {
    // remove enemies when dead or offscreen
    enemies = enemies.filter(e => {
      if (e.isAlive) {
        return e;
      }
      e.destroy()
    });

    enemies.forEach(e => {
      e.y += 1 * time.deltaTime;
      // mark enemy as dead when offscreen
      if (e.y > app.screen.height + e.height) {
        e.isAlive = false;
      }
      // console.log(e.intersects(player));
      if (e.intersects(player)) {
        e.isAlive = false;
      }
    });

    if (enemies.length <= 10) {
      const enemy = createEnemy(enemyTexture);
      enemies.push(enemy);
      container.addChild(enemy);
    }
  },);

  app.ticker.add((time) => {
    projectiles = projectiles.filter(p => {
      if (p.isAlive) {
        return p;
      }
      p.destroy();
    });

    projectiles.forEach(p => {
      p.y -= 8 * time.deltaTime;
      if (p.y < 0 + p.height) {
        p.isAlive = false;
      }
    });

    projectiles.forEach(p => {
      enemies.forEach(e => {
        if (p.intersects(e)) {
          p.isAlive = false;
          e.isAlive = false;
        }
      })
    })
  })

  app.ticker.add((time) => {
    move(player, time);
  });
})();