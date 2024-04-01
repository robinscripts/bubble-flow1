// const canvas = document.getElementById("canvas1");
// const ctx = canvas.getContext("2d");
// console.log(ctx);
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.addEventListener("resize", () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     // ctx.fillStyle = 'white';
//     // ctx.fillRect(10, 10, 150, 150);
// });
// ctx.fillStyle = 'white';
// ctx.fillRect(10, 10, 150, 150);

// ctx.fillStyle = 'red';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 15;
// ctx.beginPath();
// ctx.arc(200,200,50,0,Math.PI*2,);
// ctx.fill();
// ctx.stroke();

// const mouse = {
//   x: undefined,
//   y: undefined,
// };

// canvas.addEventListener("click", (event) => {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   drawCircle();
// });
// canvas.addEventListener("mousemove", (event) => {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   drawCircle();
// });

// const drawCircle = () => {
//   ctx.fillStyle = "blue";
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 3;
//   ctx.beginPath();
//   ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.stroke();
// };

// function animate (){
//     // ctx.clearRect(0,0,canvas.width,canvas.height);
//     drawCircle();
//     requestAnimationFrame(animate);
// }
// animate();

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const colorsArray = [];
for (let i = 0; i < 20; i++) {
  colorsArray.push(generateRandomColor());
}

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.floor(Math.random() * 20 + 1);
    this.speedx = Math.random() * 3 - 1.5;
    this.speedy = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    // ctx.fillStyle = "#FF00FF";
    ctx.fillStyle = colorsArray[Math.floor(Math.random() * 29)];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 3000; i++) {
//     particleArray.push(new Particle());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
