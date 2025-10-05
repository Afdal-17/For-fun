const container = document.getElementById("balloon-container");
const button = document.getElementById("btn");
const message = document.getElementById("message");
const greeting = document.getElementById("greeting");
const music = document.getElementById("music");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function random(num) {
  return Math.floor(Math.random() * num);
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = `${random(window.innerWidth)}px`;
  balloon.style.background = `hsl(${random(360)}, 70%, 60%)`;
  balloon.style.animationDuration = `${5 + random(3)}s`;
  container.appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, 8000);
}

setInterval(createBalloon, 400);

let confettis = [];

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 10
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettis.forEach((c) => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.r, c.r * 2);
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettis.forEach((c) => {
    c.y += Math.sin(c.d / 2) + 2;
    c.x += Math.sin(c.d);
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Saat tombol diklik
button.addEventListener("click", () => {
  message.classList.remove("hidden");
  greeting.textContent = "🎉Selamat Ulang Tahun🎉";
  music.play();
  button.style.display = "none";

  // Efek container berubah warna & zoom
  document.querySelector(".container").classList.add("reveal");

  // Tambah banyak balon
  for (let i = 0; i < 50; i++) setTimeout(createBalloon, i * 100);
  createConfetti();
  drawConfetti();
});
