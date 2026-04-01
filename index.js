const gameScreen = document.getElementById("screen");
const player = document.getElementById("player");

window.addEventListener("keydown", (event) => {
    const pos = player.getBoundingClientRect();
    let top = pos.top;
    let left = pos.left;
    const code = event.code;

    if (code === "KeyA") left -= 10;
    if (code === "KeyD") left += 10;
    if (code === "KeyW") top -= 10;
    if (code === "KeyS") top += 10;
    
    if (left < 0) return;
    if (left + player.offsetWidth > gameScreen.offsetWidth) return;
    if (top < 0) return;
    if (top + player.clientHeight > gameScreen.offsetHeight) return;

    player.style.top = `${top}px`;
    player.style.left = `${left}px`;
});


window.addEventListener("mousedown", (event) => {
    const projectile = createProjectile();
    gameScreen.appendChild(projectile);
    let start;

    function moveProjectile(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;

        const shift = Math.max(-0.5 * elapsed, -1000);
        projectile.style.transform = `translateY(${shift}px)`;
        if (shift > -800) {
            requestAnimationFrame(moveProjectile)
        } else {
            gameScreen.removeChild(projectile);
        }
        console.log(shift);
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

