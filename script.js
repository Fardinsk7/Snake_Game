//Game constance and variable
let inputDir ={x: 0,y:0};
const foodSoud = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
const musicSound = new Audio('music.mp3')
let speed = 6;
let snakeArr = [
    {x:13,y:15}
]//it is like 2 dimensional array
let score1 =0;

let food={x: 7,y: 7}
let lastPaintTime =0;

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main)
    // musicSound.play()
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000< 1/speed ){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into your self
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }
    }
    if(snake[0].x >=18|| snake[0].x<=0 ||snake[0].y >= 18|| snake[0].y <= 0){
        return true;
    }
    return false;
}




function gameEngine(){
    //Part 1 Updating the snake array and food       
    // musicSound.play()
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause()
        inputDir ={x:0,y:0}
        alert("Game Over Press any key to Restart")
        snakeArr = [{x:13,y:15}]
        musicSound.play()
        score1=0;
        score.innerHTML ="Score: "+ score1;
    }

    //If  you have eaten the food increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score1 +=1
        score.innerHTML = "Score: "+ score1;


        if(score1 > highscoreval){
            highscoreval = score1
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            hiscorebox.innerHTML="High Score: "+ highscoreval
        }


        foodSoud.play()
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a =2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random()) }

    }

    // Moving the snake
    for(let i = snakeArr.length-2; i >=0;i--){
        // const element  =array[i]
        snakeArr[i+1]= {...snakeArr[i]}

    }
    //When the above loop reach to zero it will get new value which is define by below method
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    //Part 2 Display the snake and Food
    //Display the head
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        // snakeElement.innerHTML("OO")
        if(index === 0){
            snakeElement.classList.add('head') 
          
        }else{
            snakeElement.classList.add('snakepart')

        }
        board.appendChild(snakeElement);
    })
    //Display the food
    
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart= food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
    
    
    
    

   
}






//Main logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval =0
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}else{
    highscoreval = JSON.parse(highscore)
    hiscorebox.innerHTML = "High Score: "+ highscore
}

// head.innerHTML("OO");

window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir ={x: 0,y: 1}
    
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
})

const btnClick= (e)=>{
}
const btn = document.querySelector('.btns')
btn.addEventListener('click',(e)=>{
    console.log(e.target.innerText)

    switch(e.target.innerText){
        case "up":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "down":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "left":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "right":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
})