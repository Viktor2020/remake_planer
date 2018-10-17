

import { PlBasic } from './PlBasic.js';
import { Container, Graphics } from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import { PlPanel } from './PlPanel.js';
import { PlLabel } from './PlLabel.js';
import globalParam from '../../components/GlobalParam.js';

export function PlButton () {
	PlBasic.call(this);
	var self = this;
	this.type = 'PlButton';

	this._height = this.wh;
	this._visiblePanel = true;
	this._boolKontur = false; // показывать ли контур
	this._otstup = 0; // отступ картинки от краев
	this._boolProp = true; // масштабировать ли картинку
	this._okDown = true;
	this._boolAnimKontut = true; // Мигание контура при наведении
	this._labelOtstup = null;

	this.boolScalePic = false;
	this.result = null;
	this.files = null;
	this.boolCenter = false; // центрировать ли картинку
	this.image = null;
	this.link = null;
	this.stage = globalParam.getParam('stage');

	this.contentPanel = new Container();
	this.addChild(this.contentPanel);

	this.panel = new PlPanel();
	this.contentPanel.addChild(this.panel);
	this.panel.height = this._height;
	this.panel.kontur = false;
	this.panel.color = this._color;
	this.panel.nizNum = 0;
	this.panel.nizAlpha = 0.7;

	this.panel1 = new PlPanel();
	this.contentPanel.addChild(this.panel1);
	this.panel1.height = this._height;
	this.panel1.kontur = false;
	this.panel1.visible = false;
	this.panel1.link = this.base2;
	this.panel1.color = this._color1;
	this.panel1.nizNum = 0;
	this.panel1.nizAlpha = 1;

	this.gPlus = new Graphics();// Для дебаг отрисовки
	this.addChild(this.gPlus);

	this.contentFilt = new Container();
	this.addChild(this.contentFilt);
	this.tween = new TWEEN.Tween(this.contentFilt);

	this.label = new PlLabel();
	this.contentFilt.addChild(this.label);

	this.graphF = new Graphics();
	this.contentFilt.addChild(this.graphF);

	this.contShap = new Container();
	this.contentFilt.addChild(this.contShap);
	// контейнер поверх всех
	this.contDop = new Container();
	this.addChild(this.contDop);

	this.filt = this.filter;

	this.label.setParam(this.label.font, 0xffffff, true);
	this.rect = this.label.getBounds();

	this.graphInter = new Graphics();
	this.addChild(this.graphInter);

	self.tipBut = 0;

	/// Графика, накрывающая кнопку
	this.graphRect = new Graphics();
	this.addChild(this.graphRect);
	this.graphRect.alpha = 0.5;
	this.graphRect.visible = false;
	this.graphRect.interactive = true;

	// побстаиваем ширину под текст
	this.textWidth = function (_otstup) {
		var otstup = _otstup || 0;
		this.width = (this.rect.width / this.worldTransform.a + 10) + otstup;
	};

	var ratio;
	this.konturSize = this.kontur;
	this.konturColor = this.colorSlid;
	this.draw102 = function () {
		this.graphInter.clear();
		this.graphInter.beginFill(0xff0000, 0);
		this.graphInter.drawRect(0, 0, this._width, this._height);

		if (this._boolKontur) {
			this.graphInter.lineStyle(this.konturSize, this.konturColor, 1);
			this.graphInter.drawRect(0.5, 0.5, this._width, this._height);
		}
		this.graphF.clear();
		this.graphF.beginFill(0xffffff, 0.01);
		this.graphF.drawRect(0, 0, this._width, this._height);


		if (this._labelOtstup == null) {
			this.label.x = (this._width - this.rect.width) / 2;
			if (this.label.x < 5) this.label.x = 5;
		} else {
			this.label.x = this._labelOtstup;
		}
		this.label.y = (this._height - this.rect.height) / 2;

		if (this.image !== null) {
			this.label.x = this._height + 5;
			if (this.boolScalePic) {
				ratio = this.image.picWidth / this._width;
				if (ratio < this.image.picHeight / this._height) ratio = this.image.picHeight / this._height;
				this.image.width = this.image.picWidth / ratio;
				this.image.height = this.image.picHeight / ratio;
				this.image.x = (this._width - this.image.width) / 2;
				this.image.y = (this._height - this.image.height) / 2;
			}
		}
		if (this._width > this._height) {
			this.contShap.scale.x = this.contShap.scale.y = this._height / 100;
			this.contShap.x = (this._width - this._height) / 2;
			this.contShap.y = 0;
		} else {
			this.contShap.scale.x = this.contShap.scale.y = this._width / 100;
			this.contShap.x = 0;
			this.contShap.y = (this._height - this._width) / 2;
		}
		this.graphRect.clear();
		this.graphRect.beginFill(this._color);
		this.graphRect.drawRect(0, 0, this._width, this._height);
		this.graphRect.endFill();
	};

	this.mouseOut = function (e) {
		if (self._boolAnimKontut === true) {
			self.panel.kontur = false;
			self.panel1.kontur = false;
		}
		self.dispatchEvent({type: 'mouseout', param: e});
	};

	this.mouseOver = function (e) {
		if (self._boolAnimKontut === true) {
			self.panel.kontur = true;
			self.panel1.kontur = true;
		}
		self.contentFilt.alpha = 0.5;
		self.tween.to({alpha: 1}, 500);
		self.tween.start();
		self.dispatchEvent({type: 'mouseover', param: e});
	};

	this.mouseDown = function (e) {
		if (self.file !== undefined) {
			self.file.click();
			self.dispatchEvent({type: 'downloadfile'});
			return;
		}
		self.dispatchEvent({type: 'mousedown', param: e});
		self.tipBut = 1;
		self.draw102();
	};

	this.mouseUp = function (e) {
		self.tipBut = 0;
		self.draw102();
		self.dispatchEvent({type: 'mouseup', param: e});
		if (this.isMouseEvents) {
			this.stage.off('mouseup', self.mouseUp);
		}

		if (this.isTouchEvents) {
			this.stage.off('touchend', self.mouseUp);
		}
	};

	this.setStile = function (num, _w, _h) {

		if (num === 0) {
			this.label.setParam(14, this.style.fill);
			this.panel.nizAlpha = 0.7;
			this.panel.nizNum = 0;
			this.color = this.colorButton;
		}
		if (num === 1) {
			this.label.setParam(14, this.style.fill);
			this.panel.nizAlpha = 0.25;
			this.panel.nizNum = 30;
			this.color = 0xf0f0f0;
		}
		if (_w) this.width = _w;
		if (_h) this.height = _h;
	};

	this.startFile = function (accept) {
		if (this.file === undefined) {
			this.file = document.createElement('input');
			this.file.type = 'file';
			if (accept) this.file.accept = accept;// "image/*";
			this.file.style.display = 'none';
			this.file.onchange = this.onchange;
		}
	};

	this.onchange = function (e) {
		if (e.target.files.length === 0) return;// нечего не выбрали
		self.files = e.target.files;
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (_e) {
			self.result = _e.target.result;
			self.dispatchEvent({type: 'onload', param: self.result});
			self.file.value = null;
		};
	};

	this.addCont100 = function (cont) {
		this.contShap.addChild(cont);
	};

	this.complitLoadImage = function () {

		if (self.funComplit) self.funComplit();
		self.otstup = self._otstup;//
	};

	this.funErrorImage = function () {
		self.dispatchEvent({type: 'onerror'});
	};

	var propI;
	var propE;
	var w, h;
	this.loadImeg = function (link) {
		this.link = link;
		if (this.image === null) {
			this.image = new PLImage(this.contentFilt, 0, 0, undefined, function () {

				if (self._boolProp) {
					w = this.image.width;
					h = this.image.height;
					propE = self._height / self._width;
					propI = this.image.height / this.image.width;
					if (propE > propI) {
						this.height = h * (self._width / w);
						this.width = self._width;
					} else {
						this.width = w * (self._height / h);
						this.height = self._height;
					}
					if (self.boolCenter) {
						this.x = (self._width - this._width) / 2;
						this.y = (self._height - this._height) / 2;
					}
				} else {
					this.width = self._height;
					this.height = self._height;
				}
			});
			this.image._preloaderBool = true;

			this.image.funComplit = this.complitLoadImage;
			this.image.funError = self.funErrorImage;

		}
		if (self._height < self._width) this.image.width = this.image.height = self._height;
		else this.image.width = this.image.height = self._width;
		this.image.link = link;
		this.draw102();
	};

	this.kill = function () {};

	this.setColor = function (color) {
		this.panel.color = color;
	};

	this.setColor1 = function (color) {
		this.panel1.color1 = value;
	};

	this.setWidth = function (width) {
		this.panel.width = value;
		this.panel1.width = value;
		this.draw102();
	};

	this.setHeight = function (height) {
		this.panel.height = value;
		this.panel1.height = value;
		this.draw102();
	};

	this.setActiv = function (activ) {
		this.panel.visible = !value;
		this.panel1.visible = value;
		this.dispatchEvent({type: 'setactiv'});
	};

	this.setActivMouse = function (activMouse) {
		this.graphRect.visible = !activMouse;
	};

	this.setText = function (text) {
		this.label.text = this._text;
		if (text === undefined) this._text = 'text';
		if (text == null) this._text = 'text';
		if (text.length === 0) this._text = ' ';
		this.rect = this.label.getBounds();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;
		this.draw102();
		this.dispatchEvent({type: 'settext'});
	};

	this.setOtstup = function (otstup) {
		if (this.image) this.image.otstup = otstup;
	};


	this.draw102();

	this._okDown = false;
	this.okDown = true;
}

