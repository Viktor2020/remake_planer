
import { Container, Graphics, autoDetectRenderer } from 'pixi.js';
import { PlPanel } from '../utils/plBasicUnits/PlPanel.js';
import { PlButton } from '../utils/plBasicUnits/PlButton.js';

export function SFloor () {
	var self = this;

	this.width = 100;
	this.height = 100;

	this.content2d = new Container();

	this.background = new Graphics();
	this.content2d.addChild(this.background);

	this.panel = new PlPanel();
	this.content2d.addChild(this.panel);
	this.panel.x = 100;
	this.panel.y = 100;

	this.button = new PlButton();
	this.content2d.addChild(this.button);
	this.button.x = 210;
	this.button.y = 100;
	this.button.text = 'Text';
	this.button.okDown = true;

	this.button.addEventListener('mousedown', function () {
		console.log('mousedown');
	});

	this.button.addEventListener('mouseout', function () {
		console.log('mouseout');
	});

	this.button.addEventListener('mouseover', function () {
		console.log('mouseover');
	});

	this.draw = function () {
		this.background.clear();
		this.background.beginFill(0x008080);
		this.background.drawRect(0, 0, this.width, this.height);
		this.background.endFill();
	};

	this.resize = function (width, height) {
		this.width = width;
		this.height = height;
		this.draw();
	};
}