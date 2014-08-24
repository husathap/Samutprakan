// This file contains the prototype for creating level.
function Player() {

	// Setting up the sprite.
	this.bitmap = new createjs.Bitmap(res.getResult("hero"));
	
	var playerBounds = this.bitmap.getBounds();
	this.bitmap.x = (stage.canvas.width - playerBounds.width) / 2;
	this.bitmap.y = (stage.canvas.height - playerBounds.height) / 2;
	
	// Set up the alternative hit detection system.
	this.hitRadius = 12.5;
	
	// Set up the variables.
	this.HP = 50;
	this.maxHP = 50;
	this.PP = 100;
	this.maxPP = 200;
	this.mode = "Default";
	this.invincibleFrame = 100;
	this.invincibleFrameCounter = 0;
}

// Player's bullets //////////////////////////////////////////////////////

function SmallPlayerBullet(x, y) {
	this.bitmap = new createjs.Bitmap(res.getResult("player_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.attack = 1;
	this.hitRadius = 10;
	
	this.update = function() {
		this.bitmap.x += 20;
	}
	
	this.removeFlag = function() {
		return this.bitmap.x > stage.canvas.width;
	}
}

function HadokenPlayerBullet(x, y) {
	this.bitmap = new createjs.Bitmap(res.getResult("hadoken_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	
	this.attack = 5;
	this.hitRadius = 50;
	
	this.update = function() {
		this.bitmap.x += 20;
	}
	
	this.removeFlag = function() {
		return this.bitmap.x > stage.canvas.width;
	}
}

function FlowerPlayerBullet(x, y, TrajX, TrajY) {
	this.bitmap = new createjs.Bitmap(res.getResult("flower_bullet"));
	this.bitmap.x = x;
	this.bitmap.y = y;
	this.TrajX = TrajX;
	this.TrajY = TrajY;
	
	this.attack = 1;
	this.hitRadius = 5;
	
	this.update = function() {
		this.bitmap.x += this.TrajX;
		this.bitmap.y += this.TrajY;
	}
	
	this.removeFlag = function() {
		return (this.bitmap.x > stage.canvas.width || this.bitmap.x < -20 ||
			    this.bitmap.y > stage.canvas.height || this.bitmap.y < -20);
	}
}

//////////////////////////////////////////////////////////////////

function Level() {
	Scene.call(this);
	
	if (curBackgroundMusic != null)
		curBackgroundMusic.stop();
	
	// Set up the waves.
	this.waves = [];
	
	this.firing = false;

	// Set up the layers.
	this.backgroundLayer = new createjs.Container();
	this.playerBulletsLayer = new createjs.Container();
	this.enemyLayer = new createjs.Container();
	this.player = new Player();
	this.foreground = new createjs.Container();
	this.UILayer = new createjs.Container();
	this.pauseLayer = new createjs.Bitmap(res.getResult("pause_screen"));
	this.pauseLayer.alpha = 0;
	
	this.container.addChild(this.backgroundLayer);
	this.container.addChild(this.playerBulletsLayer);
	this.container.addChild(this.enemyLayer);
	this.container.addChild(this.player.bitmap);
	this.container.addChild(this.foreground);
	this.container.addChild(this.UILayer);
	this.container.addChild(this.pauseLayer);
	
	// Create the GUI. ///////////////////////////////////////////////////////
	
	// Create the navigation bar.
	var bar = new createjs.Shape();
	bar.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 40);
	bar.alpha = 0.8;
	this.UILayer.addChild(bar);
	
	// Set up the HP section.
	this.HPText = new createjs.Text("HP:", "20px Lucida Console", "#008000");
	this.HPText.x = 10;
	this.HPText.y = 10;
	
	var HPBack = new createjs.Shape();
	HPBack.graphics.beginFill("#C0C0C0").drawRect(50, 10, 150, 20);
	
	this.HPBar = new createjs.Shape();
	this.HPBar.graphics.beginFill("#008000").drawRect(50, 10, 150 * (this.player.HP / this.player.maxHP), 20);
	
	this.UILayer.addChild(this.HPText);
	this.UILayer.addChild(HPBack);
	this.UILayer.addChild(this.HPBar);
	
	// Set up the SP section.
	this.PPText = new createjs.Text("PP:", "20px Lucida Console", "#808000");
	this.PPText.x = 220;
	this.PPText.y = 10;
	
	var PPBack = new createjs.Shape();
	PPBack.graphics.beginFill("#C0C0C0").drawRect(260, 10, 150, 20);
	
	this.PPBar = new createjs.Shape();
	this.PPBar.graphics.beginFill("#808000").drawRect(260, 10, 150 * (this.player.PP / this.player.maxPP), 20);
	
	this.player.mode = "default";
	
	this.defaultIcon = new createjs.Bitmap(res.getResult("default_icon_on"));
	this.defaultIcon.x = 450;
	this.defaultIcon.addEventListener("click", function(e) {
		curScene.defaultIcon.image = res.getResult("default_icon_on");
		curScene.hadokenIcon.image = res.getResult("hadoken_icon_off");
		curScene.flowerIcon.image = res.getResult("flower_icon_off");
		curScene.player.mode = "default";
	});
	
	this.hadokenIcon = new createjs.Bitmap(res.getResult("hadoken_icon_off"));
	this.hadokenIcon.x = 490;
	this.hadokenIcon.addEventListener("click", function(e) {
		curScene.defaultIcon.image = res.getResult("default_icon_off");
		curScene.hadokenIcon.image = res.getResult("hadoken_icon_on");
		curScene.flowerIcon.image = res.getResult("flower_icon_off");
		curScene.player.mode = "hadoken";
	});
	
	this.flowerIcon = new createjs.Bitmap(res.getResult("flower_icon_off"));
	this.flowerIcon.x = 520;
	this.flowerIcon.addEventListener("click", function(e) {
		curScene.defaultIcon.image = res.getResult("default_icon_off");
		curScene.hadokenIcon.image = res.getResult("hadoken_icon_off");
		curScene.flowerIcon.image = res.getResult("flower_icon_on");
		curScene.player.mode = "flower";
	});
	
	// Dealing with pausing in the game.
	this.paused = false;
	
	this.pauseIcon = new createjs.Bitmap(res.getResult("pause_icon"));
	this.pauseIcon.x = 560;
	this.pauseIcon.addEventListener("click", function(e) {
		curScene.paused = true;
		curScene.pauseLayer.alpha = 1;
		
		if (curBackgroundMusic != null)
			curBackgroundMusic.pause();
	});
	
	// Create the unpause function.
	this.pauseLayer.addEventListener("click", function() {
		curScene.paused = false;
		curScene.pauseLayer.alpha = 0;
		if (curBackgroundMusic != null)
			curBackgroundMusic.resume();
	});
	
	this.UILayer.addChild(this.PPText);
	this.UILayer.addChild(PPBack);
	this.UILayer.addChild(this.PPBar);
	this.UILayer.addChild(this.defaultIcon);
	this.UILayer.addChild(this.hadokenIcon);
	this.UILayer.addChild(this.flowerIcon);
	this.UILayer.addChild(this.pauseIcon);
	
	// Set up the player's character controls. ///////////////////////////////
	this.player.bitmap.addEventListener("pressmove", function(e) {
		var playerBounds = curScene.player.bitmap.getBounds();
	
		e.target.x = e.stageX - playerBounds.width / 2;
		e.target.y = e.stageY - playerBounds.height / 2;
		
		curScene.firing = true;
	});
	this.player.bitmap.addEventListener("pressup", function(e) {
		curScene.firing = false;
	});
	
	// Set up the bullets and enemies. /////////////////////////////////////////////
	this.playerBullets = [];
	this.enemies = [];
	this.foregroundElements = [];
	
	// Set up the update logic.
	this.updateMisc = function() {};	// This is for updating other stuffs.

	this.PPCounter = 0;
	this.modeDefaultCounter = 0;
	this.modeHadokenCounter = 0;
	this.modeFlowerCounter = 0;
	
	this.update = function() {			// This is for updating the main stuffs.
		// Update when the game is paused.
		if (this.paused)
			return;
	
		// Update other miscellaneous things.
		this.updateMisc();

		// Update the waves.
		if (this.enemies.length == 0 && this.foregroundElements == 0) {
			if (this.waves.length > 0) {
				this.waves[0]();
				this.waves.splice(0, 1);
			} else
				this.afterLevel();
		}
		
		if (this.firing) {
		// Update the firing.
			switch(this.player.mode) {
			case "default":
				this.modeDefaultCounter++;
				
				if (this.modeDefaultCounter >= 5) {
					this.modeDefaultCounter = 0;
					
					var playerBounds = this.player.bitmap.getBounds();
					var newPlayerBullet = new SmallPlayerBullet(
											this.player.bitmap.x + playerBounds.width / 2,
											this.player.bitmap.y + playerBounds.height / 2);
					this.playerBullets.push(newPlayerBullet);
					this.playerBulletsLayer.addChild(newPlayerBullet.bitmap);
				}
				
				break;
			case "hadoken":
				this.modeHadokenCounter++;
				if (this.modeHadokenCounter >= 20) {
					this.modeHadokenCounter = 0;
					
					var playerBounds = this.player.bitmap.getBounds();
					var newPlayerBullet = new HadokenPlayerBullet(
											this.player.bitmap.x + playerBounds.width / 2,
											this.player.bitmap.y + playerBounds.height / 2);
					this.playerBullets.push(newPlayerBullet);
					this.playerBulletsLayer.addChild(newPlayerBullet.bitmap);
					
					this.player.PP -= 20;
					if (this.player.PP <= 0) {
						this.player.PP = 0;
						this.player.mode = "default";
						
						this.defaultIcon.image = res.getResult("default_icon_on");
						this.hadokenIcon.image = res.getResult("hadoken_icon_off");
						
					}
				}
				
				break;
			case "flower":
				this.modeFlowerCounter++;
				if (this.modeFlowerCounter >= 2) {
					this.modeFlowerCounter = 0;
					
					var playerBounds = this.player.bitmap.getBounds();
					var newPlayerBullet = new FlowerPlayerBullet(
											this.player.bitmap.x + playerBounds.width / 2,
											this.player.bitmap.y + playerBounds.height / 2,
											(Math.random() * 2 - 1) * 5,
											(Math.random() * 2 - 1) * 5);
					this.playerBullets.push(newPlayerBullet);
					this.playerBulletsLayer.addChild(newPlayerBullet.bitmap);
					
					this.player.PP -= 2;
					if (this.player.PP <= 0) {
						this.player.PP = 0;
						this.player.mode = "default";
						
						this.defaultIcon.image = res.getResult("default_icon_on");
						this.flowerIcon.image = res.getResult("flower_icon_off");
						
					}
				}
				break;
			}
		}
		
		// Update the enemies.

		var i = 0;
		while (i < this.enemies.length) {
			this.enemies[i].update();
			if (this.player.invincibleFrameCounter == 0) {
				if (this.enemies[i].hitRadius > 0) {
					var enemyBound = this.enemies[i].bitmap.getBounds();
					var playerBound = this.player.bitmap.getBounds();
					
					var xDiff = Math.abs((this.player.bitmap.x + playerBound.width / 2) - (this.enemies[i].bitmap.x + enemyBound.width / 2));
					var yDiff = Math.abs((this.player.bitmap.y + playerBound.height / 2) - (this.enemies[i].bitmap.y + enemyBound.height / 2));
					
					var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
					
					if (len < this.enemies[i].hitRadius + this.player.hitRadius) {
						this.player.HP -= this.enemies[i].attack;
						createjs.Sound.play("player_hit");
						
						this.player.invincibleFrameCounter = this.player.invincibleFrame;
						this.player.bitmap.alpha = 0.5;
					}
					
				} else {
					if (ndgmr.checkPixelCollision(this.enemies[i].bitmap, this.player.bitmap)) {
						this.player.HP -= this.enemies[i].attack;
						createjs.Sound.play("player_hit");
						
						this.player.invincibleFrameCounter = this.player.invincibleFrame;
						this.player.bitmap.alpha = 0.5;
					}
				}
			}
			
			if (this.enemies[i].removeFlag()) {
				this.enemyLayer.removeChildAt(i);
				this.enemies.splice(i, 1);
				i--;
			}
			i++;
		}
		
		// Update the game over scene and making sure that the player's HP isn't over 100%.
		if (this.player.HP <= 0) {
			if (curBackgroundMusic != null)
				curBackgroundMusic.stop();
			curScene = new GameOverScene();
		} else if (this.player.HP > this.player.maxHP) {
			this.player.HP = thisplayer.maxHP;
		}
		
		// Update the player's invincibility period.
		if (this.player.invincibleFrameCounter > 0) {
			this.player.invincibleFrameCounter--;
			
			if (this.player.invincibleFrameCounter == 0) {
				this.player.bitmap.alpha = 1;
			}
		}
		
		// Update the player's bullet.
		i = 0;
		while (i < this.playerBullets.length) {
			this.playerBullets[i].update();
			
			var j = 0;
			while (j < this.enemies.length) {
				if (this.playerBullets[i].hitRadius > 0 && this.enemies[j].hitRadius > 0) {
					var enemyBound = this.enemies[j].bitmap.getBounds();
					var playerBulletBound = this.playerBullets[i].bitmap.getBounds();
					
					var xDiff = Math.abs((this.playerBullets[i].bitmap.x + playerBulletBound.width / 2) - (this.enemies[j].bitmap.x + enemyBound.width / 2));
					var yDiff = Math.abs((this.playerBullets[i].bitmap.y + playerBulletBound.height / 2) - (this.enemies[j].bitmap.y + enemyBound.height / 2));
					
					var len = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
					
					if (len < this.enemies[j].hitRadius + this.playerBullets[i].hitRadius) {
						this.enemies[j].HP -= this.playerBullets[i].attack;
						
						this.playerBulletsLayer.removeChildAt(i);
						this.playerBullets.splice(i, 1);
						createjs.Sound.play("enemy_hit", createjs.Sound.INTERRUPT_ANY);
						
						if (this.enemies[j].HP <= 0) {
							this.enemyLayer.removeChildAt(j);
							this.enemies.splice(j, 1);
						}
						i--;
						break;
					}
				} else {
					if (ndgmr.checkPixelCollision(this.enemies[j].bitmap,
						this.playerBullets[i].bitmap)) {
						this.enemies[j].HP -= this.playerBullets[i].attack;
						
						this.playerBulletsLayer.removeChildAt(i);
						this.playerBullets.splice(i, 1);
						createjs.Sound.play("enemy_hit", createjs.Sound.INTERRUPT_ANY);
						
						if (this.enemies[j].HP <= 0) {
							this.enemyLayer.removeChildAt(j);
							this.enemies.splice(j, 1);
						}
						i--;
						break;
					}
				}
				j++;
			}
			i++;
		}
		
		i = 0;
		while (i < this.playerBullets.length) {
			if (this.playerBullets[i].removeFlag()) {
				this.playerBulletsLayer.removeChildAt(i);
				this.playerBullets.splice(i, 1);
				i--;
			}
			
			i++;
		}
		
		// Replenish PP over time.
		if (this.player.PP < this.player.maxPP) {
			this.PPCounter++;
			if (this.PPCounter >= 10) {
				this.PPCounter = 0;
				this.player.PP += 5;
			}
		} else {  // Make sure that there is not too much PP.
			this.player.PP = this.player.maxPP;
		}
		
		// Update the foreground elements
		i = 0;
		while (i < this.foregroundElements.length) {
			this.foregroundElements[i].update();
			
			if (this.foregroundElements[i].removeFlag()) {
				this.foreground.removeChildAt(i);
				this.foregroundElements[i].splice(i, 1);
				i--;
			}
			
			i++;
		}
		
		// Update the UI.
		this.PPBar.graphics.clear();
		this.PPBar.graphics.beginFill("#808000").drawRect(260, 10, 150 * (this.player.PP / this.player.maxPP), 20);
		this.HPBar.graphics.clear();
		this.HPBar.graphics.beginFill("#008000").drawRect(50, 10, 150 * (this.player.HP / this.player.maxHP), 20);
	};
	
	this.afterLevel = function() {
		if (curBackgroundMusic != null) {
			curBackgroundMusic.stop();
		}
		curScene = new TitleScene() 
	};
	
	this.addEnemy = function(enemy) {
		this.enemies.push(enemy);
		this.enemyLayer.addChild(enemy.bitmap);
	};
}
Level.prototype = Object.create(Scene);

// This is the test level. Used for debugging! //
function TestLevel() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap("img/debug_bg.png"));

	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("stage", {loop:-1});
		curScene.addEnemy(new ScouterFish(stage.canvas.width + 100, 300));
		curScene.addEnemy(new Brofish(stage.canvas.width + 50, 200));
	});
	this.waves.push(function() {
		curScene.addEnemy(new Dogfish(stage.canvas.width + 200, 400));
	});
	this.waves.push(function() {
		curScene.addEnemy(new SuperFish(stage.canvas.width + 100, 100));
	});
	this.waves.push(function() {
		curBackgroundMusic.stop();
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Prescott());
	});
	this.waves.push(function() {
		curBackgroundMusic.stop();
	});
}
TestLevel.prototype = Object.create(Level);

