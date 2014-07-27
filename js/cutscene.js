// Represent a cutscenes in the game.

function Cutscene() {
	Scene.call(this);
	
	this.commands = [];
	
	// The background image.
	this.background = new createjs.Shape();
	
	this.backgroundImage = new createjs.Bitmap();
	this.background.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	this.background.alpha = 1;
	
	this.addChild(this.backgroundImage);
	this.addChild(this.background);
	
	// The convo text.
	this.convoText = new createjs.Text("", "30px Lucida Console", "#ffffff");
	this.convoText.x = 20;
	this.convoText.y = 140;
	this.convoText.lineWidth = stage.canvas.width - 40;
	
	this.convoSprite = new createjs.Bitmap();
	this.convoSprite.x = 20;
	this.convoSprite.y = 20;
	
	this.convoName = new createjs.Text("", "45px Lucida Console", "#ffffff");
	this.convoName.x = 140;
	this.convoName.y = 20;
	this.convoName.lineWidth = stage.canvas.width - 140;
	
	this.addChild(this.convoText);
	this.addChild(this.convoSprite);
	this.addChild(this.convoName);
	
	// The description text.
	this.text = new createjs.Text("", "30px Lucida Console", "#ffffff");
	this.text.x = 20;
	this.text.y = 20;
	this.text.lineWidth = stage.canvas.width - 40;
	
	this.addChild(this.text);
	
	this.afterCutscene = function() { curScene = new TitleScene(); };
	
	this.update = function() {};
	
	this.updateCommands = function() {
		if (curScene.commands.length == 0)
			curScene.afterCutscene();
		else {
			// Clear texts:
			switch (curScene.commands[0].command) {
				case "changeBackground":
					curScene.text.text = "";
					curScene.convoSprite.image = null;
					curScene.convoName.text = "";
					curScene.convoText.text = "";
					curScene.backgroundImage.image = curScene.commands[0].args[0];
					curScene.background.alpha = 0;
					break;
				case "removeBackground":
					curScene.text.text = "";
					curScene.convoSprite.image = null;
					curScene.convoName.text = "";
					curScene.convoText.text = "";
					curScene.backgroundImage.image = null;
					curScene.background.alpha = 1;
					break;
				case "text":
					curScene.convoSprite.image = null;
					curScene.convoName.text = "";
					curScene.convoText.text = "";
					curScene.text.text = curScene.commands[0].args[0];
					curScene.background.alpha = 0.8;
					break;
				case "showConvo":
					curScene.text.text = "";
					curScene.convoSprite.image = curScene.commands[0].args[0];
					curScene.convoName.text = curScene.commands[0].args[1];
					curScene.convoText.text = curScene.commands[0].args[2];
					break;
				case "changeBackgroundMusic":
					if (curBackgroundMusic != null)
						curBackgroundMusic.stop();
					curBackgroundMusic = createjs.Sound.play(curScene.commands[0].args[0], {loop:-1});
					curScene.commands.shift();
					curScene.updateCommands();
					return;
					break;
			}
			curScene.commands.shift();
		}
	};
	
	this.backgroundImage.addEventListener("click", this.updateCommands);
	this.background.addEventListener("click", this.updateCommands);
	
	this.changeBackground = function(bg) {
		this.commands.push({command:"changeBackground", args:[bg]});
	};
	
	this.removeBackground = function() {
		this.commands.push({command:"removeBackground"});
	};
	
	this.showText = function(text) {
		this.commands.push({command:"text", args:[text]});
	};
	
	this.showConvo = function(icon, name, text) {
		this.commands.push({command:"showConvo", args:[icon, name, text]});
	};
	
	this.changeBackgroundMusic = function(bgm) {
		this.commands.push({command:"changeBackgroundMusic", args:[bgm]});
	}
}
Cutscene.prototye = Object.create(Scene);

function TestCutscene() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("boss");
	this.changeBackground(res.getResult("game_over"));
	this.showText("Hello, everyone!")
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "I am the strongest Transport Minister in the universe!");
	this.changeBackground(res.getResult("title"));
	this.removeBackground();
	this.changeBackgroundMusic("boss");
	this.changeBackground(res.getResult("pause_screen"));
}
TestCutscene.prototye = Object.create(Cutscene);