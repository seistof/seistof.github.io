const canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

const timeout = () => new Promise(r => {
  setTimeout(() => {
    r(console.log(`Delay`));
  }, 5);
});

async function draw(
    startX, startY, len, angle, branchWidth, bodyColor, leafsColor) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = bodyColor;
  ctx.fillStyle = leafsColor;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 10) {
    ctx.restore();
    return;
  }
  await timeout();
  await draw(0, -len, len * 0.75, angle + 15, branchWidth);
  await draw(0, -len, len * 0.75, angle - 15, branchWidth);

  ctx.restore();
}

draw(canvas.width / 2, canvas.height - 80, 150, 0, 2, 'rgb(100,50,250)', 'green')
    .then(() => console.log(`Done`));


