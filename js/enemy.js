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
	
	this.attack = 15;

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
	this.attack = 8;
	
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
	this.attack = 8;
	
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
	this.attack = 8;
	
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
	this.attack = 30;
	
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

function RoundBullet(x, y, moveX, moveY) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("round_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	var bounds = this.bitmap.getBounds();
	
	this.moveX = moveX;
	this.moveY = moveY;

	this.HP = 1;
	this.maxHP = 1;
	this.attack = 1;
	
	this.update = function() {
		this.bitmap.x += this.moveX;
		this.bitmap.y += this.moveY;
	};
	
	this.removeFlag = function() {
		return (this.bitmap.x < -bounds.width || this.bitmap.x > stage.canvas.width ||
			this.bitmap.y < -bounds.height || this.bitmap.y > stage.canvas.height);
	};
}
RoundBullet.prototype = Object.create(Enemy);

function ScouterFish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("scouter_fish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;

	var counter = 0;
	this.attack = 5;
	
	this.update = function() {
		this.bitmap.x -= 5;
		
		counter++;
		if (counter >= 30) {
			counter = 0;
			
			var xDiff = curScene.player.bitmap.x + 50  - this.bitmap.x;
			var yDiff =  curScene.player.bitmap.y + 25 - this.bitmap.y + 20;
			var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
				
			var moveX = xDiff / len * 10;
			var moveY = yDiff / len * 10;
			
			curScene.addEnemy(new RoundBullet(this.bitmap.x, this.bitmap.y + 20, moveX, moveY));
		}
	};
}
ScouterFish.prototype = Object.create(Enemy);

function Dogfish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("dogfish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;
	
	this.attack = 20;

	this.update = function() {
		var xDiff = curScene.player.bitmap.x - this.bitmap.x;
		var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
		var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
		
		var xUpdate = xDiff / len * 8;
		var yUpdate = yDiff / len * 8;
		
		this.bitmap.x += xUpdate;
		this.bitmap.y += yUpdate;
	};
	
	this.removeFlag = function() { return false; }
}
Dogfish.prototype = Object.create(Enemy);

