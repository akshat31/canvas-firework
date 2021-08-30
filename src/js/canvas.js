import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

c.beginPath();
c.moveTo(75, 40);
c.bezierCurveTo(75, 37, 70, 25, 50, 25);
c.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
c.bezierCurveTo(20, 80, 40, 102, 75, 120);
c.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
c.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
c.bezierCurveTo(85, 25, 75, 37, 75, 40);
c.fillStyle = "red";
c.fill();

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

const gravity = 0.005;
const friction = 0.99;

class Particles {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y +=gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles
function init() {
  particles = []
}

// Animation Loop
function animate() {
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  particles.forEach(particle => {
    if (particle.alpha > 0) {
      particle.update()
    } else {
      particles.splice(i, 1)
    }
  })
  requestAnimationFrame(animate)
}

addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    const particleCount = 400;
    const power = 8;
    const angleIncrement = Math.PI * 2 / particleCount
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particles(mouse.x, mouse.y, 5, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power
      }))
    }
})

init()
animate()
