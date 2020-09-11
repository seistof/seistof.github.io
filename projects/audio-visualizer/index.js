const audio = document.getElementById('audio');
const logo = document.getElementById('circle').style;
let title = document.getElementById('status');
let dots = document.querySelectorAll('.dot');
let context, analyser, source, array, dotsRun;

window.onclick = function() {
  if (!context) {
    preparation();
    console.log('start');
  }
  if (audio.paused) {
    title.textContent = 'Playing';
    startDots();
    audio.play();
    loop();
  } else {
    title.textContent = 'Paused';
    clearInterval(dotsDisplay);
    stopDots();
    audio.pause();
  }
};

function preparation() {
  context = new AudioContext();
  analyser = context.createAnalyser();
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  loop();
}

function loop() {
  if (!audio.paused) {
    window.requestAnimationFrame(loop);
  }
  array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);
  logo.minHeight = (array[40] * 2 + 'px');
  logo.minWidth = (array[40] * 2 + 'px');
}

function dotsDisplay() {
  if (
    dots[0].style.visibility === 'visible' &&
    dots[1].style.visibility === 'visible' &&
    dots[2].style.visibility === 'visible'
  ) {
    dots[0].style.visibility = 'hidden';
    dots[1].style.visibility = 'hidden';
    dots[2].style.visibility = 'hidden';
  } else if (
    dots[0].style.visibility === 'hidden' &&
    dots[1].style.visibility === 'hidden' &&
    dots[2].style.visibility === 'hidden'
  ) {
    dots[0].style.visibility = 'visible';
  } else if (
    dots[0].style.visibility === 'visible' &&
    dots[1].style.visibility === 'hidden' &&
    dots[2].style.visibility === 'hidden'
  ) {
    dots[1].style.visibility = 'visible';
  } else if (
    dots[0].style.visibility === 'visible' &&
    dots[1].style.visibility === 'visible' &&
    dots[2].style.visibility === 'hidden'
  ) {
    dots[2].style.visibility = 'visible';
  }
}

function startDots() {
  dots[0].style.visibility = 'hidden';
  dots[0].textContent = '.';
  dots[1].style.visibility = 'hidden';
  dots[1].textContent = '.';
  dots[2].style.visibility = 'hidden';
  dots[2].textContent = '.';
  dotsRun = setInterval(dotsDisplay, 750);
}

function stopDots() {
  console.log('stop');
  clearInterval(dotsRun);
  dots[0].textContent = '';
  dots[1].textContent = '';
  dots[2].textContent = '';
}