function SuperFish(x, y) {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("super_fish"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 8;
	this.maxHP = 8;
	
	this.attack = 10;

	this.update = function() {
		this.bitmap.x -= 10;
		if (this.bitmap.y < curScene.player.bitmap.y)
			this.bitmap.y += 2;
		else if (this.bitmap.y > curScene.player.bitmap.y)
			this.bitmap.y -= 2;
	};
}
SuperFish.prototype = Object.create(Enemy);

function EvilCarriage(x, y) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("evil_carriage"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.HP = 1000;
	this.maxHP = 1000;
	this.attack = 1000;
	
	this.hitRadius = 90;
	
	this.update = function() {
		this.bitmap.x -= 20;
	}
}
EvilCarriage.prototype = Object.create(Enemy);

function CheeseCurd(x, y, moveX, moveY) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("cheese_curd"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.moveX = moveX;
	this.moveY = moveY;

	this.HP = 1;
	this.maxHP = 1;
	this.attack = 2;
	
	this.appeared = true;
	
	var bounds = this.bitmap.getBounds();
	
	if (this.bitmap.x < -bounds.width || this.bitmap.x > stage.canvas.width ||
		this.bitmap.y < -bounds.height || this.bitmap.y > stage.canvas.height) {
		this.appeared = false;
	}
	
	this.update = function() {
		this.bitmap.x += this.moveX;
		this.bitmap.y += this.moveY;
		
		if (this.bitmap.x >= 0 && this.bitmap.x <= stage.canvas.width &&
			this.bitmap.y >= 0 && this.bitmap.y <= stage.canvas.height)
			this.appeared = true;
	};
	
	this.removeFlag = function() {
		if (this.bitmap.x < -bounds.width || this.bitmap.x > stage.canvas.width ||
			this.bitmap.y < -bounds.height || this.bitmap.y > stage.canvas.height) {
			return this.appeared;
		}
	};
}
CheeseCurd.prototype = Object.create(Enemy);

function PercyZeus() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("percy_zeus"));
	this.bitmap.x = 300;
	this.bitmap.y = 500;
	
	this.HP = 150;
	this.maxHP = 150;
	
	var xReflect = -1;
	var yReflect = 1;
	
	var bounds = this.bitmap.getBounds();
	
	var powerCounter = 0;
	var curPower = 0;
	var counter = 0;
	
	this.update = function() {
		this.bitmap.x += 5 * xReflect;
		this.bitmap.y += 5 * yReflect;
		
		if (this.bitmap.x + bounds.width / 2 <= 0 || this.bitmap.x + bounds.width / 2 >= stage.canvas.width)
			xReflect *= -1;
		if (this.bitmap.y + bounds.height / 2 <= 0 || this.bitmap.y + bounds.height / 2 >= stage.canvas.height)
			yReflect *= -1;
			
		powerCounter++;
		
		if (powerCounter >= 300) {
			powerCounter = 0;
			curPower++;
			
			if (curPower >= 5) {
				curPower = 0;
			}
		}
		
		counter++;
		if (counter >= 40) {
			counter = 0;
			
			switch (curPower) {
				case 0:
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x - 75, -10 - i * 30, 0, 3));

					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 25, -10 - i * 30, 0, 3));
					
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 125, -10 - i * 30, 0, 3));
					break;
				case 1:
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x - 75, -10 - i * 30, 0, 20));
				
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 25, -10 - i * 30, 0, 20));
					
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 125, -10 - i * 30, 0, 20));
					break;
				case 2:
					for (i = 0; i != 2 * Math.PI; i += Math.PI / 4)
						curScene.addEnemy(new CheeseCurd(this.bitmap.x + 20, this.bitmap.y + 20, Math.cos(i) * 3, Math.sin(i) * 3));
				
					break;
				case 3:
					for (i = 0; i != 2 * Math.PI; i += Math.PI / 4)
						curScene.addEnemy(new CheeseCurd(this.bitmap.x + 20, this.bitmap.y + 20, Math.cos(i) * 20, Math.sin(i) * 20));
				
					break;
				case 4:
					for (i = 0; i != 2 * Math.PI; i += Math.PI / 7) {
						curScene.addEnemy(new CheeseCurd(this.bitmap.x + 20, this.bitmap.y + 20, Math.cos(i) * 3, Math.sin(i) * 3));
					}
					
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x - 50, -10 - i * 30, 0, 20));
					
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x - 75, -10 - i * 30, 0, 10));
				
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 25, -10 - i * 30, 0, 5));
					
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 125, -10 - i * 30, 0, 10));
						
					for (i = 0; i < 4; i++)
						curScene.addEnemy(new CheeseCurd(curScene.player.bitmap.x + 150, -10 - i * 30, 0, 20));
					break;
			}
		}
	};
	
	this.removeFlag = function() { return false; };
};
PercyZeus.prototype = Object.create(Enemy);

function ChrisR() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("chris_r"));
	this.bitmap.x = 0;
	this.bitmap.y = 0;
	
	this.HP = 100;
	this.maxHP = 100;
	
	this.attack = 7;
	
	var bulletCounter = 0;
	
	this.update = function () {
		var xDiff = curScene.player.bitmap.x - this.bitmap.x;
		var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
		var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
		var xUpdate = xDiff / len;
		var yUpdate = yDiff / len;
		
		this.bitmap.x += (xUpdate + Math.random() * 2 - 1) * 5;
		this.bitmap.y += (yUpdate + Math.random() * 2 - 1) * 5;
		
		bulletCounter++;
		if (bulletCounter > 20) {
			bulletCounter = 0;
			curScene.addEnemy(new RoundBullet(this.bitmap.x + 100, this.bitmap.y + 100, 
											  Math.cos(Math.random() * 2 * Math.PI),
										      Math.sin(Math.random() * 2 * Math.PI)));
		}
	}
	
	this.removeFlag = function() { return false; };
}
ChrisR.prototype = Object.create(Enemy);

