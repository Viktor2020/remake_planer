

function JSLoader (onLoad, onProgress, onError) {

	var scope = this;
	var itemsLoaded = 0;
	var itemsTotal = 0;

	this.procent = 0;

	this.arrResponce = [];
	this.procentObj = {};

	this.onLoad = onLoad;
	this.onProgress = onProgress;
	this.onError = onError;


	this.loadArr = function (arrUrl) {
		for (var i = 0; i < arrUrl.length; i++) {
			scope._load(arrUrl[i]);
		}
	};

	this.itemStart = function (url) {
		itemsTotal++;
		scope.procentObj[url] = 0;
		updateProcent();
	};

	this.itemProgress = function (url, e) {
		scope.procentObj[url] = (e.loaded / e.total * 100) || 0;
		updateProcent();

		if (scope.onProgress !== undefined) {
			scope.onProgress(url, itemsLoaded, itemsTotal);
		}
	};

	this.itemEnd = function (url, response) {
		itemsLoaded++;
		scope.procentObj[url] = 100;
		updateProcent();

		if (response) {
			scope.arrResponce.push(response);
		}

		if (scope.onProgress !== undefined) {
			scope.onProgress(url, itemsLoaded, itemsTotal);
		}
		if (itemsLoaded === itemsTotal) {
			scope.complete();
		}
	};

	function updateProcent () {
		var sum = 0;
		for (var i in scope.procentObj) {
			sum += scope.procentObj[i];
		}
		sum /= itemsTotal;
		scope.procent = sum;
	}

	this.itemError = function (url, event) {
		if (scope.onError !== undefined) {
			scope.onError(url);
		}
	};

	this._load = function (url) {

		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.addEventListener('load', function (event) {
			var response = event.target.response;

			if (this.readyState === 4 && this.status === 200) {
				scope.itemEnd(url, response);
			} else {
				scope.itemEnd(url);
				scope.itemError(url, event);
			}
		}, false);

		request.addEventListener('progress', function (event) {
			scope.itemProgress(url, event);
		}, false);

		request.addEventListener('error', function (event) {
			scope.itemEnd(url);
			scope.itemError(url, event);
		}, false);

		request.send(null);
		scope.itemStart(url);

	};

}

JSLoader.prototype.complete = function evalComplete () {
	var strScript = this.arrResponce.join('');
	var res = eval(strScript);

	if (this.onLoad !== undefined) {
		this.onLoad(res);
	}
};
