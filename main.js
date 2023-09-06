import { Player } from "./player.js"
import { Platform } from "./platform.js"
import { Lava } from "./lava.js"


var lava = new Lava(0, 800);
var board = document.getElementById("board")
var firstplatform = new Platform(0,880,600)
var player1 = new Player(274, 5,lava);
var gameAudio = document.getElementById("game-audio");
var gameAudio2 = document.getElementById("game-audio2");

var platforms = []

firstplatform.insertPlatform()
firstplatform.sprite.classList.add("platform1")
firstplatform.sprite.classList.remove("platform")
function playGameAudio() {
    gameAudio.play();
}

gameAudio.addEventListener("canplaythrough", function () {
    playGameAudio();
});

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
var board = document.getElementById("board");
var startButton = document.createElement("button");
startButton.textContent = "Start Game";
var startScreen = document.createElement("div");
startScreen.setAttribute("id", "start");
var gameOverScreen = document.getElementById("game-over");

// Agrega el botón "Start Game" al inicio
startScreen.appendChild(document.createElement("h1")).textContent = "Welcome to My Game";
startButton.addEventListener("click", startGame);
startScreen.appendChild(startButton);
document.body.appendChild(startScreen);

function startGame() {
    // Oculta la pantalla de inicio y muestra el tablero del juego
    startScreen.style.display = "none";
    board.style.display = "block";
    playGameAudio();
}

//Pantalla restart
var restartButton = document.createElement("button");
restartButton.textContent = "Main Menu";
restartButton.addEventListener("click", restartGame)
var gameOverDiv = document.getElementById("game-over");
gameOverDiv.appendChild(restartButton);


function restartGame() {
    location.reload()
    // clearInterval(timerId);
    // clearInterval(timerId2);

    // platforms.forEach(function (platform) {
    //     platform.sprite.remove();
    // });
    // platforms = [];

    // player1.sprite.remove();

    // firstplatform = new Platform(0, 880, 600);
    // firstplatform.insertPlatform();
    // firstplatform.sprite.classList.add("platform1")
    // firstplatform.sprite.classList.remove("platform")
    // player1 = new Player(274, 5);
    // player1.insertPlayer();
    // gameOverDiv.style.display = "none"
    // board.style.display = "block"
    // start();
}

function checkGameOver() {
   console.log(lava.create)
    if (player1.y >= 800 && lava.create === true) { //revisar este valor
        gameAudio.pause();
        clearInterval(timerId); 
        clearInterval(timerId2); 
        player1.score = 0
        lava.create = false
        lava.sprite.style.display = "none"
        gameAudio2.play();

        var newscore = document.getElementById("score")
        newscore.innerHTML = `Puntuacion: ${player1.score}`;
        var gameOverDiv = document.getElementById("game-over");
        board.style.display = "none"
        gameOverDiv.style.display = "block"; 
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
    console.log(player1.score)
}

var timerId 
var timerId2
function start () {
   
    timerId = setInterval(loop,22)
    timerId2 = setInterval(createplatform,1200)
    gameAudio.play()
   
}


start()
