const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


const player = new Player("Brad");

let keysPressed = {};

let jumping = false;
let jumpLength = 6;
let playerSpeed = 6;
let isGrounded = false;
let nearestGrounded = 0;

let againstLeftWall = false;
let againstRightWall = false;

function animate() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  // console.log(nearestPlatform());
  nearestGrounded = nearestPlatform();
  // console.log(nearestGrounded.name, nearestGrounded.y);
  ctx.fillStyle = "red";
  // ctx.fillRect(player.x,player.y + player.height,30,nearestGrounded.y - player.y - player.height);
  player.draw();
  player.movement();
  player.higher();
  handlePlatforms();
  requestAnimationFrame(animate);
}
animate();



let handlers = {
  keyDown : function(e) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      keysPressed.left = true;
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      keysPressed.right = true;
    }
    if (e.key === 'w' || e.key === 'ArrowUp') {
      keysPressed.up = true;
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
      keysPressed.down = true;
      player.gravity = 1;
    }
  },
  keyUp  : function(e) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (keysPressed.left && keysPressed.right) {
        delete keysPressed.left;
      } else {
        delete keysPressed.left;
        player.speedX = 0;
      }
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (keysPressed.left && keysPressed.right) {
        delete keysPressed.right;
      } else {
        delete keysPressed.right;
        player.speedX = 0;
      }
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
      delete keysPressed.down;
      player.speedY = 0;
      player.gravitySpeed = 3;
      player.gravity = 0.2;
    }
    if (e.key === 'w' || e.key === 'ArrowUp') {
      delete keysPressed.up;
    }
  },
  touchStart : function(e) {
    let elementClicked = e.target;
    if (elementClicked.id === "rightBtn") {
      e.key = 'd';
      // console.log(e);
      handlers.keyDown(e);
    } else if (elementClicked.id === "leftBtn") {
      e.key = 'a';
      handlers.keyDown(e);
    } else if (elementClicked.id === "upBtn") {
      e.key = 'w';
      handlers.keyDown(e);
    } else if (elementClicked.id === "downBtn") {
      e.key = 's';
      handlers.keyDown(e);
    }
  },
  touchEnd : function(e) {
    let elementClicked = e.target;
    if (elementClicked.id === "rightBtn") {
      e.key = 'd';
      // console.log(e);
      handlers.keyUp(e);
    } else if (elementClicked.id === "leftBtn") {
      e.key = 'a';
      handlers.keyUp(e);
    } else if (elementClicked.id === "upBtn") {
      e.key = 'w';
      handlers.keyUp(e);
    } else if (elementClicked.id === "downBtn") {
      e.key = 's';
      handlers.keyUp(e);
    }
  }
};

window.addEventListener('keydown', handlers.keyDown);
window.addEventListener('keyup', handlers.keyUp);

document.addEventListener("touchstart", handlers.touchStart, false);
document.addEventListener("touchend", handlers.touchEnd, false);
document.addEventListener("mousedown", handlers.touchStart, false);
document.addEventListener("mouseup", handlers.touchEnd, false);
