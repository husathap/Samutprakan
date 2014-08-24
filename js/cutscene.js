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
	this.convoText.lineHeight = 32;
	
	this.convoSprite = new createjs.Bitmap();
	this.convoSprite.x = 20;
	this.convoSprite.y = 20;
	
	this.convoName = new createjs.Text("", "45px Lucida Console", "#ffffff");
	this.convoName.x = 140;
	this.convoName.y = 20;
	this.convoName.lineWidth = stage.canvas.width - 140;
	this.convoName.lineHeight = 47;
	
	this.addChild(this.convoText);
	this.addChild(this.convoSprite);
	this.addChild(this.convoName);
	
	// The description text.
	this.text = new createjs.Text("", "30px Lucida Console", "#ffffff");
	this.text.x = 20;
	this.text.y = 20;
	this.text.lineWidth = stage.canvas.width - 40;
	this.text.lineHeight = 32;
	
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
					curScene.background.alpha = 0.8;
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
					curScene.background.alpha = 0.8;
					break;
				case "changeBackgroundMusic":
					if (curBackgroundMusic != null)
						curBackgroundMusic.stop();
					curBackgroundMusic = createjs.Sound.play(curScene.commands[0].args[0], {loop:-1});
					curScene.commands.shift();
					curScene.updateCommands();
					return;
					break;
				case "stopBackgroundMusic":
					if (curBackgroundMusic != null)
						curBackgroundMusic.stop();
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
	
	this.stopBackgroundMusic = function() {
		this.commands.push({command:"stopBackgroundMusic"});
	}
}
Cutscene.prototye = Object.create(Scene);

function Cutscene1() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("go_fishing");
	this.showText("From the day that it stands still in the water, Atlantis is never disturbed. Its inhabitants live in peace. Fear never exists.");
	this.showText("That soon changes when a men's rights group named ALPHA takes over from the grip of the mighty Poseidaon. ALPHA has established its government and change the name of Atlantis to Alpha Atlantis. Its aim is to harness the power of Atlantis to conquer the whole world - to make it an ideal male-oriented society.");
	this.showText("Running out of options, Poseidaon has to beg a goddess of different realm: Na'krool. She was extremely powerful once. However, she disappeared after dealing with a brutal and sadistic king. Her extreme methods of dealing with the king were conflicting with her motherly and kind character. She had noted her own hypocrisy and removed herself from the humanly realm. No mortals had heard from her since.");
	this.showText("Na'krool has decided to send a fish to deal with the men's right group. Poseidaon would frown upon the idea of sending a mere fish to the rescue. However, Na'krool has assured that the fish is special - it is a reincarnation of a powerful entity. Without any choice, Poseidaon accepts Na'krool's offer.");
	this.showText("You control the fish. Are you bad enough to rescue the King of the Sea and to destroy Alpha Atlantis's cabinets?");
	this.changeBackground(res.getResult("tutorial"));
	this.stopBackgroundMusic();
	
	this.afterCutscene = function() { curScene = new Level1(); };
}
Cutscene1.prototype = Object.create(Cutscene);

// Prescott's banter here.
function Cutscene2() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "Oh hi, fishy! The next location is Haphaitos's Atlantis workshop. And Haphaitos won't let anyone except to me go into the workshop. Yeah, I've somehow befriended a Greek god.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "But I must go in there to liberate Atlantis from ALPHA!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "I'm sorry but I'm the only non-Greek entity allowed in there. You can turn back now. Actually, we should leave together. I've this place locked down and it's already past 5 PM. We can go for a bike together.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Stupid human, I have no legs so I can't bike! Come at me bro! I battle you!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "I will have to fight you then! Don't get me wrong. I am not doing this for ALPHA although I'm grateful that it has given me a chance to create a railway system. I'm doing this for Haphaitos!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "Beware that I am the universe's strongest minister of transport!");
	this.changeBackground(res.getResult("vs_prescott"));
	this.stopBackgroundMusic();
	
	this.afterCutscene = function() { curScene = new Level1Boss(); };
}
Cutscene2.prototype = Object.create(Cutscene);

