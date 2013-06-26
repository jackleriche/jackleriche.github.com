var screenWidth, 
	screenHeight,
	canvas, 
	ctx,
	playerShip,
	bullet,
	bullets = [],
	invaders = [],
	particles = []; 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 

	ctx.fillStyle = "rgba(0,0,0,0.4)";
	ctx.fillRect(0,0,canvas.width, canvas.height); 

	updateBullets();
	checkKeys();
	checkCollisions();

	renderBullets();
	playerShip.render();
	renderInvaders();
	while(particles.length > 500){

		particles.shift();

	}
	
	for(var i = 0; i<particles.length; i++){

		var p = particles[i];
		p.update();
		p.render();

	}
	
}	

function checkCollisions() {

	for (var i = 0; i<invaders.length; i++){

		var invader = invaders[i];

		var invaderLeft = invader.x,
		invaderRight = invader.x + invader.width,
		invaderTop = invader.y,
		invaderBottom = invader.y + invader.height;

		for(var j = 0; j < bullets.length; j++ ){

			var bullet = bullets[j];

			var bulletTop = bullet.x,
				lastBulletTop = bulletTop - bullet.velY;


			if ((bullet.x > invaderLeft) && (bullet.x < invaderRight) && (bullet.y > invaderTop) && (bullet.y < invaderBottom)) {
			
				//console.log(invader);
				makeParticles(100, invader.x, invader.y);

				bullets.splice(j,1);
				j--;
				
				// remove invader 
				invaders.splice(i,1);
				i--;

				
			}
		}
	}

}
function makeParticles(numParticles, x, y) {

	for (var i = 0; i<numParticles; i++){
		var p = new Particle( x, y);
		p.vel.reset(random(5),0);	
		p.vel.rotate(random(360));
		particles.push(p);
	}


}

function checkKeys() {

	if(KeyTracker.isKeyDown(Key.LEFT)){
		playerShip.moveLeft();
	}

	if (KeyTracker.isKeyDown(Key.RIGHT)){
		playerShip.moveRight();
	}
}

function fireBullet() {

	var bullet = new Bullet();
	
	bullet.x = playerShip.x;
	bullet.y = playerShip.y;

	bullets.push(bullet);

}

function updateBullets() {
	for(var i = 0; i < bullets.length; i++ ){
		var bullet = bullets[i];
		bullet.update();
		if (bullet.y<0){
			bullets.splice(i,1);
			i--;
		}
	}
}

function renderBullets(){
	for(var i = 0; i < bullets.length; i++ ){
		var bullet = bullets[i];
		bullet.render();
	}
}

function createInvaders() {
		
	for( var y = 100; y <= 400; y+=50){

		for(var x = 100; x <= 700; x+=80 ){

			invader = new Invader(x, y);
			invaders.push(invader);

		}
	}
}

function renderInvaders() {

	var speed = map(invaders.length, 0, 50, 0.4, 0.05);

	for( var i = 0; i < invaders.length; i++ ){
		var invader = invaders[i];
		invader.render(speed);
	}
}

function initObjects() { 

	playerShip = new PlayerShip();
	createInvaders();

}

function initVars() { 

	screenWidth = 800; 
	screenHeight = 600; 	

	KeyTracker.addKeyDownListener(' ', fireBullet);
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

//--------- PlayerShip

function PlayerShip() {

	this.x = screenWidth/2;
	this.y = screenHeight - 40;
	this.height = 20;
	this.width = 30;

	// private variable
	var speed  = 6;

	this.render = function() {

		ctx.fillStyle = "pink";
		ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);

	}

	this.moveLeft = function() {
		this.x -= speed;
	}

	this.moveRight = function() {
		this.x += speed;

	}
}

//----------- BulletClass
function Bullet() {

	this.x = 0;
	this.y = 0;
	this.velY = -8;

	this.update = function() {

		this.y += this.velY;

	}

	this.render = function() {

		ctx.fillStyle = "white";
		ctx.fillRect(this.x-1, this.y, 4, 8);


		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x-1, this.y+8, 4, 8);
	}

}

// -------------- Invader
function Invader(x,y) {

	this.x = x;
	this.y = y;

	this.width = 40;
	this.height = 30;

	var counter = map(y+x, 100,400,0,6);
	var speed = 0.2;
	

	this.render = function(speed){

		counter += speed;

		var offset = Math.sin(counter) * 50;

		ctx.fillStyle = "cyan";
		ctx.fillRect(this.x + offset, this.y, this.width, this.height);

	}

}



// 0----------- particles

function Particle(x,y) {

	var pos = this.pos = new Vector2(x,y);
	var vel = this.vel = new Vector2();
	var size = this.size = random(2,10);
	var drag = this.drag = 0.98;
	var shrink = this.shrink = 0.92;
	var color = this.color = hsl(200, 100, random(50, 100));


	this.update = function() {

		pos.plusEq(vel);

		vel.multiplyEq(drag);
		pos.plusEq(vel);
		this.size *= shrink;

		vel.y  += 0.1;

	}

	this.render = function(){

		ctx.fillStyle = color;
		ctx.fillCircle(pos.x, pos.y, size);

	}
}



