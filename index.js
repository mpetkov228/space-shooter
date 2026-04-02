const gameScreen = document.getElementById("screen");
const playerDiv = document.getElementById("player");

const gameScreenRect = gameScreen.getBoundingClientRect();
const playerDivRect = playerDiv.getBoundingClientRect();

let x = gameScreenRect.width * 0.47;
let y = gameScreenRect.height * 0.8;

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

document.addEventListener("mousedown", (event) => {
    const projectile = createProjectile();
    gameScreen.appendChild(projectile);
    let start;

    function moveProjectile(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;

        const shift = Math.min(0.5 * elapsed, 800);
        projectile.style.transform = `translateY(${-shift}px)`;
        if (shift < 800) {
            requestAnimationFrame(moveProjectile)
        } else {
            gameScreen.removeChild(projectile);
        }
    }

    requestAnimationFrame(moveProjectile);
});

function createProjectile() {
    const playerPos = player.getBoundingClientRect();
    const projectile = document.createElement("img");
    projectile.src = "assets/projectile.png";
    projectile.classList.add("projectile");
    projectile.style.top = `${playerPos.top + 10}px`;
    projectile.style.left = `${playerPos.left + 45}px`;

    return projectile;
}

function getDirection() {
    let dx = 0;
    let dy = 0;

    if (keys["KeyA"] && x > 0) dx -= 1;
    if (keys["KeyD"] && (x + playerDivRect.width * 1.1) < gameScreenRect.width ) dx += 1;
    if (keys["KeyW"] && y > 0) dy -= 1;
    if (keys["KeyS"] && (y + playerDivRect.height * 1.1) < gameScreenRect.height) dy += 1;

    // normalize diagonal speed
    if (dx !== 0 && dy !== 0) {
        dx *= Math.SQRT1_2; // 1 / sqrt(2)
        dy *= Math.SQRT1_2;
    }

    return { dx, dy };
}

function loop() {
    const { dx, dy } = getDirection();
    const moving = dx !== 0 || dy !== 0;

    if (moving) {
        x += dx * 5;
        y += dy * 5;
    }

    playerDiv.style.left = x + "px";
    playerDiv.style.top = y + "px";

    requestAnimationFrame(loop);
}

loop();