// Percy Zeus's pre-battle banter here.
function Cutscene3() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "I was drunk so I snuck into Haphaios's workshop to find more booze so I can cure my drunkedness so I can continue to beast.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Be coherent man! I can barely understand you!");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "All it's good if I'm less drunk than the girl. If the girl is more drunken, I can control her more easily. Making her carrying my alpha baby more easy!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "What the?");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "I'm so drunk and I don't like them trains so I peed on them. They went all flying mad! Shame!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "What would be your pick up line?");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "Do you have a boyfriend yet?");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "That isn't even a pick up line!");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "Shuddup! I peed peed on your choo choo trains! Them look like want to me to beat them up!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Prescott, why are you here?");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "I've managed to recover from the battle. So I've decided to check out the workshop. It turned out that Percy Zeus has violated my trains! This is unforgivable! Well, I'm too spent for a fight right now...");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Wait? Why are we talking to a piece of cheese?");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "I'm not a block of cheese. I am an alpha male and all girls secretly lust after me and want to have my babies! I've been chasing this Taiwanese-Japanese chick named Momoka. And she's said that she had something to make me more handsome! And here I am. More handsome!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "Shiba Momoka? She has the word 'BAD NEWS' written on her forehead!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "A block of sentient cheese has no place in this realm! Die you monster, you don't belong in this world!");
	this.showConvo(res.getResult("percy_zeus_icon"), "Percy Zeus", "Stop treating me like mouse food. I will eat you up like a cat, fishy!");
	this.changeBackground(res.getResult("vs_percy_zeus"));
	this.stopBackgroundMusic();
	
	this.afterCutscene = function() { curScene = new Level2Boss(); };
}
Cutscene3.prototype = Object.create(Cutscene);

