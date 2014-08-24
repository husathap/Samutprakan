/* This file contains Scene class, and also other miscellaneous scenes that are too small
   to be put in its own file. */

function Scene() {
	//createjs.Container.call(this);
	this.container = new createjs.Container();

	// Clear what has been done in the previous stage.
	stage.removeAllEventListeners();
	stage.removeAllChildren();
	
	// Set up the update function. This is a virtual function.
	this.update = function() {};

	// Set up the containers.
	this.container.x = 0;
	this.container.y = 0;
	
	// Adding some misc function.
	this.addChild = function(child) {
		this.container.addChild(child);
	};
	
	this.removeChild = function(child) {
		this.container.removeChild(child);
	};
	
	this.removeChildAt = function(index) {
		this.container.removeChildAt(index);
	};

	// Add the container into the stage.
	stage.addChild(this.container);
}

function TitleScene() {
	Scene.call(this);
	
	this.titleImage = new createjs.Bitmap(res.getResult("title"));
	this.titleImage.addEventListener("click", function() {
		curScene = new LevelSelectScene();
	});
	this.container.addChild(this.titleImage);
	curBackgroundMusic = createjs.Sound.play("go_fishing");
};
TitleScene.prototype = Object.create(Scene);

function LevelSelectScene() {
	Scene.call(this);
	
	this.background = new createjs.Bitmap(res.getResult("level_select"));
	this.level1Button = new createjs.Bitmap(res.getResult("level1_icon"));
	this.level2Button = new createjs.Bitmap(res.getResult("level2_icon"));
	this.level3Button = new createjs.Bitmap(res.getResult("level3_icon"));
	this.level4Button = new createjs.Bitmap(res.getResult("level4_icon"));
	
	this.level1Button.x = 180;
	this.level1Button.y = 30;
	this.level2Button.x = 400;
	this.level2Button.y = 30;
	this.level3Button.x = 180;
	this.level3Button.y = 240;
	this.level4Button.x = 400;
	this.level4Button.y = 240;
	
	this.level1Button.addEventListener("click", function() {
		curScene = new Cutscene1();
		curScene.updateCommands();
	});

	this.level2Button.addEventListener("click", function() {
		curScene = new Level2();
	});

	
	this.level3Button.addEventListener("click", function() {
		curScene = new Cutscene4();
		curScene.updateCommands();
	});

	this.level4Button.addEventListener("click", function() {
		curScene = new Cutscene8();
		curScene.updateCommands();
	});

	this.container.addChild(this.background);
	this.container.addChild(this.level1Button);
	this.container.addChild(this.level2Button);
	this.container.addChild(this.level3Button);
	this.container.addChild(this.level4Button);
}
LevelSelectScene.prototype = Object.create(Scene);

function GameOverScene() {
	Scene.call(this);
	
	this.titleImage = new createjs.Bitmap(res.getResult("game_over"));
	this.titleImage.addEventListener("click", function() {
		curScene = new TitleScene();
	});
	this.container.addChild(this.titleImage);
};
TitleScene.prototype = Object.create(Scene);