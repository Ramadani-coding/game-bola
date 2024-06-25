import { Player } from "./player.js";
import { InputHandle } from "./input.js";
import { Ball } from "./ball.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const inputHandle = new InputHandle();

// Tinggi tanah di layar
const groundHeight = 500; // Misalnya tinggi tanah 50 pixel dari bawah layar

// Buat objek bola dan atur posisi jatuh di tengah atas layar
const ball = new Ball(
  { width: canvas.width, height: canvas.height },
  canvas.width / 2 - 65,  // Atur posisi x tengah layar
  canvas.height - groundHeight // Atur posisi y di atas tanah
);

const players = [];

// Buat pemain pertama dengan kontrol WASD
const player1 = new Player(
  { width: canvas.width, height: canvas.height },
  inputHandle,
  { left: "a", right: "d", up: "w", kick: "r" },
  0,
  canvas.height - 183,
  false, // Tidak mencerminkan gambar
  ball  // Tambahkan instance ball ke dalam constructor Player
);
players.push(player1);

// Buat pemain kedua dengan kontrol panah
const player2 = new Player(
  { width: canvas.width, height: canvas.height },
  inputHandle,
  { left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp", kick: "Enter" },
  canvas.width - 113.77, // Posisi x untuk pemain kedua di sisi kanan
  canvas.height - 183,
  true, // Mencerminkan gambar
  ball  // Tambahkan instance ball ke dalam constructor Player
);
players.push(player2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach((player) => {
    player.update(players);
    player.draw(ctx);
  });
  ball.update();
  ball.draw(ctx);

  requestAnimationFrame(animate);
}

animate();
