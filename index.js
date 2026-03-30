const player = document.getElementById("player");

window.addEventListener("keydown", (event) => {
    const pos = player.getBoundingClientRect();
    let top = pos.top;
    let left = pos.left;
    const code = event.code;

    switch (code) {
        case "KeyA": left -= 10; break;
        case "KeyD": left += 10; break;
        case "KeyW": top -= 10; break;
        case "KeyS": top += 10; break;
    }

    player.style.top = `${top}px`;
    player.style.left = `${left}px`;
});