// Create your level here! /////////////////////////////////////////////
function Level1() {
	Level.call(this);
	
	var bg1 = new createjs.Bitmap(res.getResult("level1_background"));
	bg1.x = 0;
	var bg2 = new createjs.Bitmap(res.getResult("level1_background"));
	bg2.x = 800;
	
	this.backgroundLayer.addChild(bg1);
	this.backgroundLayer.addChild(bg2);
	
	this.updateMisc = function() {
		bg1.x -= 10;
		bg2.x -= 10;
		
		if (bg1.x <= -800) {
			bg1.x = 0;
			bg2.x = 800;
		}
	}
	
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("stage", {loop:-1});
		curScene.addEnemy(new ActionFish(stage.canvas.width + 100, 300));
		curScene.addEnemy(new Brofish(stage.canvas.width + 50, 200));
	});
	this.waves.push(function() {
		curScene.addEnemy(new Jelly(stage.canvas.width + 200, 400));
	});
	this.waves.push(function() {
		curScene.addEnemy(new ActionJelly(stage.canvas.width + 100, 100));
		curScene.addEnemy(new Catfish(stage.canvas.width + 50, 300));
	});
	this.waves.push(function() {
		for (i = 100; i <= 250; i += 50)
			curScene.addEnemy(new ActionJelly(stage.canvas.width + 100, i));

		curScene.addEnemy(new ActionFish(stage.canvas.width + 50, 100));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 50, 200));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 50, 400));
		
		for (i = 100; i <= 250; i += 50)
			curScene.addEnemy(new ActionJelly(stage.canvas.width + 150, i));

		curScene.addEnemy(new ActionFish(stage.canvas.width + 200, 500));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 200, 100));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 200, 200));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 200, 400));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 200, 500));
	});
	this.waves.push(function() {
		for (i = 0; i <= 600; i += 100)
			curScene.addEnemy(new Catfish(stage.canvas.width + 50, i));

		curScene.addEnemy(new Brofish(stage.canvas.width + 100, 300));
		for (i = 0; i <= 600; i += 100)
			curScene.addEnemy(new Catfish(stage.canvas.width + 150, i));

		
		curScene.addEnemy(new ActionFish(stage.canvas.width + 350, 500));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 350, 100));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 350, 200));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 350, 400));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 350, 500));
	});
	this.waves.push(function() {
		curScene.addEnemy(new ActionFish(stage.canvas.width + 40, 100));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 40, 200));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 40, 400));
		curScene.addEnemy(new ActionFish(stage.canvas.width + 40, 500));
		
		for (i = 50; i <= 250; i += 50)
			curScene.addEnemy(new ActionJelly(stage.canvas.width + 50, 100));
	});
	this.waves.push(function() {
		curBackgroundMusic.stop();
	});
	
	this.afterLevel = function() { curScene = new Cutscene2(); curScene.updateCommands(); };
}
Level1.prototype = Object.create(Level);

