import { Application, Assets, Container, Sprite, UPDATE_PRIORITY } from 'pixi.js';

const app = new Application();

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

async function createEnemy() {
  const texture = await Assets.load('assets/enemy.png');
  const enemy = new Sprite(texture);
  enemy.cullable = true;
  enemy.x = Math.floor(Math.random() * ((app.screen.width - enemy.width) - enemy.width) + enemy.width);
  enemy.y = -enemy.height;

  return enemy;
}

(async () => {
  await app.init({ background: '#1099bb', resizeTo: window });

  document.getElementById('pixi-container').appendChild(app.canvas);

  const container = new Container();

  app.stage.addChild(container);

  const enemies = [];

  // player
  const texture = await Assets.load('assets/player.png');

  const ship = new Sprite(texture);
  const ratio = ship.height / ship.width;
  ship.setSize(85, 85 * ratio);

  ship.x = app.screen.width * 0.5;
  ship.y = app.screen.height * 0.8;

  container.addChild(ship);

  // enemy
  const texture2 = await Assets.load('assets/enemy.png');

  const enemy = new Sprite(texture2);
  enemy.cullable = true;

  container.addChild(enemy);

  enemy.x = app.screen.width * 0.2;
  enemy.y = -enemy.width;


  const enemy2 = new Sprite(texture2);
  enemy2.cullable = true;

  container.addChild(enemy2);

  enemy2.x = app.screen.width * 0.8;
  enemy2.y = -enemy2.width;

  app.ticker.add((time) => {
    console.log(time.elapsedMS);
    // container.addChild(await createEnemy());
  });

  app.ticker.add((time) => {
    [enemy, enemy2].forEach(e => e.y += 1 * time.deltaTime);
  });

  app.ticker.add((time) => {
    move(ship, time);
  });
})();