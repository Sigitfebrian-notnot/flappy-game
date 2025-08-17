const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load gambar
const birdImg = new Image();
birdImg.src = "img/bird.png";

const bgImg = new Image();
bgImg.src = "img/background.png";

const pipeNorth = new Image();
pipeNorth.src = "img/pipeNorth.png";

const pipeSouth = new Image();
pipeSouth.src = "img/pipeSouth.png";

// Variabel game
let birdX = 50;
let birdY = 150;
let gravity = 1.5;
let gap = 100;
let pipes = [];
pipes[0] = { x: canvas.width, y: 0 };

// Event
document.addEventListener("keydown", moveUp);

function moveUp() {
  birdY -= 25;
}

// Game Loop
function draw() {
  // Background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Burung
  ctx.drawImage(birdImg, birdX, birdY);

  // Pipa
  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + pipeNorth.height + gap);

    pipes[i].x--;

    if (pipes[i].x === 125) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // Deteksi tabrakan
    if (
      (birdX + birdImg.width >= pipes[i].x &&
        birdX <= pipes[i].x + pipeNorth.width &&
        (birdY <= pipes[i].y + pipeNorth.height ||
          birdY + birdImg.height >= pipes[i].y + pipeNorth.height + gap)) ||
      birdY + birdImg.height >= canvas.height
    ) {
      location.reload(); // restart game
    }
  }

  birdY += gravity;
  requestAnimationFrame(draw);
}

draw();
