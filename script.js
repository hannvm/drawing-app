const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const undoBtn = document.getElementById('undoBtn');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let isPressed = false;
let size = 10;
let color = 'black';
let x;
let y;
let lastX;
let lastY;
let history = [];
let historyCounter = -1;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX;
    y = e.offsetY;

});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
    historyCounter ++;
    if (historyCounter < history.length) {
        history.length = historyCounter;
    }
    history.push(canvas.toDataURL());
    console.log(history);
    console.log(historyCounter)
});


canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2,y2);


        x = x2;
        y = y2;

    }
});


function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
};

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

function undo() {
    if (historyCounter > 0) {
        historyCounter --;
        let canvasPic = new Image();
        canvasPic.src = history[historyCounter];
        console.log(canvasPic.src)
        canvasPic.onLoad = () => {ctx.drawImage(canvasPic, 0, 0);}
    }
};




increaseBtn.addEventListener('click', () => {
    size += 2;
    if(size > 50) {
        size = 50
    };
    updateSizeOnScreen()
});

decreaseBtn.addEventListener('click', () => {
    size -= 2;
    if(size < 2) {
        size = 2
    };
    updateSizeOnScreen()
});

colorEl.addEventListener('change', (e) => color = e.target.value);
clearEl.addEventListener('click', () => ctx.clearRect(0,0,canvas.width, canvas.height));
undoBtn.addEventListener('click', (e) => undo());

