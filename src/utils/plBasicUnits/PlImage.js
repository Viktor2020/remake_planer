
import { Container, Text, Sprite} from 'pixi.js';
import { PlStyles } from './PlStyles.js';

export function PlImage () {
	Container.call(this);
	var self = this;
	this.type = 'PlImage';

	this.fun = null;

	this._width = 100;
	this._height = 100;
	this._otstup = 0; // отступ картинки от краев рамки
	this._preloaderBool = false;

	this.picWidth = 0; // реальные размеры картинки
	this.picHeight = 0; // реальные размеры картинки
	// TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться
	this.image = new Image();
	this.interactive = false;
	this.sprite = null;
	this.funError = null;
	this.label = null;
	this.linkOld = null;

	this.loadError = function () {
		if (!self.label) {
			self.label = new Text(self._link, PlStyles.style);
			self.addChild(self.label);
		}
		self.label.text = self._link;
		self.label.visible = true;
		if (self.funError) self.funError();
	};

	this.loadComplit = function (texture) {
		self.image = texture.baseTexture.source;
		self.isLoaded = true;
		self.picWidth = texture.width;
		self.picHeight = texture.height;
		if (self.sprite) self.sprite.destroy();
		self.sprite = new Sprite(texture);
		self.sprite.interactive = self.interactive;
		self.sprite.visible = true;
		self.addChild(self.sprite);
		self.otstup = self._otstup;
		self.width = self._width;
		self.height = self._height;
		if (self.label) {
			self.removeChild(self.label);
			delete self.label;
			self.label = undefined;
		}
		if (self._preloaderBool) {
			self.preloader.visible = false;
			self.preloader.activ = false;
		}
		if (self.funComplit) self.funComplit();
		if (self.fun) self.fun();
	};

	this.preloader = null;
	this.load = function () {
		if (this._preloaderBool && this.sprite) {
			// если есть прелоадер нужно убрать старую картинку
			this.sprite.visible = false;
		}
		this.isLoaded = false;
		if (!this._link || this._link === 'null') return;
		if (this._preloaderBool && !this.preloader) {
			this.preloader = new PLPreloader(this, 0, 0);
			// PlStyles.removeElement(this.preloader, true);
		}
		if (this._preloaderBool) {
			this.preloader.width = this._width;
			this.preloader.height = this._height;
			this.preloader.activ = true;
			this.preloader.visible = true;
		}
		PlStyles.loaderTexture.clearFun(this.linkOld, this.loadComplit);
		PlStyles.loaderTexture.getTexture(this._link, this.loadComplit);
		this.linkOld = this._link;
	};

	this.clear = function () {
		if (self.sprite) {
			self.sprite.destroy();
			delete self.sprite;
		}
		this.destroy();
	};
}

PlImage.prototype = Object.create(Container.prototype);
PlImage.prototype.constructor = PlImage;

Object.defineProperties(PlImage.prototype, {
	link: {
		set: function (value) {
			if (this._link === value) return;
			this._link = value;
			this.load();
		},
		get: function () {
			return this._link;
		}
	},
	width: {
		set: function (value) {

			this._width = value;
			if (this.sprite) {
				this.sprite.scale.x = (this._width - this._otstup * 2) / this.picWidth;
				this.sprite.position.x = this._otstup;
			}

			if (this._preloaderBool === true) if (this.preloader) this.preloader.width = this._width;
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			this._height = value;
			if (this.sprite) {
				this.sprite.scale.y = (this._height - this._otstup * 2) / this.picHeight;
				this.sprite.position.y = this._otstup;
			}
			if (this._preloaderBool === true) if (this.preloader) this.preloader.height = this._height;
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			this._otstup = value;
			this.width = this._width;
			this.height = this._height;
		},
		get: function () {
			return this._otstup;
		}
	}
});