// Chris R's Cutscene
function Cutscene4() {
	Cutscene.call(this);

	this.changeBackgroundMusic("go_fishing");
	this.showText("In order to liberate Atlantis, Fish must defeat the head of the Alpha Atlantis government. It seems though that all of the government's ministers and high ranking officials are partying in what used to be Poseidaon's temple.");
	this.showText("Since all cabinets are in their druken stupor, they decide to have a game: anyone who can beat up the four strongest cabinets called the Elite Four and the head of the state can become Atlantis's new ruler.");
	this.showText("Fish couldn't pass up this chance. If he can become Atlantis's ruler, his first decree would be to liberate it.");
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("chris_r_icon"), "Chris R", "Oh hi, Fishy. I didn't know it was you. Coz I was so high on weed!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "It was me all right. I'm gonna beat you up and end this for once and for all.");
	this.showConvo(res.getResult("chris_r_icon"), "Chris R", "Chillax, have some weeds! I'd say some people like Stephen Harper should smoke weeds. It cures everything!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "But what if he has asthma?");
	this.showConvo(res.getResult("chris_r_icon"), "Chris R", "Smoking weeds cure everything, including asthma. Edibles suck cos they are weak so he should smoke weeds. I'm so hungry!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "OK. Who's this Stephen Harper guy anyway?");
	this.showConvo(res.getResult("chris_r_icon"), "Chris R", "An Australian rapper.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "You make no sense. And why did you look weird?");
	this.showConvo(res.getResult("chris_r_icon"), "Chris R", "I look handsome! That Momoka chick gave me an injection that would make me more masculine. I am now more handsome!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Die you monster, you don't belong in this world!");
	this.changeBackground(res.getResult("vs_chris_r"));
	this.stopBackgroundMusic();
	
	this.afterCutscene = function() { curScene = new Level3Boss1(); };
}
Cutscene4.prototype = Object.create(Cutscene);

// Johny's Cutscene
function Cutscene5() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("johny_icon"), "Johny", "Oh hi, Fishy. How's your life?");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Busy. I wouldn't have reincarnated myself as a fish if I didn't need to redeem myself for ruining an Eastern nation. After beating you guys, I can take a rest - with more intelligent people.");
	this.showConvo(res.getResult("johny_icon"), "Johny", "I am also busying making people accept ALPHA because males rule and males are tasked by gods to rule over all things - including things feminine.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Here we go. Another drunken minister.");
	this.showConvo(res.getResult("johny_icon"), "Johny", "Also a vampiric one since I had a dream of being a blood sucking critter and that Momoka chick makes me one.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "None of my business!");
	this.showConvo(res.getResult("johny_icon"), "Johny", "I herd u liek m*dk*p. I also liek fish. But I liek blood most!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Fish don't have that much blood in them. Go eat a whale, I'd say.");
	this.showConvo(res.getResult("johny_icon"), "Johny", "But I liek fish. Die you fishy for you must supplement my diet! I am so drunk! And this Momoka's drug is just so wonderful! WRRRRRRRRRYYYYYY!!!!!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Come at me, bro!");
	this.changeBackground(res.getResult("vs_johny"));
	this.afterCutscene = function() { curScene = new Level3Boss2(); };
	this.stopBackgroundMusic();
}
Cutscene5.prototype = Object.create(Cutscene);

// Danielle's Cutscene
function Cutscene6() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("hero_icon"), "Fish", "A female character. For once!");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "I wasn't born this way though. I was actually a jellyfish a while back. And you! You tried to shoot me!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Heh?");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "When ALPHA took over the power, it conscripted water creatures against their wills to fight against you. Remember the first jellyfish in the first stage? That was me.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "It wasn't my intention to shoot at anyone. However, I must do everything to liberate Atlantis. I must redeem myself to Na'krool. I'm sorry about this.");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "I failed to stop you, so Denny, the previous Minister of Justice, during his drunken stupor decided to make himself a jellyfish souvlaki by using me as the protein. He said he was too cool for beef. He chopped me into pieces and put them in a marinade.");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "Since he was so drunk, he decided to sample one of the pieces - raw. Well, I was venomous so he passed away one he digested one of the pieces. Then, somehow I became human. I also found that I have magical power as well. I've decided to continue his post after his death.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "That's horrific. But how did you become human?");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "I think it has something to do with the sauce. It was made by Momoka - that was what I heard from Denny.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "So now you are working with ALPHA. Well, since everyone in ALPHA is drunk right now, I think they let you work as their minister. However, once they become sober, they will ask you to stay in the kitchen because they are sexist like that. So instead of playing this stupid Elite Four thing, join my side with other non losers such as the Flame Emperor. Seriously, that's a cool name!");
	this.showConvo(res.getResult("danielle_icon"), "Danielle", "I'm willing to work with you. However, you've injured my boyfriend. I must avenge for him. Then, we can probably talk about it.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Fine, come at me, sis! Being a fish is suffering!");
	this.changeBackground(res.getResult("vs_danielle"));
	this.afterCutscene = function() { curScene = new Level3Boss3(); };
	this.stopBackgroundMusic();
}
Cutscene6.prototype = Object.create(Cutscene);

