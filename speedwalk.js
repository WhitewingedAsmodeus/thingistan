let rocketEnabled = false;
let ROCKET_SPEED = 1100;
const MIN_SPEED = 20;
const MAX_SPEED = 10000;
const SPEED_STEP = 500;

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "e") {
    rocketEnabled = !rocketEnabled;
    console.log("Rocket mode:", rocketEnabled ? "ON" : "OFF", "| Speed:", ROCKET_SPEED);
  }

  if (e.ctrlKey && (e.key === "=" || e.key === "+")) {
    ROCKET_SPEED = Math.min(ROCKET_SPEED + SPEED_STEP, MAX_SPEED);
    console.log("Rocket speed increased:", ROCKET_SPEED);
  }

  if (e.ctrlKey && e.key === "-") {
    ROCKET_SPEED = Math.max(ROCKET_SPEED - SPEED_STEP, MIN_SPEED);
    console.log("Rocket speed decreased:", ROCKET_SPEED);
  }
});

function rocket(direction) {
  const player = ig.game.O5492;
  if (!player || !player.vel) return;

  switch (direction) {
    case "up":
      player.vel.y = -ROCKET_SPEED;
      break;
    case "down":
      player.vel.y = ROCKET_SPEED;
      break;
    case "left":
      player.vel.x = -ROCKET_SPEED;
      break;
    case "right":
      player.vel.x = ROCKET_SPEED;
      break;
  }
}

document.addEventListener("keydown", function (e) {
  if (!rocketEnabled) return;

  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      rocket("up");
      break;
    case "ArrowDown":
      e.preventDefault();
      rocket("down");
      break;
    case "ArrowLeft":
      e.preventDefault();
      rocket("left");
      break;
    case "ArrowRight":
      e.preventDefault();
      rocket("right");
      break;
  }
});

if (ig.game.O5492) {
  ig.game.O5492.kill = function () {};
}
