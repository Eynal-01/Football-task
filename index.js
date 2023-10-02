var canvas = document.querySelector("#canvas");
var context=canvas.getContext("2d");
var ply1 = document.querySelector("#player1");
var ply2 = document.querySelector("#player2");

var init = requestAnimationFrame(Start);
var player1 = new Player(100, 250);
var player2 = new Player(600, 250);
var ball = new Ball(355, 240);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
var upDown = false;
var downDown = false;
var leftDown = false;
var rightDown = false;

function Start(){
    clear();
	renderGates();
	checkKeyboardStatus();
	checkPlayersBounds();
	checkBallBounds();
	checkPlayersBallTouch();
	movePlayers();
	moveBall();
	renderPlayers();
	renderBall();

    ply1.innerHTML = "Player 1 Score: " + player1.score;
	ply2.innerHTML = "Player 2 Score: " + player2.score;

	requestAnimationFrame(Start);
}

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.xVl = 0;
	this.yVl = 0;
	this.dec = 0.07;
	this.size = 10;
}

function Player(x, y) {
	this.x = x;
	this.y = y;
	this.size = 40;
	this.xVl = 0;
	this.yVl = 0;
	this.score = 0;
	this.inc = 0.55;
	this.dec = 0.55;
	this.maxSpeed = 3;
}

function reset() {
	var score1 = player1.score;
	var score2 = player2.score;
	player1 = new Player(100, 250);
	player1.score = score1;
	player2 = new Player(600, 250);
	player2.score = score2;
	ball = new Ball(350, 250);
	wDown = false;
	sDown = false;
	aDown = false;
	dDown = false;
	upDown = false;
	downDown = false;
	leftDown = false;
	rightDown = false;
}

function movePlayers() {
	player1.x += player1.xVl;
	player1.y += player1.yVl;
	player2.x += player2.xVl;
	player2.y += player2.yVl;
}

function checkPlayersBallTouch() { 
	var p1_ball_dis = getDistance(player1.x, player1.y, ball.x, ball.y) - player1.size - ball.size;
	if (p1_ball_dis < 0) {
		Collide(ball, player1);
	}
	var p2_ball_dis = getDistance(player2.x, player2.y, ball.x, ball.y) - player2.size - ball.size;
	if (p2_ball_dis < 0) {
		Collide(ball, player2);
	}
}

