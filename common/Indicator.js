function Indicator (imageName, imageName1, fun) {
	var self = this;

	this.fun = fun; // сработает когда индикатор готов
	this._tipView = 1; // тип как показавать загрузку 0 - с верху в низ; 1 - слева на право; 2 - с низу в вверх; 3 - с права на лево
	this._procent = 0;
	this._visible = false;
	this.autoHide = true; // автоматически скрыть когда procent === 100%

	this._width = 100; // текущие размеры окна
	this._height = 100; // текущие размеры окна

	this.img = new Image();
	this.img.onload = onLoadImage;
	this.img.src = imageName;
	this.img.style.position = 'absolute';
	this.img.style.pointerEvents = 'none';

	this.img1 = new Image();
	this.img1.onload = onLoadImage;
	this.img1.src = imageName1;
	this.img1.style.position = 'absolute';
	this.img1.style.pointerEvents = 'none';

	this.countImgLoaded = 0;
	this.baseImg = { width: 100, height: 100 };

	function onLoadImage () {
		// debugger;
		if (++self.countImgLoaded === 2) {
			delete self.countImgLoaded;
			self.visible = true;
			self.baseImg.width = self.img.width;
			self.baseImg.height = self.img.height;
			self.onUpdateImgWH = updateImgWH;
			self.sizeWindow(self._width, self._height);
			self.viewProcess();
			if (self.fun) self.fun();
		}
	}
	function updateImgWH () {
		self.img1.width = self.img.width =
			self.baseImg.width * (1 / window.devicePixelRatio);
		self.img1.height = self.img.height =
			self.baseImg.height * (1 / window.devicePixelRatio);
		self.viewProcess();
	}

	this.sizeWindow = function (_width, _height) {
		self._height = _height;
		self._width = _width;
		if (self.onUpdateImgWH) self.onUpdateImgWH();
	};

	// отображение процесса загрузки
	this.viewProcess = function () {
		var w = self._width / 2 - self.img1.width / 2;
		var h = self._height / 2 - self.img1.height / 2;
		var imW = self.img1.width / 100 * self._procent;
		var imH = self.img1.height / 100 * self._procent;

		self.img.style.top = h + 'px';
		self.img.style.left = w + 'px';
		self.img1.style.top = h + 'px';
		self.img1.style.left = w + 'px';

		switch (self.tipView) {
			case 1:
				self.img1.style.clip = 'rect(auto, ' + imW + 'px,auto, auto)';
				break;
			case 2:
				self.img1.style.clip =
					'rect(' + (self.img.height - imH) + 'px, auto, auto,  auto)';
				break;
			case 3:
				self.img1.style.clip =
					'rect(auto,auto, auto, ' + (self.img.width - imW) + 'px)';
				break;
			default:
				self.img1.style.clip = 'rect(auto,auto, ' + imH + 'px, auto)';
		}
	};
}

Object.defineProperties(Indicator.prototype, {
	procent: {
		set: function (value) {
			this._procent = value;
			this.viewProcess();
			if (this.autoHide && this._procent === 100) {
				this.visible = false;
			}
		},
		get: function () {
			return this._procent;
		}
	},
	tipView: {
		set: function (value) {
			this._tipView = value;
			this.viewProcess();
		},
		get: function () {
			return this._tipView;
		}
	},
	visible: {
		set: function (value) {
			if (this._visible === value) return;
			this._visible = value;
			if (this._visible) {
				document.body.appendChild(this.img);
				document.body.appendChild(this.img1);
			} else {
				document.body.removeChild(this.img);
				document.body.removeChild(this.img1);
			}
			this.viewProcess();
		},
		get: function () {
			return this._visible;
		}
	}
});
