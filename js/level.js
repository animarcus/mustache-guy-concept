let isOnPlatform = false;
let platforms = [];
let onPlatCount = 0;
class Obstacle {
  constructor (x, y, name) {
    this.x = x;
    this.y = y;
    this.width = Math.floor(Math.random() * 40 + 100);
    this.height = 15;
    this.name = name;
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.x + this.width/2, this.y - 10);
  }
  collision() {
    if (this.y >= player.y && //Check for vertical wall collision
      this.y + this.height >= player.y &&
      this.y + this.height <= player.y + player.height &&
      this.y <= player.y + player.height) {
      if (player.x + player.width < this.x + this.width/2 &&
          player.x + player.width > this.x) {
            againstLeftWall = true;
            if (keysPressed.right) {
              player.x = this.x - player.width;
            }
            // console.log("againstLeftWall", againstLeftWall);
      } else {
        againstLeftWall = false;
      }
      if (player.x > this.x + this.width/2 &&
          player.x < this.x + this.width) {
            againstRightWall = true;
            if (keysPressed.left) {
              player.x = this.x + this.width;
            }
            // console.log("againstRightWall", againstRightWall);
      } else {
        againstRightWall = false;
      }
    }

    if (player.x + player.width > this.x &&
        player.x < this.x + this.width) {
        if (player.y + player.height > this.y && player.y + player.height < this.y + this.height/2) {
          if (player.jumpTime < 1) {
            player.y = this.y - player.height;
            player.speedY = 0;
            player.gravitySpeed = 0;
            onPlatCount ++;
            return onPlatCount;
          }
          
        } else if (player.y > this.y + this.height/2 &&
          player.y < this.y + this.height) {
          console.log("bottom");
          player.y = this.y + this.height;
          player.jumpTime = 0;
          player.gravity = 0.2;
          player.speedY = 0;
        }
    }
  }
}

platforms.push(new Obstacle(200,370, "0"));
platforms.push(new Obstacle(350,250, "1"));
platforms.push(new Obstacle(100,100,"2"));



function handlePlatforms() {
  onPlatCount = 0;
  platforms.forEach(function(i) {
    i.draw();
    i.collision();
  });
  if (onPlatCount > 0) {
    isOnPlatform = true;
  } else {
    isOnPlatform = false;
  }
}

function nearestPlatform() {
  let platformsUnder = [];
  platforms.forEach(function (platform) {
    if (player.x + player.width > platform.x && player.x < platform.x + platform.width &&
        platform.y >= player.y + player.height) {
      platformsUnder.push(platform);
    }
  });
  if (platformsUnder.length > 1) {
    if (platformsUnder[0].y < platformsUnder[1].y) {
      platformsUnder.pop(platformsUnder[0]);
    } else {
      platformsUnder.shift(platformsUnder[1]);
    }
  }
  if (platformsUnder.length === 0) {
    platformsUnder[0] = {"name" : "ground",
                        "y" : canvas.height
                        // "y" : Math.floor(canvas.height - player.y)
                      };
  }
  return platformsUnder[0];
}