import { InputHandle } from "./input.js";

export class Player {
  constructor(game, inputHandle, controls, x, y, mirror = false, ball) { // Tambahkan ball ke dalam constructor
    this.game = game;
    this.inputHandle = inputHandle;
    this.controls = controls;
    this.width = 113.77;
    this.height = 113;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.image = document.getElementById("player");
    this.speed = 5;
    this.jumpPower = 25;
    this.jumping = false;
    this.mirror = mirror;

    this.spritesWidth = 113.77;
    this.spritesHeight = 113;
    this.playerState = "idle";
    this.gameFrame = 0;
    this.staggerFrames = 5;
    this.spriteAnimations = [];

    this.loadAnimations();

    // Collision box
    this.collisionBox = {
      x: this.x + 20,
      y: this.y + 20,
      width: this.width - 40,
      height: this.height - 40
    };

    // Simpan instance ball di dalam Player
    this.ball = ball;
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

  update(players) {
    if (this.inputHandle.isKeyPressed(this.controls.left)) {
      this.playerState = "front";
      this.x -= this.speed;
    } else if (this.inputHandle.isKeyPressed(this.controls.right)) {
      this.playerState = "back";
      this.x += this.speed;
    } else if (this.inputHandle.isKeyPressed(this.controls.up)) {
      if (!this.jumping) {
        this.jumping = true;
        this.vy = -this.jumpPower;
      }
      this.playerState = "jump";
    } else if (this.inputHandle.isKeyPressed(this.controls.kick)) {
      this.playerState = "kick";
      if (this.ball) {  // Pastikan ball ada dan sudah didefinisikan
        this.ball.kick("up");
      }
    } else {
      this.playerState = "idle";
    }

    if (this.jumping) {
      this.y += this.vy;
      this.vy += 0.8;
    }

    this.collisionBox.x = this.x + 20;
    this.collisionBox.y = this.y + 20;

    players.forEach((otherPlayer) => {
      if (this !== otherPlayer && this.checkCollisionWith(otherPlayer)) {
        if (this.inputHandle.isKeyPressed(this.controls.left)) {
          this.x = otherPlayer.x + otherPlayer.width + 1;
        } else if (this.inputHandle.isKeyPressed(this.controls.right)) {
          this.x = otherPlayer.x - this.width - 1;
        }
      }
    });

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    if (this.y > this.game.height - this.height - 70) {
      this.y = this.game.height - this.height - 70;
      this.jumping = false;
      this.vy = 0;
    }

    this.gameFrame++;
  }

  checkCollisionWith(player) {
    return (
      this.collisionBox.x < player.collisionBox.x + player.collisionBox.width &&
      this.collisionBox.x + this.collisionBox.width > player.collisionBox.x &&
      this.collisionBox.y < player.collisionBox.y + player.collisionBox.height &&
      this.collisionBox.y + this.collisionBox.height > player.collisionBox.y
    );
  }

  draw(context) {
    let position =
      Math.floor(this.gameFrame / this.staggerFrames) %
      this.spriteAnimations[this.playerState].loc.length;
    let frameX = this.spritesWidth * position;
    let frameY = this.spriteAnimations[this.playerState].loc[position].y;

    context.save();
    if (this.mirror) {
      context.scale(-1, 1);
      context.translate(-this.game.width, 0);
      context.drawImage(
        this.image,
        frameX,
        frameY,
        this.spritesWidth,
        this.spritesHeight,
        this.game.width - this.x - this.width,
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
  }
}
