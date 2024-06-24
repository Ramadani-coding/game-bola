import { InputHandle } from "./input.js";

export class Player {
  constructor(game, inputHandle, controls, x, y, mirror = false) {
    this.game = game;
    this.inputHandle = inputHandle; // Buat instance dari InputHandle
    this.controls = controls; // Kontrol khusus untuk pemain ini
    this.width = 113.77;
    this.height = 113;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.image = document.getElementById("player");
    this.speed = 5;
    this.jumpPower = 15;
    this.jumping = false;
    this.mirror = mirror; // Properti untuk menentukan apakah gambar dicerminkan

    // Tambahkan properti untuk animasi
    this.spritesWidth = 113.77;
    this.spritesHeight = 113;
    this.playerState = "idle";
    this.gameFrame = 0;
    this.staggerFrames = 5;
    this.spriteAnimations = [];

    this.loadAnimations();
  }

  loadAnimations() {
    const animationStates = [
      { name: "idle", frame: 18 },
      { name: "back", frame: 10 },
      { name: "front", frame: 5 },
      { name: "jump", frame: 5 },
      { name: "kick", frame: 9 },
    ];

    animationStates.forEach((state, index) => {
      let frames = { loc: [] };
      for (let j = 0; j < state.frame; j++) {
        let positionX = j * this.spritesWidth;
        let positionY = index * this.spritesHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }

  update() {
    // Ubah playerState berdasarkan inputHandle.keys
    if (this.inputHandle.isKeyPressed(this.controls.left)) {
      this.playerState = "front";
      this.x -= this.speed; // Bergerak ke kiri
    } else if (this.inputHandle.isKeyPressed(this.controls.right)) {
      this.playerState = "back";
      this.x += this.speed; // Bergerak ke kanan
    } else if (this.inputHandle.isKeyPressed(this.controls.up)) {
      if (!this.jumping) {
        this.jumping = true; // Mulai lompatan jika tidak sedang melompat
        this.vy = -this.jumpPower; // Berikan kecepatan vertikal ke atas
      }
      this.playerState = "jump";
    } else if (this.inputHandle.isKeyPressed(this.controls.kick)) {
      this.playerState = "kick";
    } else {
      this.playerState = "idle";
    }

    // Gravitasi: atur turunnya pemain setelah lompatan
    if (this.jumping) {
      this.y += this.vy;
      this.vy += 0.8; // Gravitasi
    }

    // Batasi pergerakan di dalam batas layar
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    // Batasi pergerakan vertikal agar tidak melewati lantai
    if (this.y > this.game.height - this.height - 70) {
      this.y = this.game.height - this.height - 70;
      this.jumping = false; // Setel lompatan selesai ketika mencapai lantai
      this.vy = 0; // Nolkan kecepatan vertikal setelah lompatan
    }
  }

  draw(context) {
    let position =
      Math.floor(this.gameFrame / this.staggerFrames) %
      this.spriteAnimations[this.playerState].loc.length;
    let frameX = this.spritesWidth * position;
    let frameY = this.spriteAnimations[this.playerState].loc[position].y;

    context.save();
    if (this.mirror) {
      context.scale(-1, 1); // Balikkan kanvas secara horizontal
      context.translate(-this.game.width, 0); // Pindahkan kembali posisi ke tempat yang benar
      context.drawImage(
        this.image,
        frameX,
        frameY,
        this.spritesWidth,
        this.spritesHeight,
        this.game.width - this.x - this.width, // Posisikan dengan benar jika dicerminkan
        this.y,
        this.width,
        this.height
      );
    } else {
      context.drawImage(
        this.image,
        frameX,
        frameY,
        this.spritesWidth,
        this.spritesHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    context.restore();
    this.gameFrame++;
  }
}
