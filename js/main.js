const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


const player = new Player("Marcus");

let jumping = false;

function animate() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  player.draw();
  player.update();
  player.higher();
  requestAnimationFrame(animate);
}
animate();

let handlers = {
  keyDown : function(e) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (player.speedX > -10) {
        player.speedX = -10;
        console.log(player.speedX);
      }
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (player.speedX < 10) {
        player.speedX = 10;
        console.log(player.speedX);
      }
    }
    if (e.key === 'w' || e.key === 'ArrowUp') {
      if (!e.repeat && player.jumpTime < 1 && player.y + player.height >= canvas.height) {
        player.jumpTime = 1;
      }
    }
  },
  keyUp  : function(e) {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      console.log("slowing left");
      player.speedX = 0;
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      console.log("slowing right");
      player.speedX = 0;
    }
  //   // if (e.key === 'w' || e.key === 'ArrowUp') {
      
  //   // }
  }
};

window.addEventListener('keydown', handlers.keyDown);
window.addEventListener('keyup', handlers.keyUp);
