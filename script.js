const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game variables
const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;
const paddleSpeed = 10;

let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 2;

let paddle1Up = false, paddle1Down = false;
let paddle2Up = false, paddle2Down = false;

// Draw rectangle (paddles)
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Draw circle (ball)
function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Update game state
function update() {
    // Move paddles based on input
    if (paddle1Up && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    } else if (paddle1Down && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }

    if (paddle2Up && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    } else if (paddle2Down && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    }

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball reset if it goes out of bounds
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    // Paddle collision detection
    if (ballX - ballRadius < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

// Draw game elements
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');
    drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');

    // Draw the ball
    drawCircle(ballX, ballY, ballRadius, 'white');
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'w':
            paddle1Up = true;
            break;
        case 's':
            paddle1Down = true;
            break;
        case 'ArrowUp':
            paddle2Up = true;
            break;
        case 'ArrowDown':
            paddle2Down = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'w':
            paddle1Up = false;
            break;
        case 's':
            paddle1Down = false;
            break;
        case 'ArrowUp':
            paddle2Up = false;
            break;
        case 'ArrowDown':
            paddle2Down = false;
            break;
    }
});

// Start the game loop
gameLoop();
