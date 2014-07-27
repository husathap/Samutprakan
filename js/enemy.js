/* This function contains stuffs about enemies. */

// This is a prototype of an enemy. By using this alone, you will be creating a dummy enemy.
function Enemy() {
	this.bitmap = new createjs.Bitmap(res.getResult("dummy_enemy"));
	this.bitmap.x = 800;
	this.bitmap.y = 300; 
	this.attack = 10;
	
	this.HP = 10;
	this.maxHP = 10;

	this.update = function() {
		this.bitmap.x -= 5;
	}
	
	this.removeFlag = function() {
		return this.bitmap.x < -this.bitmap.getBounds().width;
	};
}