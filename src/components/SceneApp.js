
import { Container, Graphics, autoDetectRenderer } from 'pixi.js';
import { PlPanel } from '../utils/plBasicUnits/PlPanel.js';
import { PlButton } from '../utils/plBasicUnits/PlButton.js';
import TWEEN from '@tweenjs/tween.js';

export function SceneApp () {
	var self = this;

	this.width = 100;
	this.height = 100;

	this.renderer = autoDetectRenderer(this.width, this.height, {
		antialias: false,
		transparent: false
	});

	this.renderer.autoResize = true;
	document.body.appendChild(this.renderer.view);

	this.stage = new Container();

	this.background = new Graphics();
	this.stage.addChild(this.background);

	this.panel = new PlPanel();
	this.stage.addChild(this.panel);
	this.panel.x = 100;
	this.panel.y = 100;

	this.button = new PlButton();
	this.stage.addChild(this.button);
	this.button.x = 210;
	this.button.y = 100;
	this.button.text = 'Text';
	this.button.okDown = true


	this.draw = function () {
		this.background.clear();
		this.background.beginFill(0xffffff * Math.random());
		this.background.drawRect(0, 0, this.width, this.height);
		this.background.endFill();
	};

	this.resize = function (width, height) {
		this.width = width;
		this.height = height;
		this.draw();
		this.renderer.resize(this.width, this.height);
	};

	this.render = function () {
		this.renderer.render(this.stage);
		TWEEN.update();
	};

	this.update = function () {
		// todo
	};
}
