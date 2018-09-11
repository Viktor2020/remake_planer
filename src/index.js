
import { Container, Graphics, autoDetectRenderer } from 'pixi.js'


function App() {
	var self = this;

	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.init = function () {
		window.trace = window.console.log.bind(window.console);
		window.addEventListener('resize', this.resize, false);
		this.appScene = new SceneApp();
		this.preloadResources = new PreloadResources();
		this.appScene.resize(this.width, this.height);
		this.loop();
	};

	this.resize = function () {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.appScene.resize(self.width, self.height);
	};

	this.loop = function () {
		self.appScene.update();
		self.appScene.render();
		window.requestAnimationFrame(self.loop);
	};
}

function SceneApp () {
	var self = this;

	this.width = 100;
	this.height = 100;

	this.renderer = autoDetectRenderer(this.width, this.height, {
		antialias: false,
		transparent: false,
	});

	this.renderer.autoResize = true;
	document.body.appendChild(this.renderer.view);

	this.stage = new Container();

	this.background = new Graphics();
	this.stage.addChild(this.background);

	this.draw = function () {
		this.background.clear();
		this.background.beginFill(0xffffff*Math.random());
		this.background.drawRect(0, 0, this.width, this.height);
		this.background.endFill();
	};

	this.resize = function (width, height) {
		this.width = width;
		this.height = height;
		this.draw();
		this.renderer.resize(this.width, this.height);
	};

	this.render = function () {
		this.renderer.render(this.stage);
	};

	this.update = function () {
		
	};
}

function PreloadResources () {
	var self = this;

	var image = document.getElementsByClassName('icon-2')[0];
	var imageWidth = image.offsetWidth;

	var interval = null;
	var loadIndicate = 0;
	var loadIndicateStap = 0.4 ;
	var isLoadedProc = false;
	var isLoadedRes = false;

	this.start = function () {
		interval = setInterval(function() {
			loadIndicate += loadIndicateStap;
			image.style.clip = 'rect(auto, ' + loadIndicate + 'px, auto, auto)';
			if (loadIndicate > (80 * imageWidth) / 100 && !isLoadedProc && !isLoadedRes) {
				isLoadedProc = true;
				self.stop();
			}
			if (isLoadedProc && loadIndicate > imageWidth) {
				self.stop();
				self.clear();
			}
		}, 1000 / 60);

		this.loadResources();
	};

	this.loadResources = function () {
		setTimeout(function() {
			isLoadedRes = true
			loadIndicateStap = 0.8;
			self.start();
			self.loadComplite();
		}, 12000);
	};

	this.stop = function () {
		clearInterval(interval);
	};

	this.clear = function () {
		var preload = document.getElementsByClassName('preloader')[0];
		preload.style.display = 'none';
	};

	this.loadComplite = function () {

	};

	this.start()
}

window.onload = function () {
	var app = new App();
	app.init();
};