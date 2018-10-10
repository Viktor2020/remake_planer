
import { PlBasicUnit } from './PlBasicUnit.js';
import { Container, Graphics, Text } from 'pixi.js';

export function PlLabel () {
	PlBasicUnit.call(this);
	var self = this;
	this.type = 'PlLabel';

	this.content = new Container();
	this.addChild(this.content);

	this._bold = true;
	this._text = '';
	this._height = this.wh;
	this._width = 100;
	this._boolTin = false;
	this._fontSize = 0;

	this.strColor = '';
	this.strColor2 = '';

	this.curW = 0; // длина текста
	this.curH = 0;

	this._align = this.style.align = 'center';
	this._fontFamily = this.style.fontFamily;
	this._fontSize = this.style.fontSize;
	this._color = this.style.fill;
	this._fontStyle = this.style.fontStyle;

	this.label = new Text(this._text, this.style);
	this.label.resolution = 1.11;// FIXME размытие шрифтов везде, нашел решение в интрнете наполовину норм, наполовину каличное
	this.label.shader = null;// FIXME эта половина каличная
	this._font = this._fontSize = this.label.style.fontSize;

	this.curW = this.label.width;
	this.curH = this.label.height;
	this.content.addChild(this.label);
	this._color = this.label.style.fill;

	this.setParam = function (_font, _color, _boolTin) {
		this._color = _color;
		this.style.fill = _color;
		this.font = _font;
		this.boolTin = _boolTin;
	};

	this.getRect = function () {
		return this.label.getBounds();
	};

	this.kill = function () {
		this.removeChild(this.label);
		this.label = null;
	};

	this.updateHeight = function () {
		var r = this.label.getBounds();
		this._height = r.height;
	};
	this.setColor = function () {
		if (this.strColor.length > 2) {
			if (this.strColor[1] == 'x') {
				this.strColor2 = '#';
				for (var i = 2; i < this.strColor.length; i++) {
					this.strColor2 += this.strColor[i];
				}
				this._color = this.strColor2;
			}
		}
		this.label.style.fill = this._color;
		this.style.fill = this._color;
	};

	this.setText = function (value) {
		if (value === 0) this._text = value + '';
		this.label.text = this._text;
		this.curW = this.label.width;
		this.curH = this.label.height;
		this.updateHeight();
		this.dispatchEvent({type: 'settext'});
	};

	this.updateHeight();
}

PlLabel.prototype = Object.create(PlBasicUnit.prototype);
PlLabel.prototype.constructor = PlLabel;

Object.defineProperties(PlLabel.prototype, {
	boolTin: {
		set: function (value) {
			if (value != this._boolTin) {

				if (value == true) {
					this.style.dropShadow = true;
					this.style.dropShadowColor = '#000000';
					this.style.dropShadowBlur = 4;
					this.style.dropShadowAngle = Math.PI / 6;
					this.style.dropShadowDistance = 2;
				} else {
					delete this.style.dropShadow;
					delete this.style.dropShadowColor;
					delete this.style.dropShadowBlur;
					delete this.style.dropShadowAngle;
					delete this.style.dropShadowDistance;
				}
				this.label.style = this.style;
				this._boolTin = value;
			}

		},
		get: function () {
			return this._boolTin;
		}
	},
	fontSize: {
		set: function (value) {
			this._fontSize = value;
			this.font = value;
		},
		get: function () {
			return this._fontSize;
		}
	},
	fontFamily: {
		set: function (value) {
			this._fontFamily = value;
			this.style.fontFamily = value;
			this.label.style = this.style;
		},
		get: function () {
			return this._fontFamily;
		}
	},
	font: {
		set: function (value) {
			this._font = value;
			this.style.fontSize = value;
			this.label.style = this.style;
			this.updateHeight();
		},
		get: function () {
			return this._font;
		}
	},
	bold: {
		set: function (value) {
			this._bold = value;
			if (this._bold == true) this.style.fontStyle = 'bold';
			else this.style.fontStyle = 'normal';
			this.label.style = this.style;
		},
		get: function () {
			return this._bold;
		}
	},
	align: {
		set: function (value) {
			this._align = value;
			this.style.align = value;
			this.label.style = this.style;
		},
		get: function () {
			return this._align;
		}
	}
});