function Level1Boss() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss1_background")));
	
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Prescott());
	});
};
Level1Boss.prototype = Object.create(Level);

function Level2() {
	Level.call(this);
	
	var bg1 = new createjs.Bitmap(res.getResult("level2_background"));
	bg1.x = 0;
	var bg2 = new createjs.Bitmap(res.getResult("level2_background"));
	bg2.x = 800;
	
	this.backgroundLayer.addChild(bg1);
	this.backgroundLayer.addChild(bg2);
	
	this.updateMisc = function() {
		bg1.x -= 5;
		bg2.x -= 5;
		
		if (bg1.x <= -800) {
			bg1.x = 0;
			bg2.x = 800;
		}
	}
	
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("stage", {loop:-1});
		curScene.addEnemy(new Dogfish(stage.canvas.width, 100));
		curScene.addEnemy(new Dogfish(stage.canvas.width, 300));
		curScene.addEnemy(new Dogfish(stage.canvas.width, 500));
	});
	this.waves.push(function() {
		for (i = 100; i <= 500; i += 100);
			curScene.addEnemy(new ScouterFish(stage.canvas.width, i));
	});
	this.waves.push(function() {
		curScene.addEnemy(new SuperFish(stage.canvas.width, 100));
		for (i = 200; i <= 400; i+= 100)
			curScene.addEnemy(new ScouterFish(stage.canvas.width, i));
		curScene.addEnemy(new SuperFish(stage.canvas.width, 500));
	});
	this.waves.push(function() {
		for (i = 100; i <= 500; i += 100)
			curScene.addEnemy(new SuperFish(stage.canvas.width, i));
		
		curScene.addEnemy(new ScouterFish(stage.canvas.width + 100, 0));
		for (i = 100; i <= 500; i += 100)
			curScene.addEnemy(new Brofish(stage.canvas.width + 100, i));
		
		for (i = 100; i <= 500; i += 100)
			curScene.addEnemy(new Brofish(stage.canvas.width + 200, i));
		curScene.addEnemy(new ScouterFish(stage.canvas.width + 200, 550));
		
		curScene.addEnemy(new ScouterFish(stage.canvas.width + 300, 0));
		for (i = 100; i <= 400; i += 100)
			curScene.addEnemy(new Brofish(stage.canvas.width + 300, i));
		curScene.addEnemy(new Brofish(stage.canvas.width + 300, 550));
		
		for (i = 100; i <= 500; i += 100)
			curScene.addEnemy(new Brofish(stage.canvas.width + 400, i));
		curScene.addEnemy(new ScouterFish(stage.canvas.width + 400, 550));
		
		curScene.addEnemy(new Dogfish(stage.canvas.width + 500, 300));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new SuperFish(stage.canvas.width, 0));
		for (i = 100; i <= 400; i += 100)
			curScene.addEnemy(new ScouterFish(stage.canvas.width + i, 0));
		
		curScene.addEnemy(new SuperFish(stage.canvas.width, 500));
		for (i = 100; i <= 400; i += 100)
			curScene.addEnemy(new ScouterFish(stage.canvas.width + i, 500));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 300));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 200));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 400));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width + 100, 0));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width + 200, 500));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 300));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 100));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 100));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 300));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 500));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new EvilCarriage(stage.canvas.width + 200, 100));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width, 350));
		curScene.addEnemy(new EvilCarriage(stage.canvas.width + 250, 400));
	});
	
	this.waves.push(function() {
		for (i = 100; i <= 400; i += 100)
			curScene.addEnemy(new ScouterFish(stage.canvas.width + i, 0));
	});
	
	this.waves.push(function() {
		for (i = 100; i <= 400; i += 100)
			curScene.addEnemy(new ScouterFish(stage.canvas.width + i, 500));
	});

	this.waves.push(function() {
		curBackgroundMusic.stop();
	});
	
	this.afterLevel = function() { curScene = new Cutscene3(); curScene.updateCommands(); };
}
Level2.prototype = Object.create(Level);

