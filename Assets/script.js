const map = document.getElementById("map");
const player = document.getElementById("player");
const modal = document.getElementById("instruction-modal");
const startBtn = document.getElementById("start-btn");

const mapWidth = 1500;
const mapHeight = 1500;
const playerSpeed = 10;
const playerSize = 32;
const buffer = 100;

let gameStarted = false;

// Player’s position on map (in absolute coordinates)
let playerPos = {
  x: 750,
  y: 750
};

// Camera offset (how much of the map is shifted left/top)
let cameraOffset = {
  x: 0,
  y: 0
};

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// 🔁 Update visuals each frame
function updateView() {
  // Keep camera offset based on player's location and buffer zones
  if (playerPos.x - cameraOffset.x < buffer) {
    cameraOffset.x = Math.max(0, playerPos.x - buffer);
  }
  if (playerPos.x - cameraOffset.x > viewportWidth - buffer) {
    cameraOffset.x = Math.min(mapWidth - viewportWidth, playerPos.x - (viewportWidth - buffer));
  }
  if (playerPos.y - cameraOffset.y < buffer) {
    cameraOffset.y = Math.max(0, playerPos.y - buffer);
  }
  if (playerPos.y - cameraOffset.y > viewportHeight - buffer) {
    cameraOffset.y = Math.min(mapHeight - viewportHeight, playerPos.y - (viewportHeight - buffer));
  }

  // Move the map
  map.style.left = -cameraOffset.x + "px";
  map.style.top = -cameraOffset.y + "px";

  // Position player relative to camera
  player.style.left = (playerPos.x - cameraOffset.x) + "px";
  player.style.top = (playerPos.y - cameraOffset.y) + "px";
}

startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  gameStarted = true;
  updateView();
});

document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;

  switch (e.key) {
    case "ArrowUp":
    case "w":
      playerPos.y -= playerSpeed;
      break;
    case "ArrowDown":
    case "s":
      playerPos.y += playerSpeed;
      break;
    case "ArrowLeft":
    case "a":
      playerPos.x -= playerSpeed;
      break;
    case "ArrowRight":
    case "d":
      playerPos.x += playerSpeed;
      break;
    default:
      return;
  }

  // Clamp player inside map
  playerPos.x = Math.max(0, Math.min(playerPos.x, mapWidth - playerSize));
  playerPos.y = Math.max(0, Math.min(playerPos.y, mapHeight - playerSize));

  updateView();
});

updateView();
