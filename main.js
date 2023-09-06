import { Player } from "./player.js"
import { Platform } from "./platform.js"

var board = document.getElementById("board")
var firstplatform = new Platform(0,880,600)
var player1 = new Player(274, 5);
 
var platforms = []

firstplatform.insertPlatform()

player1.insertPlayer()// Ejecutamos la funcion que crea al jugador

window.addEventListener('keydown', function (e) { //Cambiamos la direccion dependiendo de la tecla pulsada
    switch (e.key) {
        case 'a':
            player1.direction = -1
            break
        case 'd':
            player1.direction = 1
            
            break
                
        case 'w':
          
            if (player1.onPlatform === true){
                player1.onPlatform=false
                  player1.jumping = true
                 player1.speedY = -20
            }
            // player1.jump()
            if (player1.onPlatform === true){
                player1.onPlatform=false
                  player1.jumping = true
                 player1.speedY = -20
            }
            // player1.jump()
            break

    }
})

// Función para crear la pantalla de inicio
function createStartScreen() {
    var startScreenDiv = document.createElement("div");
    startScreenDiv.id = "start";

    var title = document.createElement("h1");
    title.textContent = "Floor Is Lava";

    var instructions = document.createElement("p");
    instructions.textContent = "Instrucciones del juego";

    var startButton = document.createElement("button");
    startButton.textContent = "Iniciar Juego";
    startButton.onclick = startGame; 
    startScreenDiv.appendChild(title);
    startScreenDiv.appendChild(instructions);
    startScreenDiv.appendChild(startButton);

    document.body.appendChild(startScreenDiv);
}
window.addEventListener("load", createStartScreen);


var restartButton = document.createElement("button");
restartButton.textContent = "Restart Game";
restartButton.addEventListener("click", restartGame)
var gameOverDiv = document.getElementById("game-over");
gameOverDiv.appendChild(restartButton);

function restartGame() {
    clearInterval(timerId);
    clearInterval(timerId2);

    platforms.forEach(function (platform) {
        platform.sprite.remove();
    });
    platforms = [];

    player1.sprite.remove();

    firstplatform = new Platform(0, 880, 600);
    firstplatform.insertPlatform();
    player1 = new Player(274, 5);
    player1.insertPlayer();
    gameOverDiv.style.display = "none"
    board.style.display = "block"
    start();
}

function checkGameOver() {
    if (player1.y >= 960) { //revisar este valor
        clearInterval(timerId); 
        clearInterval(timerId2); 
        var gameOverDiv = document.getElementById("game-over");
        board.style.display = "none"
        gameOverDiv.style.display = "block"
        ; 
    }
}


window.addEventListener("keyup", function (e) { //Quitamos direccion si dejamos de pulsar
    if (e.key === 'a' || e.key === 'd' || e.key === 'w') {
        player1.direction = 0
        

    }
})

function createplatform() {
  
    var xRandom = Math.floor(Math.random() * 10) * 55 
    var wRandom = Math.floor(Math.random() * (80 - 40 + 1)+40)  // versión arcade
    var platform = new Platform(xRandom,0,wRandom,platforms)
    platform.insertPlatform()
    platforms.push(platform)
    
  }
  

function loop () {
      for (let i = 0; i < platforms.length; i++) {
        platforms[i].fallplatform();
    }
    player1.firstcollision(firstplatform)
    player1.collision(platforms) 
    player1.moveX()
    player1.moveY()
    checkGameOver();
}

var timerId 
var timerId2
function start () {
    timerId = setInterval(loop,22)
    timerId2 = setInterval(createplatform,1200)
}


start()