function Collide(b, p) {
	var dx = (b.x - p.x) / (b.size);
	var dy = (b.y - p.y) / (b.size);
	p.xVl = -dx;
	p.yVl = -dy;
	b.xVl = dx;
	b.yVl = dy;
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function moveBall() {
	if (ball.xVl !== 0) {
		if (ball.xVl > 0) {
			ball.xVl -= ball.dec;
			if (ball.xVl < 0) ball.xVl = 0;
		} else {
			ball.xVl += ball.dec;
			if (ball.xVl > 0) ball.xVl = 0;
		}
	}
	if (ball.yVl !== 0) {
		if (ball.yVl > 0) {
			ball.yVl -= ball.dec;
			if (ball.yVl < 0) ball.yVl = 0;
		} else {
			ball.yVl += ball.dec;
			if (ball.yVl > 0) ball.yVl = 0;
		}
	}
	ball.x += ball.xVl;
	ball.y += ball.yVl;
}

function checkBallBounds() {
	if (ball.x + ball.size > canvas.width) {
		if (ball.y > 150 && ball.y < 350) {
			player1.score++;
			reset();
			return;
		}
		ball.x = canvas.width - ball.size;
		ball.xVl *= -1.5;
	}
	if (ball.x - ball.size < 0) {
		if (ball.y > 150 && ball.y < 350) {
			player2.score++;
			reset();
			return;
		}
		ball.x = 0 + ball.size;
		ball.xVl *= -1.5;
	}
	if (ball.y + ball.size > canvas.height) {
		ball.y = canvas.height - ball.size;
		ball.yVl *= -1.5;
	}
	if (ball.y - ball.size < 0) {
		ball.y = 0 + ball.size;
		ball.yVl *= -1.5;
	}
}

function checkPlayersBounds() {
	if (player1.x + player1.size > canvas.width) {
		player1.x = canvas.width - player1.size;
		player1.xVl *= -0.5;
	}
	if (player1.x - player1.size < 0) {
		player1.x = 0 + player1.size;
		player1.xVl *= -0.5;
	}
	if (player1.y + player1.size > canvas.height) {
		player1.y = canvas.height - player1.size;
		player1.yVl *= -0.5;
	}
	if (player1.y - player1.size < 0) {
		player1.y = 0 + player1.size;
		player1.yVl *= -0.5;
	}
	if (player2.x + player2.size > canvas.width) {
		player2.x = canvas.width - player2.size;
		player2.xVl *= -0.5;
	}
	if (player2.x - player2.size < 0) {
		player2.x = 0 + player2.size;
		player2.xVl *= -0.5;
	}
	if (player2.y + player2.size > canvas.height) {
		player2.y = canvas.height - player2.size;
		player2.yVl *= -0.5;
	}
	if (player2.y - player2.size < 0) {
		player2.y = 0 + player2.size;
		player2.yVl *= -0.5;
	}
}

function checkKeyboardStatus() {
	if (wDown) {
		if (player1.yVl > -player1.maxSpeed) {
			player1.yVl -= player1.inc;
		} else {
			player1.yVl = -player1.maxSpeed;
		}
	} else {
		if (player1.yVl < 0) {
			player1.yVl += player1.dec;
			if (player1.yVl > 0) player1.yVl = 0;
		}
	}
	if (sDown) {
		if (player1.yVl < player1.maxSpeed) {
			player1.yVl += player1.inc;
		} else {
			player1.yVl = player1.maxSpeed;
		}
	} else {
		if (player1.yVl > 0) {
			player1.yVl -= player1.dec;
			if (player1.yVl < 0) player1.yVl = 0;
		}
	}
	if (aDown) {
		if (player1.xVl > -player1.maxSpeed) {
			player1.xVl -= player1.inc;
		} else {
			player1.xVl = -player1.maxSpeed;
		}
	} else {
		if (player1.xVl < 0) {
			player1.xVl += player1.dec;
			if (player1.xVl > 0) player1.xVl = 0;
		}
	}
	if (dDown) {
		if (player1.xVl < player1.maxSpeed) {
			player1.xVl += player1.inc;
		} else {
			player1.xVl = player1.maxSpeed;
		}
	} else {
		if (player1.xVl > 0) {
			player1.xVl -= player1.dec;
			if (player1.xVl < 0) player1.xVl = 0;
		}
	}



	if (upDown) {
		if (player2.yVl > -player2.maxSpeed) {
			player2.yVl -= player2.inc;
		} else {
			player2.yVl = -player2.maxSpeed;
		}
	} else {
		if (player2.yVl < 0) {
			player2.yVl += player2.dec;
			if (player2.yVl > 0) player2.yVl = 0;
		}
	}
	if (downDown) {
		if (player2.yVl < player2.maxSpeed) {
			player2.yVl += player2.inc;
		} else {
			player2.yVl = player2.maxSpeed;
		}
	} else {
		if (player2.yVl > 0) {
			player2.yVl -= player2.dec;
			if (player2.yVl < 0) player2.yVl = 0;
		}
	}
	if (leftDown) {
		if (player2.xVl > -player2.maxSpeed) {
			player2.xVl -= player2.inc;
		} else {
			player2.xVl = -player2.maxSpeed;
		}
	} else {
		if (player2.xVl < 0) {
			player2.xVl += player2.dec;
			if (player2.xVl > 0) player2.xVl = 0;
		}
	}
	if (rightDown) {
		if (player2.xVl < player2.maxSpeed) {
			player2.xVl += player2.inc;
		} else {
			player2.xVl = player2.maxSpeed;
		}
	} else {
		if (player2.xVl > 0) {
			player2.xVl -= player2.dec;
			if (player2.xVl < 0) player2.xVl = 0;
		}
	}
}

document.onkeyup = function (e) {
	if (e.keyCode === 87) {
		wDown = false;
	}
	if (e.keyCode === 65) {
		aDown = false;
	}
	if (e.keyCode === 68) {
		dDown = false;
	}
	if (e.keyCode === 83) {
		sDown = false;
	}
	if (e.keyCode === 38) {
		upDown = false;
	}
	if (e.keyCode === 37) {
		leftDown = false;
	}
	if (e.keyCode === 40) {
		downDown = false;
	}
	if (e.keyCode === 39) {
		rightDown = false;
	}
}

document.onkeydown = function (e) {
	if (e.keyCode === 87) {
		wDown = true;
	}
	if (e.keyCode === 65) {
		aDown = true;
	}
	if (e.keyCode === 68) {
		dDown = true;
	}
	if (e.keyCode === 83) {
		sDown = true;
	}
	if (e.keyCode === 38) {
		upDown = true;
	}
	if (e.keyCode === 37) {
		leftDown = true;
	}
	if (e.keyCode === 40) {
		downDown = true;
	}
	if (e.keyCode === 39) {
		rightDown = true;
	}
}

function renderBall() {
	context.save();
	context.beginPath();
	context.fillStyle = "transparent";
	let img = new Image();
	img.src = "images/bal.png";
	context.drawImage(img,ball.x-17, ball.y-18, ball.size+15,ball.size+15);
	context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	context.fill();
	context.closePath();
	context.restore();
}

function renderPlayers() {
	context.save();
	context.fillStyle = "transparent";
	context.beginPath();
	let img = new Image();
	img.src = "images/player2.png";
	context.drawImage(img,player1.x-40, player1.y-40, 85,80);
	context.arc(player1.x,player1.y,player1.size,0,Math.PI*2);
	context.fill();
	context.closePath();
	context.beginPath();
	let img2 = new Image();
	img2.src = "images/player1.png";
	context.drawImage(img2,player2.x-40, player2.y-40, 85,80);
	context.arc(player2.x,player2.y,player1.size,0,Math.PI*2);
	context.fill();
	context.closePath();
	context.restore();
}

function renderGates() {
	let With = 21;
	context.save();
	context.beginPath();
	context.moveTo(0, 175);
	context.lineTo(0, 290);
	context.strokeStyle = "white";
	context.lineWidth = With;
	context.stroke();
	context.closePath();
	context.beginPath();
	context.moveTo(canvas.width, 175);
	context.lineTo(canvas.width, 290);

	context.lineWidth = With;
	context.stroke();
	context.closePath();
	context.restore();
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}