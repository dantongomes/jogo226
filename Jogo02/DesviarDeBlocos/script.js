const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações iniciais
const playerWidth = 50;  // Aumentado
const playerHeight = 50;  // Aumentado
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerSpeed = 7;
let rightPressed = false;
let leftPressed = false;

// Obstáculos
let obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 20;
const obstacleSpeed = 3;
let frames = 0;
let score = 0;

// Imagens
const playerImage = new Image();
playerImage.src = 'bobesponja.png'; // Substitua pelo caminho correto

const obstacleImage = new Image();
obstacleImage.src = 'chocolate.png'; // Substitua pelo caminho correto

// Controle do jogador
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Gera obstáculos
function generateObstacles() {
    if (frames % 90 === 0) {
        let randomX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
        obstacles.push({ x: randomX, y: 0 });
    }
}

// Movimenta e desenha os obstáculos
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;

        // Verifica se o obstáculo saiu da tela
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }

        // Verifica colisão com o jogador
        if (
            playerX < obstacles[i].x + obstacleWidth &&
            playerX + playerWidth > obstacles[i].x &&
            playerY < obstacles[i].y + obstacleHeight &&
            playerY + playerHeight > obstacles[i].y
        ) {
            alert(`Game Over! Sua pontuação: ${score} | Pressione F5 para reiniciar`);
            document.location.reload();
        }
    }
}

// Desenha o jogador
function drawPlayer() {
    ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);
}

// Desenha os obstáculos
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacleImage, obstacles[i].x, obstacles[i].y, obstacleWidth, obstacleHeight);
    }
}

// Função principal do jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimenta o jogador
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
    if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }

    // Gerencia os obstáculos
    generateObstacles();
    moveObstacles();

    // Desenha o jogo
    drawPlayer();
    drawObstacles();

    // Atualiza os frames
    frames++;

    // Exibe a pontuação
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${score}`, 10, 20);

    requestAnimationFrame(drawGame);
}

// Verifica se as imagens estão carregadas antes de iniciar o jogo
let imagesLoaded = 0;
const totalImages = 2;

playerImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) drawGame();
};

obstacleImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) drawGame();
};