function Johny() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("johny"));
	this.bitmap.x = 600;
	this.bitmap.y = 100;
	
	var xReflect = -1;
	var yReflect = -1;
	
	this.HP = 200;
	this.maxHP = 200;
	
	var counter = 0;
	
	this.update = function() {
		var bounds = this.bitmap.getBounds();
		
		this.bitmap.x += 8 * xReflect;
		this.bitmap.y += yReflect;
		
		if (this.bitmap.x + bounds.width / 2 <= 0 || this.bitmap.x + bounds.width / 2 >= stage.canvas.width) {
			xReflect *= -1;
		}
		if (this.bitmap.y + bounds.height / 2 <= 0 || this.bitmap.y + bounds.height / 2 >= stage.canvas.height - 136) {
			yReflect *= -1;
		}
		
		
		counter++;
		if (this.HP / this.maxHP >= 0.7) {
			if (counter >= 50) {
				counter = 0;
				
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 7) {
					curScene.addEnemy(new EnemyHadoken(this.bitmap.x - 10, this.bitmap.y + 20, Math.cos(i) * 10, Math.sin(i) * 10));
				}
			}
		} else if (this.HP / this.maxHP >= 0.3 && this.HP / this.maxHP <= 0.7) {
			if (counter >= 50) {
				counter = 0;
				
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 7) {
					curScene.addEnemy(new EnemyHadoken(this.bitmap.x - 10, this.bitmap.y + 20, Math.cos(i) * 10, Math.sin(i) * 10));
				}
				
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 10) {
					curScene.addEnemy(new RoundBullet(this.bitmap.x - 10, this.bitmap.y + 20, Math.cos(i) * 20, Math.sin(i) * 20));
				}
			}
		}
	};
	
	this.removeFlag = function() { return false; };
}
Johny.prototype = Object.create(Enemy);

function Danielle() {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("danielle"));
	this.bitmap.x = 500;
	this.bitmap.y = 400;

	this.HP = 90;
	this.maxHP = 90;
	
	var shootCounter = 0;
	var jellyCounter = 0;
	var catCounter = 0;
	var dogCounter = 0;
	var hadokenCounter = 0;
	
	this.update = function () {
		shootCounter++;
		if (shootCounter == 30) {
			shootCounter = 0;
			var xDiff = curScene.player.bitmap.x - this.bitmap.x;
			var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
			var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
			curScene.addEnemy(new RoundBullet(this.bitmap.x + 70, this.bitmap.y + 40, xDiff * 2 / len, yDiff * 2 / len));
		}
		
		jellyCounter++;
		if (jellyCounter == 80) {
			jellyCounter = 0;
			curScene.addEnemy(new Jelly(stage.canvas.width, curScene.player.bitmap.y));
		}
		
		catCounter++;
		if (catCounter == 190) {
			catCounter = 0;
			curScene.addEnemy(new Catfish(stage.canvas.width, curScene.player.bitmap.y));
		}
		
		dogCounter++;
		if (dogCounter == 360) {
			dogCounter = 0;
			curScene.addEnemy(new Dogfish(stage.canvas.width, curScene.player.bitmap.y));
		}
		
		if (this.HP / this.maxHP < 0.2) {
			hadokenCounter++;
			
			if (hadokenCounter > 100) {
				hadokenCounter = 0;
				
				var xDiff = curScene.player.bitmap.x - this.bitmap.x;
				var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
				var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
				curScene.addEnemy(new EnemyHadoken(this.bitmap.x + 10, this.bitmap.y + 10, xDiff * 2 / len, yDiff * 2 / len));
			}
		}
	};
	
	this.removeFlag = function() { return false; };
}
Danielle.prototype = Object.create(Enemy);

