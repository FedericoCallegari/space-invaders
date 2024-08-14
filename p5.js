let invaderImg;
let invaders = [];

let player
let bullets = []

function preload(){
    // Code to run before the rest of the sketch.
    invaderImg = loadImage('invader.gif')
}
function setup() {
    //Code to run once at the start of the sketch
    createCanvas(600, 500)
    player = createPlayer()
    for( let j = 0; j < 3; j++){
        for(let i = 0; i < 6; i++){
            invaders.push(createInvaders(i * 70, j * 70))
        }
    }
}

function draw(){
    //Code to run repeatedly
    background(0);
    showPlayer(player);
    movePlayer(player);
    //Show and move player bullets
    for( let i = bullets.length -1; i >= 0; i--){
        showBullet(bullets[i])
    }

    let limit = false;
    for(i = 0; i < invaders.length; i++){
        showInvaders(invaders[i])
        moveInvaders(invaders[i])
        if(invaders[i].x > width|| invaders[i].x < 0){
            limit = true;
        }
    }
    if(limit){
        for(i = 0; i < invaders.length; i++){
            shiftInvadersDown(invaders[i]);
        }
    }
}

//Player

function createPlayer(){
    return {x: width / 2, y: height - 20, w: 60, h: 20, dir: 0}
}

function showPlayer(player){
    fill(255, 166, 0)
    rect(player.x, player.y, player.w, player.h)
}

function movePlayer(player){
    player.x += player.dir * 5
    player.x = constrain(player.x, 0, width - player.w)
}

function keyPressed(){

    if(keyCode === 32){
        let bullet = createBullet(player.x + player.w / 2, player.y)
        bullets.push(bullet)
    }

    if(keyCode === LEFT_ARROW){
        player.dir = -1;
    }else if(keyCode === RIGHT_ARROW){
        player.dir = 1;
    }
}

function keyReleased(){
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
        player.dir = 0;
    }
}

function createBullet(x, y){
    return {x:x, y:y , r:8 }
}

function showBullet(bullet){
    ellipse(bullet.x, bullet.y, bullet.r * 2, bullet.r * 2)
}

// Invaders

function createInvaders(x, y){
    return {x: x, y: y, r: 60, xdir: 1}
}

function showInvaders(invader){
    image(invaderImg, invader.x, invader.y, invader.r, invader.r)
}
function moveInvaders(invader){
    invader.x += invader.xdir
}
function shiftInvadersDown(invader){
    invader.xdir *= -1
    invader.y += invader.r
}