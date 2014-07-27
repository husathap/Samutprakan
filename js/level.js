// This file contains the prototype for creating level.
function Player() {

	// Setting up the sprite.
	this.bitmap = new createjs.Bitmap(res.getResult("hero"));
	
	var playerBounds = this.bitmap.getBounds();
	this.bitmap.x = (stage.canvas.width - playerBounds.width) / 2;
	this.bitmap.y = (stage.canvas.height - playerBounds.height) / 2;
	
	// Set up the variables.
	this.HP = 100;
	this.maxHP = 200;
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
	
	this.attack = 10;
	
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
	
	// Set up the waves.
	this.waves = [];
	
	// Set up the sound instance.
	this.backgroundMusic = null;

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
		
		if (curScene.backgroundMusic != null)
			curScene.backgroundMusic.pause();
	});
	
		// Create the unpause function.
	this.pauseLayer.addEventListener("click", function() {
		curScene.paused = false;
		curScene.pauseLayer.alpha = 0;
		if (curScene.backgroundMusic != null)
			curScene.backgroundMusic.resume();
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
		
		// Update the enemies.

		var i = 0;
		while (i < this.enemies.length) {
			this.enemies[i].update();
			if (this.player.invincibleFrameCounter == 0) {
				if (ndgmr.checkPixelCollision(this.enemies[i].bitmap,
						this.player.bitmap)) {
					this.player.HP -= this.enemies[i].attack;
					createjs.Sound.play("player_hit");
					
					if (this.player.HP <= 0) {
						this = new GameOverScene();
					} else if (this.player.HP > this.player.maxHP) {
						this.player.HP = thisplayer.maxHP;
					}
					
					this.player.invincibleFrameCounter = this.player.invincibleFrame;
					this.player.bitmap.alpha = 0.5;
				}
			}
			
			if (this.enemies[i].removeFlag()) {
				this.enemyLayer.removeChildAt(i);
				this.enemies.splice(i, 1);
				i--;
			}
			i++;
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
				if (ndgmr.checkPixelCollision(this.enemies[j].bitmap,
					this.playerBullets[i].bitmap)) {
					this.enemies[j].HP -= this.playerBullets[j].attack;
					
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
	
	this.afterLevel = function() { curScene = new TitleScene() };
	
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
		curBackgroundMusic = createjs.Sound.play("boss", {loop:-1});
		curScene.addEnemy(new Enemy());
	});
	this.waves.push(function() {
		curScene.addEnemy(new Enemy());
	});
	this.waves.push(function() {
		curScene.addEnemy(new Enemy());
	});
	this.waves.push(function() {
		curScene.addEnemy(new Enemy());
	});
	this.waves.push(function() {
		curScene.addEnemy(new Enemy());
	});
	this.waves.push(function() {
		createjs.Sound.stop();
	});
}
TestLevel.prototype = Object.create(Level);
