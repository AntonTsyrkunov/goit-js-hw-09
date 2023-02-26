const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalFunction;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startButton.addEventListener('click', startColorsChanging);

stopButton.addEventListener('click', stopColorsChanging);

stopButton.disabled = true;

function startColorsChanging() {
    startButton.disabled = true;
    stopButton.disabled = false;
    intervalFunction = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
} 


function stopColorsChanging () {
    stopButton.disabled = true;
    startButton.disabled = false;
    clearInterval(intervalFunction);
}
console.log(body.style.backgroundColor);