function Mark() {
	Enemy.call(this);
	this.bitmap = new createjs.Bitmap(res.getResult("mark"));
	this.bitmap.x = 500;
	this.bitmap.y = 300;
	
	var bounds = this.bitmap.getBounds();
	
	this.HP = 100;
	this.maxHP = 100;
	
	var xReflect = -1;
	var yReflect = 1;
	
	var downloadCounter = 0;
	var ad1Counter = 100;
	var ad2Counter = 200;
	var enemyCounter = 0;
	
	this.update = function() {
		var xDiff = curScene.player.bitmap.x - this.bitmap.x + bounds.width;
		var yDiff = curScene.player.bitmap.y - this.bitmap.y + bounds.height;
		var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
		
		if (len < 300) {
			this.bitmap.x = Math.random() * 800 - bounds.width;
			this.bitmap.y = Math.random() * 600 - bounds.height;
		}
		
		this.bitmap.x += 10 * xReflect;
		this.bitmap.y += 10 * yReflect;
		
		if (this.bitmap.x + bounds.width <= 0 || this.bitmap.x + bounds.width >= stage.canvas.width) {
			xReflect *= -1;
		}
		if (this.bitmap.y + bounds.height <= 0 || this.bitmap.y + bounds.height >= stage.canvas.height) {
			yReflect *= -1;
		}
		
		downloadCounter++;
		
		if (downloadCounter >= 200) {
			downloadCounter = 0;
			curScene.addEnemy(new DownloadButton(Math.random() * 650, -50));
		}
		
		ad1Counter++;
		if (ad1Counter >= 200) {
			ad1Counter = 0;
			curScene.addEnemy(new Ad1(Math.random() * 600, -200));
		}
		
		ad2Counter++;
		if (ad2Counter >= 200) {
			ad2Counter = 0;
			curScene.addEnemy(new Ad2(Math.random() * 600, -200))
		}
		
		enemyCounter++;
		if (enemyCounter >= 300) {
			enemyCounter = 0;
			curScene.addEnemy(new Enemy());
		}
	};
	
	this.removeFlag = function() { return false; };
}
Mark.prototype = Object.create(Enemy);

function DownloadButton(x, y) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("download"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.attack = 2;
	this.HP = 4;
	this.maxHP = 4;
	
	this.update = function() {
		this.bitmap.y += 5;
	};

	this.removeFlag = function() { return this.bitmap.y > stage.canvas.height; };
}
DownloadButton.prototype = Object.create(Enemy);

function Ad1(x, y) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("ad1"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.attack = 2;
	this.HP = 4;
	this.maxHP = 4;
	
	this.update = function() {
		this.bitmap.y += 5 - Math.cos(this.bitmap.y) * 10;
		this.bitmap.x += Math.tan(this.bitmap.y);
	};

	this.removeFlag = function() { return this.bitmap.y > stage.canvas.height; };
}
DownloadButton.prototype = Object.create(Enemy);

function Ad2(x, y) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("ad2"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.attack = 2;
	this.HP = 4;
	this.maxHP = 4;
	
	this.update = function() {
		this.bitmap.y += 5 - Math.sin(this.bitmap.y) * 10;
	};

	this.removeFlag = function() { return this.bitmap.y > stage.canvas.height; };
}
DownloadButton.prototype = Object.create(Enemy);

function ALPHA() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("alpha"));
	this.bitmap.x = 500;
	this.bitmap.y = 400;
	
	this.attack = 1;
	this.HP = 1;
	this.maxHP = 1;
	
	this.update = function() {};
}
ALPHA.prototype = Object.create(Enemy);

