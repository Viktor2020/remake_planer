
import { Container, Graphics } from 'pixi.js';
import { PlBasic } from './PlBasic.js';
import { PlImage } from './PlImage.js';

export function PlPanel () {
	PlBasic.call(this);
	var self = this;
	this.type = 'PlPanel';

	this._width = 100;
	this._height = 100;

	this._isDrawKontur = true;
	this._nizNum = 30;
	this._nizAlpha = 0.2;
	this._notBac = false;
	this._visiLine = false;
	this._link = this.base;

	this.konturThick = this.kontur;
	this.lineThick = this.kontur;

	this.graphics = new Graphics();
	this.addChild(this.graphics);

	this.image = new PlImage();
	this.addChild(this.image);
	this.image.link = this._link;
	this.image.y = this._height - this._nizNum;
	this.image.height = 30;

	this.image.alpha = this._nizAlpha;

	this.gPlus = new Graphics();// Для дебаг отрисовки
	this.addChild(this.gPlus);

	this.content = new Container();
	this.addChild(this.content);

	this.graphLine = new Graphics();
	this.addChild(this.graphLine);
	this.graphLine.visible = this._visiLine;

	var ot = 0;
	// перерисовка
	this.draw102 = function () {
		this.graphics.clear();
		if (this._width < 2) return;
		if (this._notBac === true) {
			this.graphics.beginFill(this._color1);
			this.graphics.drawRect(-this.konturThick / 2, -this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, this._height - this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, 0, this.konturThick, this._height);
			this.graphics.drawRect(this._width - this.konturThick / 2, 0, this.konturThick, this._height);
			return;
		}

		if (this._isDrawKontur === true) {
			ot = this.lineThick;
			this.graphics.beginFill(this._color1);
			this.graphics.drawRect(0, 0, this._width, this._height);
			this.graphics.beginFill(this._color);
			this.graphics.drawRect(this.konturThick, this.konturThick, this._width - this.konturThick * 2, this._height - this.konturThick * 2);
		} else {
			ot = 0;
			this.graphics.beginFill(this._color);
			this.graphics.drawRect(0, 0, this._width, this._height);
		}

		this.graphLine.clear();
		this.graphLine.beginFill(0xffffff);
		this.graphLine.drawRect(ot, this._height - 1, this._width - ot * 2, 1);
		this.graphLine.beginFill(this._color1);
		this.graphLine.drawRect(ot, this._height, this._width - ot * 2, this.konturThick);
	};

	this.setColor = function () {
		this.draw102();
	};

	this.setColor1 = function () {
		this.draw102();
	};

	this.setWidth = function (width) {
		this.image.width = width;
		this.draw102();
	};

	this.setHeight = function (height) {
		if (this._nizNum <= 0) {
			this.image.height = height;
			this.image.y = 0;
		} else {
			if (height > this._nizNum) {
				this.image.height = this._nizNum;
				this.image.y = height - this._nizNum;
			} else {
				this.image.height = height;
				this.image.y = 0;
			}
		}
		this.draw102();
	};

	this.kill = function () {};
	this.draw102();
}

PlPanel.prototype = Object.create(PlBasic.prototype);
PlPanel.prototype.constructor = PlPanel;

Object.defineProperties(PlPanel.prototype, {
	link: {// замена градиентов
		set: function (value) {
			if (this._link !== value) {
				this._link = value;
				this.image.link = this._link;
			}
		},
		get: function () {
			return this._link;
		}
	},
	nizAlpha: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._nizAlpha !== value) {
				this._nizAlpha = value;
				this.image.alpha = this._nizAlpha;
			}
		},
		get: function () {
			return this._nizAlpha;
		}
	},
	nizNum: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._nizNum !== value) {
				this._nizNum = value;
				this.setHeight(this._height);
			}
		},
		get: function () {
			return this._nizNum;
		}
	},
	notBac: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._notBac !== value) {
				this._notBac = value;
				this.image.visible = !this._notBac;
			}
		},
		get: function () {
			return this._notBac;
		}
	},
	isDrawKontur: {// контур вокруг контента
		set: function (value) {
			if (this._isDrawKontur !== value) {
				this._isDrawKontur = value;
				this.draw102();
			}
		},
		get: function () {
			return this._isDrawKontur;
		}
	},
	visiLine: { // цвет контура
		set: function (value) {
			if (this._visiLine !== value) {
				this._visiLine = value;
				this.graphLine.visible = this._visiLine;
			}
		},
		get: function () {
			return this._visiLine;
		}
	}
});
