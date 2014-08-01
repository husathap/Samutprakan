
function Loader() {
	Scene.call(this);
	
	// Initialize the loader.
	this.queue = new createjs.LoadQueue(false);
	createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
	createjs.Sound.alternateExtensions = ["ogg"];
	this.queue.installPlugin(createjs.Sound);
	this.queue.on("complete", function() {
				//alert("It has ended!");
				this.loadCompleted = true;
		}, this);
			
	this.queue.loadManifest([
		{id:"title", src:"img/title.png"},
		{id:"game_over", src:"img/game_over.png"},
		{id:"game_over", src:"img/game_over.png"},
		{id:"hero", src:"img/hero.png"},
		{id:"player_bullet", src:"img/player_bullet.png"},
		{id:"small_bullet", src:"img/small_bullet.png"},
		{id:"hadoken_bullet", src:"img/hadoken_bullet.png"},
		{id:"flower_bullet", src:"img/flower_bullet.png"},
		{id:"default_icon_off", src:"img/default_icon_off.png"},
		{id:"default_icon_on", src:"img/default_icon_on.png"},
		{id:"hadoken_icon_off", src:"img/hadoken_icon_off.png"},
		{id:"hadoken_icon_on", src:"img/hadoken_icon_on.png"},
		{id:"flower_icon_off", src:"img/flower_icon_off.png"},
		{id:"flower_icon_on", src:"img/flower_icon_on.png"},
		{id:"pause_icon", src:"img/pause_icon.png"},
		{id:"pause_screen", src:"img/pause_screen.png"},
		
		// Convo Icons here:
		{id:"prescott_icon", src:"img/prescott_icon.png"},
		
		// Enemy textures here:
		{id:"dummy_enemy", src:"img/dummy_enemy.png"},
		{id:"brofish", src:"img/brofish.png"},
		{id:"catfish", src:"img/catfish.png"},
		{id:"action_fish", src:"img/action_fish.png"},
		{id:"horizontal_bullet", src:"img/horizontal_bullet.png"},
		{id:"vertical_bullet", src:"img/vertical_bullet.png"},
		{id:"jelly", src:"img/jelly.png"},
		{id:"action_jelly", src:"img/action_jelly.png"},
		{id:"enemy_hadoken", src:"img/enemy_hadoken.png"},
		{id:"prescott", src:"img/prescott.png"},
		
		// Sound effects here:
		{id:"enemy_hit", src:"snd/enemy_hit.m4a", data:1},
		{id:"player_hit", src:"snd/player_hit.m4a", data:1},
		{id:"player_healed", src:"snd/player_healed.m4a", data:1},
		
		// Load music here:
		{id:"boss", src:"snd/boss.m4a", data:1},
		{id:"stage", src:"snd/stage.m4a", data:1}
	]);
	
	// Set up the update function.
	this.update = function() {
		if (this.loadCompleted) {
			this.loadCompleted = false;
			res = this.queue;
			curScene = new TitleScene();
			//curScene = new TestCutscene();
			//curScene.updateCommands();
		}
	}
}

Loader.prototype = Object.create(Scene);