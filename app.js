let ballNumber = 0;
/*
const ball = {
    x: 0,
    y: 0,
    vx: 0.5,
    vy: 0,
    width: 100,
    height: 100,
    img: document.querySelector('#ball'),
}
*/
const balls = [];
const g = 0.1;
const fps = 1000/60;
const forceY = g;
const forceX = 0;


function applyGravity (ball) {
    ball.vx += forceX;
    ball.vy += forceY;
}

function renderImg (ball) {    
    ball.img.className = 'ball',
    ball.img.style.left = ball.x + 'px';
    ball.img.style.top = ball.y + 'px';
}

function move (ball) {
    ball.y += ball.vy;
    ball.x += ball.vx;
  
}

function renflection (ball) {
    if (ball.y > window.innerWidth - 100/2) {
        ball.vy = -ball.vy * 0.9;
       
    }
}

function  handleMouseClick (event) {
    const id = 'ball-' + ballNumber;
    
    let imgElement = document.createElement('img');
    imgElement.id = id;
    imgElement.src = "ball.png";
    document.body.append(imgElement);

    const newBall = {
        x: event.x,
        y: event.y,
        vx: 0,
        vy: 0,
        width: 100,
        height: 100,
        img: document.querySelector('#' + id),
    }

    ballNumber += 1;
    
    balls.push(newBall);
    console.log(balls);
}

function time () {
   
    balls.forEach(move);
    balls.forEach(renderImg);
    balls.forEach(applyGravity);
    balls.forEach(renflection);
    /*
    */

}
document.addEventListener('click', handleMouseClick);
setInterval(time, fps);
 