let ballNumber = 0;
// Tension force constant (Hooks Law)
const k = 0.01;

let imgElement = document.createElement('img');
imgElement.id = 'firstId';
imgElement.src = "ball.png";
document.body.append(imgElement);

const firstball = {
    x: 500,
    y: 100,
    vx: 0,
    vy: 0,
    width: 50,
    height: 50,
    img: document.querySelector('#' + 'firstId'),
}


const balls = [firstball];
const g = 0.1;
const fps = 1000/60;
const forceY = g;
const forceX = 0;
let chains = [];


function applyGravity (ball) {
    ball.vx += forceX;
    ball.vy += forceY;
}

function applyTension (ball) {
    const point = {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
    }
    const rodLength = 100;
    const distY = ball.y - point.y;
    const distX = ball.x - point.x;
    const dist = Math.sqrt(distX*distX + distY*distY);
    const rostyignennya = dist - rodLength;
    const tensionForce = -k * rostyignennya;
    const stepX = distX/dist;
    const stepY = distY/dist;
    ball.vy += tensionForce * stepY;
    ball.vx += tensionForce * stepX;
    /*
    console.log('position: ',ball.y);
    console.log('vy: ',ball.vy);
    console.log('dist: ',dist);
    console.log('rostyignennya: ',rostyignennya);
    console.log('Tension: ',tensionForce);
    console.log('================================================================')
*/
}

function renderImg (ball) {    
    ball.img.className = 'ball';
    ball.img.style.left = ball.x + 'px';
    ball.img.style.top = ball.y + 'px';
}

function move (ball) {
    ball.y += ball.vy;
    ball.x += ball.vx;
}

function renflection (ball) {
    if (ball.y > window.innerHeight - 50 ) {  
        ball.vy = Math.floor(-ball.vy * 0.92); 
    } else { 
        ball.vx += forceX; 
        ball.vy += forceY; 
    } 

    if(ball.x > window.innerWidth - 68) { 
        ball.vx = Math.floor(-ball.vx);
    } else if (ball.x <= -100) { 
        ball.vx = Math.floor(-ball.vx);
    }  
}

let lineElement = document.createElementNS('http://www.w3.org/2000/svg','line');
lineElement.setAttribute('x1',`0`);
lineElement.setAttribute("y1",`100`);
lineElement.setAttribute("x2",`${window.innerWidth}`);
lineElement.setAttribute("y2",`100`);
lineElement.setAttribute("stroke","black");
document.querySelector('#svg').append(lineElement);
//document.querySelector('#svg').setAttribute('viewBox',`0, 0, ${window.innerWidth}, ${window.innerHeight}`);

function  handleMouseClick (event) {
    ballNumber += 1;
    const id = 'ball-' + ballNumber;

    let lastAddBall = balls[balls.length-1];

    let imgElement = document.createElement('img');
    imgElement.id = id;
    imgElement.src = "ball.png";
    document.body.append(imgElement);
    
    let lineElement = document.createElementNS('http://www.w3.org/2000/svg','line');
    lineElement.setAttribute('x1',`${lastAddBall.x}`);
    lineElement.setAttribute("y1",`${lastAddBall.y}`);
    lineElement.setAttribute("x2",`${event.x}`);
    lineElement.setAttribute("y2",`${event.y}`);
    lineElement.setAttribute("stroke","black");
    document.querySelector('#svg').append(lineElement);
    document.querySelector('#svg').setAttribute('viewBox',`0, 0, ${window.innerWidth}, ${window.innerHeight}`);

    //document.querySelector('svg').innerHTML = `<line x1="0" y1="100" x2="100" y2="10" stroke="black" />`;

    const newBall = {
        x: event.x,
        y: event.y,
        vx: 0,
        vy: 0,
        width: 50,
        height: 50,
        img: document.querySelector('#' + id),
    }

    const line = {
        ballStart : lastAddBall, 
        ballEnd : newBall, 
        img : lineElement,
    }

    chains.push(line);
    balls.push(newBall);
    console.log(balls);
}

function time () {
    balls.forEach(move);
    balls.forEach(applyTension);
    balls.forEach(renderImg);
   // balls.forEach(applyGravity);
   // balls.forEach(renflection); 
   // chains.forEach(renderChain);
}

function renderChain(line) { 
    line.img.setAttribute('x1', line.ballStart.x);
    line.img.setAttribute('y1', line.ballStart.y);
    line.img.setAttribute('x2', line.ballEnd.x);
    line.img.setAttribute('y2', line.ballEnd.y);
} 

document.addEventListener('click', handleMouseClick);
setInterval(time, fps);
 