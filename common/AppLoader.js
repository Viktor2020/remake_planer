/**
 * Загрузчик приложения
 */
function AppLoader (link, link1, manifest) {
	var self = this;

	this._width = 100;
	this._height = 100;
	this.app = null;

	var maxProcFile = 0.6;
	var maxProcAppInit = 0.4;

	this.indicator = new Indicator(link, link1, function indicatorRedy () {
		self.sizeWindow();
		self.jsLoader.loadArr(manifest);
	});

	this.jsLoader = new JSLoader(onLoadJS, onProgressLoadJS);

	function onLoadJS () {
		window.console.log('jsLoader onLoadJS', this.procent, window.MyLib); // MyLib прописал в webpack.config.js -> output.library: 'MyLib'
		if (!window.MyLib) return;

		self.app = new window.MyLib.App();
		self.app.fun = onProgressInitApp;
		self.app.init('типа входящие параметры');
	}

	function onProgressLoadJS () {
		window.console.log('jsLoader onProgressLoadJS', this.procent);
		self.indicator.procent = this.procent * maxProcFile;
	}

	function onProgressInitApp (proc) {
		self.indicator.procent = 100 * maxProcFile + proc * maxProcAppInit;
		if (proc === 'created') {
            self.indicator.procent = 100;
			self.sizeWindow();
		}
	}

	this.sizeWindow = function (w, h) {
		w = w || self._width;
		h = h || self._height;
		self._width = w;
		self._height = h;

		if (self.indicator) self.indicator.sizeWindow(self._width, self._height);
		if (self.app) self.app.sizeWindow(self._width, self._height);
	};
}
