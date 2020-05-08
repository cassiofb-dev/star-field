let width = screen.width, height = screen.height;
let stars = [], stars_number = width * 2, speed = 1, angle = 0, angle_speed = 0;

function Star(){
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(width);
		this.color = [random(255),random(255),random(255)];

	this.remake = function(){
		this.z -= speed;
		if(this.z < 1 || this.z > width) {
			this.x = random(-width, width);
			this.y = random(-height, height);
			this.z = random(width);
			this.color = [random(255),random(255),random(255)];
		};
	}

	this.render = function(){
		noStroke();
		fill(this.color);
		let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, height);

		let r = map(this.z, 0, width, 20, 0);
		ellipse(sx, sy, r, r);
	}
}

function setup() {
	createCanvas(width,height);
	for(let i = 0; i < stars_number; i++){
		stars[i] = new Star();
	}
}

function draw() {
	angle += angle_speed;
	background(0);
	translate(width/2, height/2);
	rotate(angle);
	for(let i = 0; i < stars_number; i++){
		stars[i].remake();
		stars[i].render();
	}
}

function keyPressed(){
	switch(keyCode){
		case UP_ARROW:
			speed++;
			break;
		case DOWN_ARROW:
			speed--;
			break;
		case LEFT_ARROW:
			angle_speed -= PI/360;
			break;
		case RIGHT_ARROW:
			angle_speed += PI/360;
			break;
		case ENTER:
			speed = 2;
			angle_speed = 0;
			break;
		default:
			return false;
	}
}

function mousePressed(){
	angle_speed = map(mouseY, 0, height, -PI/60, PI/60);
	speed = map(mouseX, 0 , width, -20, 20);
}