// Mark's Cutscene
function Cutscene7() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("mark_icon"), "Mark", "How do you like a game of football?");
	this.showConvo(res.getResult("hero_icon"), "Fish", "No thanks! I'm a fish. I have no arms nor legs.");
	this.showConvo(res.getResult("mark_icon"), "Mark", "That's a funny story, fish. You think girls like to cheat like guys do? I like shorts. They're comfy and easy to wear!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "I have enough of drunken ministers in my way! The only sober one is now a magical girl. Well, probably the minister of transport too. But I have enough of you guys!");
	this.showConvo(res.getResult("mark_icon"), "Mark", "You are my favourite fish!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "This ends now!");
	
	this.changeBackground(res.getResult("vs_mark"));
	this.afterCutscene = function() { curScene = new Level3Boss4(); };
	this.stopBackgroundMusic();
}
Cutscene7.prototype = Object.create(Cutscene);

function Cutscene8() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("hero_icon"), "Fish", "So finally, I'm going to see the Champion of the stupid Elite Four thing. And it's...");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "You've come, eh? I am the mighty ALPHA.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "A girl! A child at that too!");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "Being an alpha has nothing to do with the outer shell. You know that the word for Masculinity in French is feminine.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "I don't give a crap about the grammatical gender thing.");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "You see. The power to pick up is not gender exclusive. I shall use a pick up line on you then to demonstrate my prowess - Are you occupied, because I'm waiting for you?");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "That's not a pick up line. It's more like terrible airplane jokes. Well, at least it's better than your usual line \"Do you have a ... friend yet?\"");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "Don't make fun of me! All girls have fallen for all of my lines - and so should guys! I am ALPHA, the dominant one!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "This can't be ALPHA! I've met him once before coming to Atlantis. He's a very buffy man and not a girl like you. He's so pumped you can smell steroid out from his breaths. I know it! It has something with Shiba Momoka! You were dating her... And her potion has made you girly!");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "Momoka? She has nothing to do with this. That wrench is dominated by me!");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "It's the other way around. I've read the book! She's a magnificent one. She's just playing with you. You know why almost all of your ministers are either dead or no longer human? She gave them weird medicines that corrupted them. But I'm too smart for her plan so I'm still intact.");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "And I have no sympathy for the ministers since they are usually arrogant and careless. I have no sympathy for you too!");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "How there you smack talk to me like that! Prescott. Obey the alpha one.");
	this.showConvo(res.getResult("prescott_icon"), "Prescott", "No longer relevant! I've just got a message in my cell phone; the train compay accepted me. Now, I can work on a train without having my oeuvre getting peed on. See you all, loser! Not you fish though, you are cool!");
	this.showConvo(res.getResult("alpha_icon"), "ALPHA", "I never lose. I am the alpha one! Fishy! You may have bested my ministers. But I shall best you!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "You tried to hit on a fish figuratively. Now try to hit on a fish for real!");
	
	this.changeBackground(res.getResult("vs_alpha"));
	this.afterCutscene = function() { curScene = new Level4Boss1(); };
	this.stopBackgroundMusic();
}
Cutscene8.prototype = Object.create(Cutscene);

function Cutscene9() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("go_fishing");
	this.showText("After the Champion of the Elite Four has been defeated, Atlantis is finally liberated from ALPHA. However, this is not the true reason why Fish is here. Fish knows who Shiba Momoka actually is and he needs to stop her. An Eastern nation was in danger once because of Fish, and he wanted to redeem himself. He must stop Shiba Momoka from doing what he had done.");
	this.changeBackgroundMusic("encounter");
	this.showConvo(res.getResult("momoka_icon"), "Momoka", "Fishy~ You look lovely <3. I want to hug you. Tee hee.");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Don't pretend to be a silly girl. I know who you actually are, King Tuus. You've died from your sins and yet managed to become the God of the Heavenly Happy Star. But you are not satisfied. You want your country back, and so you've reincarnated as an idol singer to complete the task.");
	this.showConvo(res.getResult("momoka_icon"), "Momoka", "Tuus? That's an old fashion way to say it. Tee hee. <3 The modern and my lovely fans would know me by King Shou of Shang. Well, Queen, I suppose. :) Some says my name is Zhou, but I would be really really really angry if you call me that. :(");
	this.showConvo(res.getResult("hero_icon"), "Fish", "I know your goal. Na'krool knows your goal. You were the king of Qhwraagraa' once and your plan of invading Poseidaon's city to gain his power. Then you will use his power to take over Qhwraagraa'. Na'krool has sent me to stop you. Your plan will end here!");
	this.showConvo(res.getResult("momoka_icon"), "Momoka", "Smart one, Fish. My plan is indeed to unite the two Chinas or what you call Qhwraagraa's, and to become its emperor. Then, I will take on those barbaric tribes to make them mine!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Funny that your current name is that of Japanese and not Chinese.");
	this.showConvo(res.getResult("momoka_icon"), "Momoka", "Blame my Japanophile father for that. My true name is Sima Taohua, but my father loves to call me Shiba Momoka. This name gets stuck into my brain now. My father's a Taiwanese who's really obsessed with all things Japanese. However I've chosen him to be my father because he's the most direct descendant of the Chinese emperors! And from his blood, I claim my regency over China!");
	this.showConvo(res.getResult("hero_icon"), "Fish", "Regency? Please. You know that the doctor has torn the Heavenly Mandate for a Chinese monarch. No more man shall become a monarch of China unless the Heaven crafts a new mandate.");
	this.showConvo(res.getResult("momoka_icon"), "Momoka", "It doesn't matter. Irregard of everything, I will craft the new mandate. You will die here, fish. *o* Or would I say, Gong Gong, :-o the Minister of Works. Graa'koong if you insist. If you manage to splash your way back to Nvwa or your Na'krool, please tell her that I still want to **** her. Tee hee. :)");
	this.showConvo(res.getResult("hero_icon"), "Graa'koong", "No one talks to the Na'krool like that!");
	this.changeBackground(res.getResult("vs_momoka"));
	
	this.afterCutscene = function() { curScene = new Level4(); };
	this.stopBackgroundMusic();
}
Cutscene9.prototype = Object.create(Cutscene);