function Level2Boss() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss2_background")));
	
	this.updateMisc = function() {
		if (curScene.enemies.length > 0)
			if (!curScene.enemies[0].hasOwnProperty("boss")) {
				curScene.enemies = [];
			}
	}
	
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new PercyZeus());
		curScene.enemies[0].boss = true;
	});
};
Level2Boss.prototype = Object.create(Level);

function Level3Boss1() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss3_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new ChrisR());
	});
	
	this.afterLevel = function() { curScene = new Cutscene5(); curScene.updateCommands(); };
};
Level3Boss1.prototype = Object.create(Level);

function Level3Boss2() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss4_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Johny());
	});
	
	this.afterLevel = function() { curScene = new Cutscene6(); curScene.updateCommands(); };
};
Level3Boss2.prototype = Object.create(Level);

function Level3Boss3() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss5_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Danielle());
	});
	
	this.afterLevel = function() { curScene = new Cutscene7(); curScene.updateCommands(); };
};
Level3Boss3.prototype = Object.create(Level);

function Level3Boss4() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss6_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Mark());
	});
};
Level3Boss4.prototype = Object.create(Level);

function Level4Boss1() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("boss7_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("boss_alpha", {loop:-1});
		curScene.addEnemy(new ALPHA());
	});
	
	this.afterLevel = function () { curScene = new Cutscene9(); curScene.updateCommands(); };
};
Level4Boss1.prototype = Object.create(Level);

