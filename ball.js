export class Ball {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 32;
      this.height = 32;
      this.vx = 0;
      this.vy = 0;
      this.gravity = 0.5;
      this.image = new Image();
      this.image.src = "imgs/ball.png";
      this.onGround = false;
      this.isKicked = false;
    }
  
    update() {
      if (!this.isKicked) {
        this.vy += this.gravity;
      }
  
      if (!this.onGround && !this.isKicked) {
        this.x += this.vx;
        this.y += this.vy;
      }
  
      // Deteksi jika bola mencapai batas layar bawah
      if (this.y + this.height >= this.game.height) {
        this.y = this.game.height - this.height - 85;  // Set posisi bola di atas tanah
        this.vy = 0;  // Hentikan pergerakan vertikal bola
        this.onGround = true;  // Bola menyentuh tanah
      }
  
      // Deteksi jika bola mencapai batas layar kiri atau kanan
      if (this.x <= 0 || this.x + this.width >= this.game.width) {
        this.vx = -this.vx;  // Balik arah bola jika mencapai batas kiri atau kanan
      }
    }
  
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    kick(direction) {
      // Tambahkan logika untuk menendang bola ke atas
      if (!this.isKicked && this.onGround) {
        if (direction === "left") {
          this.vx = -10;  // Kecepatan horizontal ketika bola ditendang ke kiri
        } else if (direction === "right") {
          this.vx = 10;  // Kecepatan horizontal ketika bola ditendang ke kanan
        } else if (direction === "up") {
          this.vy = -20;  // Kecepatan vertikal ketika bola ditendang ke atas
        }
        this.isKicked = true;  // Set bola sudah ditendang
        this.onGround = false;  // Bola tidak menyentuh tanah lagi
      }
    }
  }
  