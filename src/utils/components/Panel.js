
import { Container, Graphics } from 'pixi.js'
import { CommonStyles } from './CommonStyles.js'
import { Image } from './Image.js'

export function PLPanel (cont, _x, _y) {
	Container.call(this);
	this.type = 'PLPanel';
	var self = this;
	cont.addChild(this);
	// CommonStyles.addElement(this);

	this.x = _x || 0;
	this.y = _y || 0;

	this._width = 100;
	this._height = 100;
	this._color = CommonStyles.color;
	this._color1 = CommonStyles.color1;
	this._kontur = true;
	this._nizNum = 30;
	this._nizAlpha = 0.2;
	this._notBac = false;
	this._visiLine = false;

	this.konturThick = CommonStyles.kontur;
	this.lineThick = CommonStyles.kontur;

	this.graphics = new Graphics();
	this.addChild(this.graphics);

	this.image = new Image(this, 0, this._height - this._nizNum, CommonStyles.base);
	// CommonStyles.removeElement(this.image, true);
	this.image.height = 30;
	this._link = this.image._link;
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

		if (this._notBac == true) {
			this.graphics.beginFill(this._color1);
			this.graphics.drawRect(-this.konturThick / 2, -this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, this._height - this.konturThick / 2, this._width + this.konturThick, this.konturThick);
			this.graphics.drawRect(-this.konturThick / 2, 0, this.konturThick, this._height);
			this.graphics.drawRect(this._width - this.konturThick / 2, 0, this.konturThick, this._height);
			return;
		}

		if (this._kontur == true) {
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

	this.kill = function () {};
	this.draw102();
}

PLPanel.prototype = Object.create(Container.prototype);
PLPanel.prototype.constructor = PLPanel;
Object.defineProperties(PLPanel.prototype, {
	link: {// замена градиентов
		set: function (value) {
			if (this._link != value) {
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
			if (this._nizAlpha != value) {
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
			if (this._nizNum != value) {
				this._nizNum = value;
				var h = this._height;
				this._height = -1;
				this.height = h;
			}
		},
		get: function () {
			return this._nizNum;
		}
	},
	notBac: {// нижний отступ меньше 0 растягиваеться на все
		set: function (value) {
			if (this._notBac != value) {
				this._notBac = value;
				this.image.visible = !this._notBac;
			}
		},
		get: function () {
			return this._notBac;
		}
	},
	kontur: {// контур вокруг контента
		set: function (value) {
			if (this._kontur != value) {
				this._kontur = value;
				this.draw102();
			}
		},
		get: function () {
			return this._kontur;
		}
	},
	width: {// ширина
		set: function (value) {
			if (this._width != value) {
				this._width = value;
				this.image.width = value;
				this.draw102();
			}
		},
		get: function () {
			return this._width;
		}
	},
	height: {// высота
		set: function (value) {
			if (this._height != value) {
				this._height = value;
				if (this._nizNum <= 0) {
					this.image.height = value;
					this.image.y = 0;
				} else {
					if (this._height > this._nizNum) {
						this.image.height = this._nizNum;
						this.image.y = this._height - this._nizNum;
					} else {
						this.image.height = value;
						this.image.y = 0;
					}
				}
				this.draw102();
			}
		},
		get: function () {
			return this._height;
		}
	},
	color: { // цвет подложки снизу
		set: function (value) {
			if (this._color != value) {
				this._color = value;
				this.draw102();
			}
		},
		get: function () {
			return this._color;
		}
	},
	color1: { // цвет контура
		set: function (value) {
			if (this._color1 != value) {
				this._color1 = value;
				this.draw102();
			}
		},
		get: function () {
			return this._color1;
		}
	},
	visiLine: { // цвет контура
		set: function (value) {
			if (this._visiLine != value) {
				this._visiLine = value;
				this.graphLine.visible = this._visiLine;
			}
		},
		get: function () {
			return this._visiLine;
		}
	}
});