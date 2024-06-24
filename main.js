import { Player } from "./player.js";
import { InputHandle } from "./input.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const inputHandle = new InputHandle();
const players = [];

// Buat pemain pertama dengan kontrol WASD
const player1 = new Player(
  { width: canvas.width, height: canvas.height },
  inputHandle,
  { left: "a", right: "d", up: "w", kick: "r" },
  0,
  canvas.height - 183,
  false // Tidak mencerminkan gambar
);
players.push(player1);

// Buat pemain kedua dengan kontrol panah
const player2 = new Player(
  { width: canvas.width, height: canvas.height },
  inputHandle,
  { left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp", kick: "Enter" },
  canvas.width - 113.77, // Posisi x untuk pemain kedua di sisi kanan
  canvas.height - 183,
  true // Mencerminkan gambar
);
players.push(player2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach((player) => {
    player.update(players); // Mengirim array players ke dalam method update
    player.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();
