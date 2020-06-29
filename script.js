const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');

setInterval(() => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;

  hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;

  let hour = document.querySelector('#hour');
  let minutes = document.querySelector('#minutes');
  let seconds = document.querySelector('#seconds');

  let h = new Date().getHours().toString();
  let m = new Date().getMinutes().toString();
  let s = new Date().getSeconds().toString();

  h = (h < 10) ? '0' + h : h;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  hour.innerHTML = h + `:`;
  minutes.innerHTML = m + `:`;
  seconds.innerHTML = s;
});