function Flame(x, y, moveX, moveY) {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("flame"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	var bounds = this.bitmap.getBounds();
	
	this.moveX = moveX;
	this.moveY = moveY;

	this.HP = 1;
	this.maxHP = 1;
	this.attack = 1;
	
	this.update = function() {
		this.bitmap.x += this.moveX;
		this.bitmap.y += this.moveY;
	};
	
	this.removeFlag = function() {
		return (this.bitmap.x < -bounds.width || this.bitmap.x > stage.canvas.width ||
			this.bitmap.y < -bounds.height || this.bitmap.y > stage.canvas.height);
	};
}

function Sun() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("sun"));
	this.bitmap.x = stage.canvas.width - 100;
	this.bitmap.y = -100;
	
	var yReflect = 1;
	this.HP = 15;
	this.maxHP = 15;
	
	var counter = 0;
	
	this.update = function() {
		this.bitmap.y += 1 * yReflect;
		
		if (this.bitmap.y <= -100 || this.bitmap.y >= stage.canvas.height + 100)
			yReflect *= -1;
			
		counter += Math.PI / 50;
		if (Math.cos(counter) > 0) {
			var xDiff = curScene.player.bitmap.x - this.bitmap.x;
			var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
			var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
			curScene.addEnemy(new Flame(this.bitmap.x + 25, this.bitmap.y + 25, xDiff / len * 4, yDiff / len * 4));
		}
		if (counter > 2 * Math.PI)
			counter = 0;
	};
	
	this.sunTag = true;		// Special tag programming purposes.
}
Sun.prototype = Object.create(Enemy);

