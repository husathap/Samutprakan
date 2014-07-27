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
		curScene = new TestLevel();
	});
	this.container.addChild(this.titleImage);
};
TitleScene.prototype = Object.create(Scene);

function GameOverScene() {
	Scene.call(this);
	
	this.titleImage = new createjs.Bitmap(res.getResult("game_over"));
	this.titleImage.addEventListener("click", function() {
		curScene = new TitleScene();
	});
	this.container.addChild(this.titleImage);
};
TitleScene.prototype = Object.create(Scene);