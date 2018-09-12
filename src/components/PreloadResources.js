export default function PreloadResources () {
	var self = this;

	var image = document.getElementsByClassName('icon-2')[0];
	var imageWidth = image.offsetWidth;

	var interval = null;
	var loadIndicate = 0;
	var loadIndicateStap = 0.4 ;
	var isLoadedProc = false;
	var isLoadedRes = false;

	this.start = function () {
		interval = setInterval(function () {
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
		setTimeout(function () {
			isLoadedRes = true;
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

	this.start();
}