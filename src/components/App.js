
import { SceneApp } from './SceneApp.js';
import { SFloor } from './SFloor.js';


export function App () {
	var self = this;

	this.width = 300;
	this.height = 300;
	self.fun = null;// todo заменить на диспач

	this.init = function () {
		window.trace = window.console.log.bind(window.console);

		self.appScene = new SceneApp();
		self.appScene.resize(self.width, self.height);

		self.sFloor = new SFloor();
		
		self.loop();

		if (self.fun) self.fun('created');
	};

	this.loop = function () {
		self.appScene.update();
		self.appScene.render();
		window.requestAnimationFrame(self.loop);
	};

	this.sizeWindow = function (w, h) {
		self.width = w;
		self.height = h;
		self.appScene.resize(self.width, self.height);
	};

	// имитируем инициализацию приложения
	this.fackeInit = function () {
		var num = 0;
		var deley = 500;

		setTimeout(function () {
			if (self.fun) self.fun(25);
			window.console.log('load facke sound');
		}, deley * ++num);
		setTimeout(function () {
			if (self.fun) self.fun(50);
			window.console.log('load facke text');
		}, deley * ++num);
		setTimeout(function () {
			window.console.log('load facke server data');
			if (self.fun) self.fun(90);
		}, deley * ++num);
		setTimeout(function () {
			window.console.log('load facke creating app');
			if (self.fun) self.fun(100);

			self.init();

		}, deley * ++num);
	};
}
