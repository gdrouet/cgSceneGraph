/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project CatchTheFlowers
 * @filename state.game.run
 * @date 25/07/12
 * @time 14:05
 * @purpose
 *
 */

var StateGameRun = Object.extend(
	{
		initialize : function(context) {
			this.context = context;
			this.image = null;

			this.score = 0;
			this.nbLive = 6;
			this.speed = 1;

			this.maxBees = 10;
			this.bees = [];
			this.maxClouds = 5;
			this.clouds = [];
			this.flowers = [];

			this.rootNode = new SkyNode(0, 0, canvasWidth, canvasHeight);
		},

		run : function() {
			this.initGame(/*currentLevel*/);

			for (var c = 0; c < this.maxClouds; c++) {
				this.clouds[c].start();
			}

			for (var b = 0; b < this.maxBees; b++) {
				this.bees[b].setImage(this.image);
				this.bees[b].start();
			}
		},

		setImage : function(image) {
			this.image = image;
		},

		/**
		 * init a new game
		 * @param level a PingmineLevel
		 */
		initGame : function(level) {
			//init clouds
			for (var c = 0; c < this.maxClouds; c++) {
				var cloud = new CloudNode(0, 0, 10, 10);
				this.clouds.push(cloud);
				this.rootNode.addChild(cloud);
			}

			var bindKillBee = this.killBee.bind(this);
			//init bees
			for (var b = 0; b < this.maxBees; b++) {
				var bee = new BeeNode(-30, Math.random() * 200, this.context, this, b);
				bee.onClick = bindKillBee;

				this.rootNode.addChild(bee);
				this.bees.push(bee);
			}
		},

		onKeyDown : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			switch (keynum) {
				case 32 : //Space
					break;
				case 37: //left
					break;
				case 38: //up
					break;
				case 39: //right
					break;
				case 40: //down
					break;
			}

			return keynum;
		},

		onKeyUp : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			return keynum;
		},

		killBee : function(event) {
			this.nbLive--;

			this.rootNode.removeChild(event.node, true);
			this.bees.without(event.node);
		},

		catchFlower : function(flower) {
			this.score += flower.points;
			this.nbLive += flower.live;

			this.updateScore();
		},

		updateScore : function() {

		}
	}
);