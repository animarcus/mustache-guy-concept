class Player {
  constructor(name) {
    this.playerName = name;
    this.x = canvas.width/2;
    this.y = canvas.height - 50 - 100;
    this.width = 30;
    this.height = 50;

    this.sideSpeed = 0.05;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.jumpTime = 0;
  }
  movement() {
    if (this.x < 0 - this.width - this.width/5) { // border detection
      this.x = canvas.width - this.width/5;
    }
    if (this.x + this.width > canvas.width + this.width - this.width/5) {
      this.x = 0 - this.width/5;
    }

    if (keysPressed.left && this.speedX > -playerSpeed) { // player go left
      this.speedX = -playerSpeed;
    }
    if (keysPressed.right && this.speedX < playerSpeed) { // player go right
      this.speedX = playerSpeed;
    }
    if (this.y > canvas.height - this.height) { // player on ground
      isGrounded = true;
      this.y = canvas.height - this.height;
      this.gravitySpeed = 0;
      this.speedY = 0;
    }

    console.log(Math.floor(nearestGrounded.y +1 - (this.y + this.speedY + this.gravitySpeed + this.gravity + this.height)), Math.floor(nearestGrounded.y - this.y));
    // this.gravitySpeed += this.gravity; // normal gravity stuff
    if (!isGrounded && Math.floor(nearestGrounded.y +1 - (this.y + this.speedY + this.gravitySpeed + this.gravity + this.height)) < 0) {
      // console.log("oops too close", canvas.height - nearestGrounded.y, this.height);
      this.gravitySpeed = 0;
      this.speedY = 0;
    } else {
      this.gravitySpeed += this.gravity;
    }
    this.y += this.speedY + this.gravitySpeed;
    this.x += this.speedX;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(mustache, this.x-10,this.y+5, 50,25);
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.playerName, this.x + this.width/2, this.y - 10);
  }
  higher() {
    if (keysPressed.up && player.jumpTime < 1 && ((isOnPlatform) || (isGrounded))) {
      player.jumpTime = 1;
    }
    if (this.jumpTime >= 1) {
      isGrounded = false;
      this.speedY = -7;
      this.gravity = -0.2;
      this.jumpTime ++;
      if (this.jumpTime > jumpLength) {
        this.jumpTime = 0;
        this.gravity = 0.2;
      }
    }
  }
}


const mustache = new Image();
mustache.src = 'images/mustache.png';