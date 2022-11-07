const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timelist = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#FFF8DC', '#FFEBCD', '#FFE4C4', '#DEB887', '#D2B48C', 'white', '#BC8F8F', '#F4A460', '#DAA520', '#B8860B', '#CD853F', '#D2691E'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
   event.preventDefault();
   screens[0].classList.add('up');
})

timelist.addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      screens[1].classList.add('up');
      time = parseInt(event.target.getAttribute('data-time'));
      startGame();
   }
})

board.addEventListener('click', (event) => {
   if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove();
      createRandomCircle();
   }
})

function startGame() {
   setInterval(decreaseTime, 1000);
   createRandomCircle();
   setTime(time);
}

function decreaseTime() {
   if (time === 0) {
      finishGame();
   } 
   else {
      let current = --time;
         if (current < 10) {
            current = `0${current}`;
         }
         setTime(current);
   }   
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
   timeEl.parentNode.classList.add('hide');
   board.innerHTML = `<h1>Score: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
   const circle = document.createElement('div');
   const size = getRandomNum(10, 100);
   const {width, height} = board.getBoundingClientRect();
   const x = getRandomNum(0, width - size);
   const y = getRandomNum(0, height - size);

   setColor(circle);

   circle.classList.add('circle');
   circle.style.width = `${size}px`;
   circle.style.height = `${size}px`;
   circle.style.top = `${y}px`
   circle.style.left = `${x}px`

   board.append(circle);
}

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
   const color = getRandomColor();
   element.style.background = color;
}

function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length);
   return colors[index];
 }