function Momoka() {
	Enemy.call(this);
	
	this.bitmap = new createjs.Bitmap(res.getResult("momoka"));
	this.bitmap.x = stage.canvas.width;
	this.bitmap.y = 300;
	
	this.attack = 10;
	this.HP = 180;
	this.maxHP = 180;
	
	var bulletCounter = 0;
	var hadokenCounter = 0;
	var xReflect = 1;
	var yReflect = -1;
	var hasSun = false;
	var hasMoon = false;
	var bounds = this.bitmap.getBounds();
	
	var sinCounter = 0;
	
	this.update = function() {
		
		if (this.HP / this.maxHP <= 1 && this.HP / this.maxHP > .9) {
			if (this.bitmap.x > 500) {
				this.bitmap.x -= 5;
			}
		
			bulletCounter++;
			
			if (bulletCounter >= 50) {
				bulletCounter = 0;
				
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 35) {
					curScene.addEnemy(new RoundBullet(this.bitmap.x + 40, this.bitmap.y + 40, Math.tan(i) * 5 + 1, Math.sin(i) * 5 - 1));
				}
				
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 35) {
					curScene.addEnemy(new RoundBullet(this.bitmap.x + 40, this.bitmap.y + 40, Math.sin(i) * 5 + 1, Math.tan(i) * 5 - 1));
				}
			}
			
			this.bitmap.y -= 5 * yReflect;
			
			if (this.bitmap.y <= 0 || this.bitmap.y >= stage.canvas.height - 158)
				yReflect *= -1;
		} else if (this.HP / this.maxHP <= .9 && this.HP / this.maxHP > .8) {
			sinCounter += Math.PI / 50;
			
			if (Math.sin(sinCounter) > 0) {
				if (sinCounter >= 2 * Math.PI)
					sinCounter = 0;
			
				curScene.addEnemy(new RoundBullet(curScene.player.bitmap.x + 20, -29, 0, 4));
				curScene.addEnemy(new RoundBullet(curScene.player.bitmap.x + 20, stage.canvas.height -1, 0, -4));
				curScene.addEnemy(new RoundBullet(-29, curScene.player.bitmap.y + 20, 4, 0));
				curScene.addEnemy(new RoundBullet(stage.canvas.width - 1, curScene.player.bitmap.y + 20, -4, 0));
			}
		} else if (this.HP / this.maxHP <= .8 && this.HP / this.maxHP > .7) {
			sinCounter += Math.PI / 50;
			
			if (Math.sin(sinCounter) > 0) {
				if (sinCounter >= 2 * Math.PI)
					sinCounter = 0;
			
				curScene.addEnemy(new RoundBullet(curScene.player.bitmap.x + 20, -29, 0, 4));
				curScene.addEnemy(new RoundBullet(curScene.player.bitmap.x + 20, stage.canvas.height -1, 0, -4));
				curScene.addEnemy(new RoundBullet(-29, curScene.player.bitmap.y + 20, 4, 0));
				curScene.addEnemy(new RoundBullet(stage.canvas.width - 1, curScene.player.bitmap.y + 20, -4, 0));
			}
			
			bulletCounter++;
			
			if (bulletCounter == 80) {
				for (i = Math.PI / 3; i <= 2 * Math.PI; i += 2 * Math.PI / 10)
					curScene.addEnemy(new Flame(this.bitmap.x + 30, this.bitmap.y + 50, Math.cos(i) * 10, Math.sin(i) * 10));
			}
			
			if (bulletCounter > 100) {
				bulletCounter = 0;
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 10)
					curScene.addEnemy(new Flame(this.bitmap.x + 30, this.bitmap.y + 50, Math.cos(i) * 10, Math.sin(i) * 10));
			}
		} else if (this.HP / this.maxHP <= .7 && this.HP / this.maxHP > .6) {
			
			this.bitmap.x += 10 * xReflect;
			this.bitmap.y += 10 * yReflect;
		
			if (this.bitmap.x + bounds.width <= 0 || this.bitmap.x + bounds.width >= stage.canvas.width) {
				xReflect *= -1;
			}
			if (this.bitmap.y + bounds.height <= 0 || this.bitmap.y + bounds.height >= stage.canvas.height) {
				yReflect *= -1;
			}
		
			bulletCounter++;
			
			if (bulletCounter == 50) {
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 10)
					curScene.addEnemy(new Flame(this.bitmap.x + 30, this.bitmap.y + 50, Math.cos(i) * 10, Math.sin(i) * 10));
			}
			
			if (bulletCounter > 70) {
				bulletCounter = 0;
				for (i = 0; i <= 2 * Math.PI; i += 2 * Math.PI / 10)
					curScene.addEnemy(new RoundBullet(this.bitmap.x + 30, this.bitmap.y + 50, Math.cos(i) * 15, Math.sin(i) * 15));
			}
		} else if (this.HP / this.maxHP <= .6 && this.HP / this.maxHP > .4) {
			hadokenCounter++;
			
			if (hadokenCounter >= 100) {
				hadokenCounter = 0;
				for (i = 0; i <= 800; i += 300)
					curScene.addEnemy(new EnemyHadoken(i, -149, 0, 20));
				for (i = 0; i <= 600; i += 300)
					curScene.addEnemy(new EnemyHadoken(-149, i, 20, 0));
			}
		} else if (this.HP / this.maxHP <= .3 && this.HP / this.maxHP > .1) {
			if (this.bitmap.x > 400) {
				this.bitmap.x -= 5;
			}
			
			if (!hasSun) {
				curScene.addEnemy(new Sun());
				hasSun = true;
			}
			
			this.bitmap.y -= 5 * yReflect;
			
			if (this.bitmap.y <= 0 || this.bitmap.y >= stage.canvas.height - 158)
				yReflect *= -1;
			
		} else if (this.HP / this.maxHP <= .1) {
			hadokenCounter++;
			if (hadokenCounter >= 100) {
				hadokenCounter = 0;
				var xDiff = curScene.player.bitmap.x - this.bitmap.x;
				var yDiff =  curScene.player.bitmap.y - this.bitmap.y;
				var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
				
				curScene.addEnemy(new EnemyHadoken(this.bitmap.x + 30, this.bitmap.y + 30, xDiff / len * 2, yDiff / len * 2));
			}
		}
	}
}
Momoka.prototype = Object.create(Enemy);