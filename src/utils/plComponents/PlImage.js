
import { Container, Text, Sprite} from 'pixi.js';
import { PlBasic } from './PlBasic.js';

export function PlImage () {
	PlBasic.call(this);
	var self = this;
	this.type = 'PlImage';

	this._preloaderBool = false;

	this.picWidth = 0; // реальные размеры картинки
	this.picHeight = 0; // реальные размеры картинки
	// TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться
	this.image = new Image();
	this.interactive = false;
	this.sprite = null;
	this.label = null;
	this.linkOld = null;

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
		self.setWidth(self._width);
		self.setHeight(self._height);
		if (self.label) {
			self.removeChild(self.label);
			delete self.label;
			self.label = undefined;
		}
		if (self._preloaderBool) {
			self.preloader.visible = false;
			self.preloader.activ = false;
		}
		self.dispatchEvent({type: 'onload'});
	};

	this.preloader = null;
	this.load = function () {
		if (this._preloaderBool && this.sprite) {
			this.sprite.visible = false;
		}
		this.isLoaded = false;
		if (!this._link || this._link === 'null') return;
		if (this._preloaderBool && !this.preloader) {
			this.preloader = new PLPreloader(this, 0, 0);
		}
		if (this._preloaderBool) {
			this.preloader.width = this._width;
			this.preloader.height = this._height;
			this.preloader.activ = true;
			this.preloader.visible = true;
		}
		this.loaderTexture.clearFun(this.linkOld, this.loadComplit);
		this.loaderTexture.getTexture(this._link, this.loadComplit);
		this.linkOld = this._link;
	};

	this.clear = function () {
		if (self.sprite) {
			self.sprite.destroy();
			delete self.sprite;
		}
		this.destroy();
	};

	this.setWidth = function (width) {
		if (this.sprite) {
			this.sprite.scale.x = (width - this._otstup * 2) / this.picWidth;
			this.sprite.position.x = this._otstup;
		}
		if (this._preloaderBool === true && this.preloader) {
			this.preloader.width = width;
		}
	};

	this.setHeight = function (height) {
		if (this.sprite) {
			this.sprite.scale.y = (height - this._otstup * 2) / this.picHeight;
			this.sprite.position.y = this._otstup;
		}
		if (this._preloaderBool === true && this.preloader) {
			this.preloader.height = height;
		}
	};

	this.setOtstup = function () {
		this.setWidth(this._width);
		this.setHeight(this._height);
	};

	this.setLink = function () {
		this.load();
	};
}

PlImage.prototype = Object.create(PlBasic.prototype);
PlImage.prototype.constructor = PlImage;