function Cutscene10() {
	Cutscene.call(this);
	
	this.changeBackgroundMusic("ending");
	this.showText("Now, Fish has defeated ALPHA and Shiba Momoka. So he has saved the world and China from Men's Rights Group and a J-POP singer who likes to dress up like school girls. In the eye of the heaven, he has been redeemed. Fish is allowed to return to heaven to rest with other gods.");
	this.showText("The Flame Emperor, one of the gods, allows Fish or Graa'koong to resume his post as the emperor's minister. He has forgiven Graa'koong of his mistakes including the ancient flood in the ancient time.");
	this.showText("Prescott has started his job in the train company. He is quite happy.");
	this.showText("Percy Zeus is deemed to weird to exist and is put in the abyss by Poseidaon.\n\nChris R is deemed to weird to exist and is put in the abyss by Poseidaon.");
	this.showText("Johny is sneaky enough to escape Poseidaon so he doesn't spend his time in the abyss. However, he forgets that he is a vampire and is promptly burnt to death when he sunbathes.");
	this.showText("Danielle wants to live in Atlantis. However, since she is too humanoid for her jellyfish friends, she is rejected by them. She tries to hang out with the humans in Atlantis; however, they cannot put up with her jellyfish antics. So she leaves Atlantis and lives in Japan along with a nondescript high school student. Their lives, exploits and romance are immortalized in an anime called \"My Jelly Magical Girlfriend Comes from the Sea.\" She ends up running a Wall Street bank.");
	this.showText("Mark escapes Poseidaon, but his whereabout is unknown. There's a ghost story amongst IT professionals that sometimes, some computers would show some weird ads during the death of the night. The ads would disappear on its own. Deep analysis of the victim computers would yield nothing - the mysterious entity behind the ads leaves no traces.");
	this.showText("ALPHA is now called by Alice by many people. She is no longer taken seriously in the men's rights sphere. (The seduction community never takes her seriously due to her inability to have an actual pick up line.) She tries to pick up multiple guys with no success. She is then arrested for embezzlement from a cult.");
	this.showText("Shiba Momoka suffers no consequences from the events. However, she suffers something worse - a botched plastic surgery. When her life span ends, she returns to the heaven to resume the post of being the God of the Heavenly Happy Star. Other gods mock her exploits.");
	
	this.stopBackgroundMusic();
	this.afterCutscene = function() { curScene = new TitleScene(); };
	
}
Cutscene9.prototype = Object.create(Cutscene);