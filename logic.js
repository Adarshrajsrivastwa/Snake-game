//variable and constant
let dir={x:0, y:0};
let board=document.querySelector(".board");
let body=document.querySelector("body");
let last=0;
let score=0;
let snake=[{x:15,y:5}];
let food={x:10,y:15};
let a=2;
let b=16;



//function

function generateFoodPosition() {
    food = {
        x: Math.floor(a + (b - a) * Math.random()),
        y: Math.floor(a + (b - a) * Math.random())
    };
}

function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime-last)/1000 )<1/5)
    return;
    last=ctime;
    move(snake);
}

function engine() {
    board.innerHTML = "";
    snake.forEach((e, index) => {
        let snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x; 
        if (index === 0) 
            snakeBody.classList.add('head'); 
        else
        snakeBody.classList.add('part');
        board.appendChild(snakeBody);
    });

    let point = document.createElement('div');
    point.style.gridRowStart = food.y;
    point.style.gridColumnStart = food.x;
    point.classList.add('Item');
    board.appendChild(point);
    isCollide(snake);
}

function isCollide(snake){
for(let i=1;i<snake.length;i++){
    if(snake[i].x===snake[0].x  &&  snake[i].y===snake[0].y){
        body.innerHTML= ` <div class="display"><h1 class="over">Game over</h1>
        <h3 class="result">Your score is ${ score}<h3>
        <button class="btn">Play again</button></div>`
        document.querySelector('.btn').addEventListener('click',()=>{
            window.location.reload();
            score=0;
            dir={x:0, y:0};
            })
        }
}

if (snake[0].x>=18 || snake[0].x<=0 || snake[0].y<=0 || snake[0].y>=18){
body.innerHTML= ` <div class="display"><h1 class="over">Game over</h1>
<h3 class="result">Your score is ${ score}<h3>
<button class="btn">Play again</button></div>`

document.querySelector('.btn').addEventListener('click',()=>{
    window.location.reload();
    score=0;
    dir={x:0, y:0};
    })
}
}
function move(snake){
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]}
    }
    snake[0].x+=dir.x;
    snake[0].y+=dir.y;
    engine();
    isCollide(snake)
    isEat(food,snake);
}

function isEat(food,snake){
    if(snake[0].x===food.x && snake[0].y===food.y){
        score++;
        snake.unshift({x:snake[0].x+dir.x , y:snake[0].y+dir.y});
        generateFoodPosition();
    }
}

//logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    console.log("hello");
    switch (e.key) {
        case "ArrowUp":
            dir.x=0;
            dir.y=-1;
            break;

        case "ArrowDown":
            dir.x=0;
            dir.y=1;
            break;

        case "ArrowLeft":
            dir.y=0;
            dir.x=-1;
            break;

        case "ArrowRight":
            dir.x=1;
            dir.y=0;
            break;
    }
});