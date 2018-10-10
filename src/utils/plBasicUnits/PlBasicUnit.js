
import { LoaderTexture } from '../../utils/LoaderTexture.js';
import { EventDispatcher } from '../../utils/EventDispatcher.js';
import { Container } from 'pixi.js';

export function PlBasicUnit () {
	Container.call(this);
	var self = this;
	this.type = 'PlBasicUnit';

	this._width = 100;
	this._height = 100;
	this._otstup = 2;
	this._color = 0xffffff;
	this._color1 = 0x9b9fa8;
	this._text = '';
	this._link = '';

	this.color2 = 0xc9daec;
	this.kontur = 0.5;
	this.wh = 27;
	this.whMin = 10;
	this.colorButton = 0x777777;
	this.colorButton1 = 0xffb200;
	this.colorButton2 = 0xdddddd;
	this.whText = 16;
	this.fontLabel = 'Arial';
	this.isMouseEvents = true;
	this.isTouchEvents = false;
	this.style = {
		fontFamily: 'Arial',
		fontSize: 16,
		fontStyle: 'bold',
		fill: '#757575',
		align: 'left',
		paddingRight: 6,
		paddingTop: 2
	};
	this.loaderTexture = new LoaderTexture();
	this.base = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACxUlEQVR4Xu2RYWcWAAAG38mYSExEIpHISEQiI5GIiRmJjMRITCQSIzGRmEhEIjGRiIlEIiMRGYnEjEgkMhLpQ+5fHNfzC+65Gxr8n8rA0GAw2KAiisMQZDjuQHWfICMqojgMQTbGHajuE2STiigOQ5DNcQeq+wQZVRHFYQiyJe5AdZ8gW1VEcRiCbIs7UN0nyHYVURyGIDviDlT3CbJTRRSHIciuuAPVfYLsVhHFYQiyJ+5AdZ8gYyqiOAxB9sYdqO4TZJ+KKA5DkP1xB6r7BDmgIorDEORg3IHqPkEOqYjiMAQZjztQ3SfIYRVRHIYgR+IOVPcJclRFFIchyLG4A9V9ghxXEcVhCDIRd6C6T5ATKqI4DEEm4w5U9wkypSKKwxDkZNyB6j5BTqmI4jAEOR13oLpPkGkVURyGIGfiDlT3CXJWRRSHIchM3IHqPkHOqYjiMAQ5H3eguk+QWRVRHIYgF+IOVPcJclFFFIchyKW4A9V9glxWEcVhCHIl7kB1nyBzKqI4DEGuxh2o7hPkmoooDkOQ+bgD1X2CXFcRxWEIciPuQHWfIDdVRHEYgizEHajuE+SWiigOQ5DbcQeq+wS5oyKKwxDkbtyB6j5B7qmI4jAEuR93oLpPkAcqojgMQR7GHajuE2RRRRSHIcijuAPVfYI8VhHFYQjyJO5AdZ8gT1VEcRiCLMUdqO4T5JmKKA5DkOdxB6r7BHmhIorDEORl3IHqPkFeqYjiMAR5HXeguk+QZRVRHIYgb+IOVPcJ8lZFFIchyLu4A9V9grxXEcVhCLISd6C6T5APKqI4DEE+xh2o7hPkk4ooDkOQz3EHqvsEWVURxWEIshZ3oLpPkC8qojgMQb7GHajuE+SbiigOQ5DvcQeq+wT5oSKKwxDkZ9yB6j5B1lVEcRiC/Io7UN0nyG8VURyGIH/iDlT3CfJXRRSH+QeWZzG2SGitMgAAAABJRU5ErkJggg==';

	this.setWidth = function () {};
	this.setHeight = function () {};
	this.setColor = function () {};
	this.setOtstup = function () {};
	this.setColor = function () {};
	this.setColor1 = function () {};
	this.setText = function () {};
	this.setActiv = function () {};
	this.setValue = function () {};
	this.setActivMouse = function () {};
	this.setLink = function () {};
}

PlBasicUnit.prototype = Object.create(Container.prototype);
PlBasicUnit.prototype.constructor = PlBasicUnit;
PlBasicUnit.prototype = Object.assign(PlBasicUnit.prototype, EventDispatcher.prototype);

Object.defineProperties(PlBasicUnit.prototype, {
	width: {
		set: function (value) {
			if (this._width === value) return;
			this._width = value;
			this.setWidth(this._width);
		},
		get: function () {
			return this._width;
		}
	},
	height: {
		set: function (value) {
			if (this._height === value) return;
			this._height = value;
			this.setHeight(this._height);
		},
		get: function () {
			return this._height;
		}
	},
	otstup: {
		set: function (value) {
			if (this._otstup === value) return;
			this._otstup = value;
			this.setOtstup(this._otstup);
		},
		get: function () {
			return this._otstup;
		}
	},
	color: {
		set: function (value) {
			if (this._color === value) return;
			this._color = value;
			this.setColor(this._color);
		},
		get: function () {
			return this._color;
		}
	},
	color1: {
		set: function (value) {
			if (this._color1 === value) return;
			this._color1 = value;
			this.setColor1(this._color1);
		},
		get: function () {
			return this._color1;
		}
	},
	text: {
		set: function (value) {
			if (this._text === value) return;
			this._text = value;
			this.setText(this._text);
		},
		get: function () {
			return this._text;
		}
	},
	activ: {
		set: function (value) {
			if (this._activ === value) return;
			this._activ = value;
			this.setActiv(this._activ);
		},
		get: function () {
			return this._activ;
		}
	},
	value: {
		set: function (value) {
			if (this._value === value) return;
			this._value = value;
			this.setValue(this._value);
		},
		get: function () {
			return this._value;
		}
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse === value) return;
			this._activMouse = value;
			this.setActivMouse(this._activMouse);
		},
		get: function () {
			return this._activMouse;
		}
	},
	link: {
		set: function (value) {
			if (this._link === value) return;
			this._link = value;
			this.setLink(this._link);
		},
		get: function () {
			return this._link;
		}
	}
});