function Level4() {
	Level.call(this);
	
	this.backgroundLayer.addChild(new createjs.Bitmap(res.getResult("level4_background")));
	this.waves.push(function() {
		curBackgroundMusic = createjs.Sound.play("te_wo_sawareru", {loop:-1});
		for (x = 0; x < 600; x += 150) {
			for (y = 0; y < 1000; y += 150)
				curScene.addEnemy(new ScouterFish(stage.canvas.width + x, y));
		}
	});
	this.waves.push(function() {
		for (x = 0; x < 600; x += 150) {
			for (y = 0; y < 1000; y += 150)
				curScene.addEnemy(new ScouterFish(stage.canvas.width + x, y));
		}
	});
	this.waves.push(function() {
		for (x = 0; x < 600; x += 150) {
			for (y = 0; y < 1000; y += 150)
				curScene.addEnemy(new ScouterFish(stage.canvas.width + x, y));
		}
	});
	
	this.waves.push(function() {
		for (i = 0; i < 600; i += 100)
			curScene.addEnemy(new SuperFish(stage.canvas.width, i));
		for (i = 0; i < 600; i += 100)
			curScene.addEnemy(new SuperFish(stage.canvas.width + 200, i));
		for (i = 0; i < 600; i += 100)
			curScene.addEnemy(new SuperFish(stage.canvas.width + 300, i));
		for (i = 0; i < 600; i += 100)
			curScene.addEnemy(new SuperFish(stage.canvas.width + 400, i));
	});

	
	this.waves.push(function() {
		for (i = 0; i < 600; i += 100)
			curScene.addEnemy(new ActionJelly(stage.canvas.width + i, 0));
	});
	
	this.waves.push(function() {
		curScene.addEnemy(new Momoka());
	});
	
	this.afterLevel = function() { curScene = new Cutscene10(); curScene.updateCommands(); };
}
Level4.prototype = Object.create(Level);