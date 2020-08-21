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
  update() {
    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - 50;
      this.gravitySpeed = 0;
    }
    // if (this.y + this.height < canvas.height && this.jumpTime === 0) {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    // }
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(mustache, this.x-10,this.y+5, 50,25);
  }
  higher() {
    if (this.jumpTime >= 1) {
      this.gravity = -0.8;
      console.log(this.jumpTime);
      this.jumpTime ++;
      if (this.jumpTime > 10) {
        this.jumpTime = 0;
        this.gravity = 0.2;
        console.log(this.jumpTime, this.gravity);
      }
    }
  }
}


const mustache = new Image();
mustache.src = 'images/mustache.png';