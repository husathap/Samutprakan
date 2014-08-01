/* This function contains stuffs about enemies. */

// This is a prototype of an enemy. By using this alone, you will be creating a dummy enemy.
function Enemy() {
	this.bitmap = new createjs.Bitmap(res.getResult("dummy_enemy"));
	this.bitmap.x = 800;
	this.bitmap.y = 300; 
	this.attack = 5;
	
	this.HP = 10;
	this.maxHP = 10;
	
	this.hitRadius = 0;

	this.update = function() {
		this.bitmap.x -= 5;
	}
	
	this.removeFlag = function() {
		return this.bitmap.x < -this.bitmap.getBounds().width;
	};
}

// Data for Brofish!
function Brofish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("brofish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;
}
Brofish.prototype = Object.create(Enemy);

function Catfish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("catfish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;

	this.update = function() {
		var xDiff = curScene.player.bitmap.x - this.bitmap.x;
		var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
		var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
		
		var xUpdate = xDiff / len;
		var yUpdate = yDiff / len;
		
		this.bitmap.x += xUpdate;
		this.bitmap.y += yUpdate;
	};
	
	this.removeFlag = function() { return false; }
}
Catfish.prototype = Object.create(Enemy);

function HorizontalBullet(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("horizontal_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 1;
	this.maxHP = 1;
	
	this.update = function() {
		this.bitmap.x -= 15;
	};
}
HorizontalBullet.prototype = Object.create(Enemy);

function VerticalBullet(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("vertical_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 1;
	this.maxHP = 1;
	
	this.update = function() {
		this.bitmap.y += 5;
	};
	
	this.removeFlag = function() {
		return this.bitmap.y >= stage.canvas.height;
	};
}
Jelly.prototype = Object.create(Enemy);

function ActionFish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("action_fish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;

	var counter = 0;
	
	this.update = function() {
		this.bitmap.x -= 5;
		
		counter++;
		if (counter >= 50) {
			counter = 0;
			
			curScene.addEnemy(new HorizontalBullet(this.bitmap.x, this.bitmap.y + 20));
		}
	};
}
ActionFish.prototype = Object.create(Enemy);

function Jelly(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("jelly"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 10;
	this.maxHP = 10;
	
	this.update = function() {
		this.bitmap.x -= 3;
	};
}
Jelly.prototype = Object.create(Enemy);

function ActionJelly(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("action_jelly"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 10;
	this.maxHP = 10;
	
	var counter = 0;
	
	this.update = function() {
		this.bitmap.x -= 3;
		
		counter++;
		if (counter >= 40) {
			counter = 0;
			
			curScene.addEnemy(new VerticalBullet(this.bitmap.x + 10, this.bitmap.y + 20));
		}
	};
}
Jelly.prototype = Object.create(Enemy);

function EnemyHadoken(x, y, moveX, moveY) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("enemy_hadoken"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.moveX = moveX || -10;
	this.moveY = moveY || 0;
	
	this.HP = 5;
	this.maxHP = 5;
	this.attack = 10;
	this.hitRadius = 55;
	
	this.update = function() {
		this.bitmap.x += this.moveX;
		this.bitmap.y += this.moveY;
	};
	
	this.removeFlag = function() {
		var bounds = this.bitmap.getBounds();
		return this.bitmap.x < -bounds.width || this.bitmap.x > stage.canvas.width ||
			   this.bitmap.y < -bounds.height || this.bitmap.y > stage.canvas.height;
	};
}
EnemyHadoken.prototype = Object.create(Enemy);

function Prescott() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("prescott"));
	this.bitmap.x = 500;
	this.bitmap.y = 300;
	
	this.HP = 30;
	this.maxHP = 30;
	this.attack = 20;
	
	var counter_hadoken = 0;
	var counter_catfish = 0
	
	this.update = function() 
	{
		counter_hadoken += 1;
		
		if (counter_hadoken >= 50) {
			counter_hadoken = 0;
			
			this.bitmap.y = Math.random() * stage.canvas.height;
			
			var xDiff = curScene.player.bitmap.x - this.bitmap.x;
			var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
			var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
			var xUpdate = xDiff / len;
			var yUpdate = yDiff / len;
			
			curScene.addEnemy(new EnemyHadoken(this.bitmap.x - 10, this.bitmap.y + 20, -10));
			if (this.HP <= 20) {
				curScene.addEnemy(new EnemyHadoken(this.bitmap.x - 10, this.bitmap.y + 20, -10, 10));
				curScene.addEnemy(new EnemyHadoken(this.bitmap.x - 10, this.bitmap.y + 20, -10, -10));
			}
		}
		
		if (this.HP <= 10) {
			counter_catfish += 1;
			if (counter_catfish >= 100) {
				counter_catfish = 0;
				
				curScene.addEnemy(new Catfish(this.bitmap.x - 10, this.bitmap.y + 20));
			}
		}
	}
	
	this.removeFlag = function() { return false; }
}
Prescott.prototype = Object.create(Enemy);