PlButton.prototype = Object.create(PlBasic.prototype);
PlButton.prototype.constructor = PlButton;

Object.defineProperties(PlButton.prototype, {
	visiblePanel: {
		set: function (value) {
			this._visiblePanel = value;
			this.contentPanel.visible = value;
		},
		get: function () {
			return this._visiblePanel;
		}
	},
	boolAnimKontut: {
		set: function (value) {
			this._boolAnimKontut = value;
			if (this._boolAnimKontut === true) {
				this.panel.kontur = false;
				this.panel1.kontur = false;
			} else {
				this.panel.kontur = true;
				this.panel1.kontur = true;
			}
		},
		get: function () {
			return this._boolAnimKontut;
		}
	},
	boolKontur: {
		set: function (value) {
			this._boolKontur = value;
			this.draw102();
		},
		get: function () {
			return this._boolKontur;
		}
	},
	boolProp: {
		set: function (value) {
			this._boolProp = value;
		},
		get: function () {
			return this._boolProp;
		}
	},
	okDown: {
		set: function (value) {
			if (this._okDown !== value) {
				this._okDown = value;
				if (this._okDown === true) {
					this.graphInter.interactive = true;
					this.graphInter.buttonMode = true;
					if (this.isMouseEvents) {
						this.graphInter.on('mousedown', this.mouseDown);
						this.graphInter.on('mouseout', this.mouseOut);
						this.graphInter.on('mouseover', this.mouseOver);
					}
					if (this.isTouchEvents) {
						this.graphInter.on('touchstart', this.mouseDown);
					}
				} else {
					this.graphInter.interactive = false;
					this.graphInter.buttonMode = false;
					if (this.isMouseEvents) {
						this.graphInter.off('mousedown', this.mouseDown);
						this.graphInter.off('mouseout', this.mouseOut);
						this.graphInter.off('mouseover', this.mouseOver);
					}
					if (this.isTouchEvents) {
						this.graphInter.off('touchstart', this.mouseDown);
					}
				}
			}
		},
		get: function () {
			return this._okDown;
		}
	},
	labelOtstup: {
		set: function (value) {
			if (this._labelOtstup === value) return;
			this._labelOtstup = value;
			this.label.x = this._labelOtstup;
		},
		get: function () {
			return this._labelOtstup;
		}
	}
});
