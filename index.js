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
    if (top - (player.offsetHeight / 2) < 0) return;
    if (top + (player.offsetHeight * 1.5) > gameScreen.offsetHeight) return;

    player.style.top = `${top}px`;
    player.style.left = `${left}px`;
});