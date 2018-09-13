
import { SceneApp } from './SceneApp.js'
import { PreloadResources } from './PreloadResources.js'

export function App() {
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