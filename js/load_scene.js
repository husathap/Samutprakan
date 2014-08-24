
function Loader() {
	Scene.call(this);
	
	this.loadingText = new createjs.Text("Loading...", "20px Lucida Console", "#000");
	this.loadingText.x = 300;
	this.loadingText.y = 200;
	
	this.container.addChild(this.loadingText);
	
	// Initialize the loader.
	this.queue = new createjs.LoadQueue(false);
	//createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
	createjs.Sound.alternateExtensions = ["m4a"];
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
		{id:"level_select", src:"img/level_select.png"},
		{id:"level1_icon", src:"img/level1_icon.png"},
		{id:"level2_icon", src:"img/level2_icon.png"},
		{id:"level3_icon", src:"img/level3_icon.png"},
		{id:"level4_icon", src:"img/level4_icon.png"},
		{id:"tutorial", src:"img/tutorial.png"},
		
		// Convo Icons here:
		{id:"prescott_icon", src:"img/prescott_icon.png"},
		{id:"hero_icon", src:"img/hero_icon.png"},
		{id:"percy_zeus_icon", src:"img/percy_zeus_icon.png"},
		{id:"chris_r_icon", src:"img/chris_r_icon.png"},
		{id:"johny_icon", src:"img/johny_icon.png"},
		{id:"danielle_icon", src:"img/danielle_icon.png"},
		{id:"mark_icon", src:"img/mark_icon.png"},
		{id:"alpha_icon", src:"img/alpha_icon.png"},
		{id:"momoka_icon", src:"img/momoka_icon.png"},
		
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
		{id:"scouter_fish", src:"img/scouter_fish.png"},
		{id:"super_fish", src:"img/super_fish.png"},
		{id:"dogfish", src:"img/dogfish.png"},
		{id:"evil_carriage", src:"img/evil_carriage.png"},
		{id:"round_bullet", src:"img/round_bullet.png"},
		{id:"cheese_curd", src:"img/cheese_curd.png"},
		{id:"percy_zeus", src:"img/percy_zeus.png"},
		{id:"chris_r", src:"img/chris_r.png"},
		{id:"johny", src:"img/johny.png"},
		{id:"danielle", src:"img/danielle.png"},
		{id:"mark", src:"img/mark.png"},
		{id:"download", src:"img/download.png"},
		{id:"ad1", src:"img/ad1.png"},
		{id:"ad2", src:"img/ad2.png"},
		{id:"alpha", src:"img/alpha.png"},
		{id:"momoka", src:"img/momoka.png"},
		{id:"sun", src:"img/sun.png"},
		{id:"flame", src:"img/flame.png"},
		
		// Load the levels' backgrounds here:
		{id:"level1_background", src:"img/level1_background.png"},
		{id:"boss1_background", src:"img/boss1_background.png"},
		{id:"vs_prescott", src:"img/vs_prescott.png"},
		{id:"level2_background", src:"img/level2_background.png"},
		{id:"boss2_background", src:"img/boss2_background.png"},
		{id:"vs_percy_zeus", src:"img/vs_percy_zeus.png"},
		{id:"boss3_background", src:"img/boss3_background.png"},
		{id:"vs_chris_r", src:"img/vs_chris_r.png"},
		{id:"boss4_background", src:"img/boss4_background.png"},
		{id:"vs_johny", src:"img/vs_johny.png"},
		{id:"boss5_background", src:"img/boss5_background.png"},
		{id:"vs_danielle", src:"img/vs_danielle.png"},
		{id:"boss6_background", src:"img/boss6_background.png"},
		{id:"vs_mark", src:"img/vs_mark.png"},
		{id:"boss7_background", src:"img/boss7_background.png"},
		{id:"vs_alpha", src:"img/vs_alpha.png"},
		{id:"level4_background", src:"img/level4_background.png"},
		{id:"vs_momoka", src:"img/vs_momoka.png"},
		
		// Sound effects here:
		{id:"enemy_hit", src:"snd/enemy_hit.ogg", data:1},
		{id:"player_hit", src:"snd/player_hit.ogg", data:1},
		{id:"player_healed", src:"snd/player_healed.ogg", data:1},
		
		// Load music here:
		{id:"boss", src:"snd/boss.ogg", data:1},
		{id:"stage", src:"snd/stage.ogg", data:1},
		{id:"encounter", src:"snd/encounter.ogg", data:1},
		{id:"go_fishing", src:"snd/go_fishing.ogg", data:1},
		{id:"boss_alpha", src:"snd/boss_alpha.ogg", data:1},
		{id:"te_wo_sawareru", src:"snd/te_wo_sawareru.ogg", data:1},
		{id:"ending", src:"snd/ending.ogg", data:1}
	]);
	
	// Set up the update function.
	this.update = function() {
		curScene.loadingText.x = Math.random() * stage.canvas.width;
		curScene.loadingText.y = Math.random() * stage.canvas.height;
	
		if (this.loadCompleted) {
			this.loadCompleted = false;
			res = this.queue;
			curScene = new TitleScene();
		}
	}
}

Loader.prototype = Object.create(Scene);