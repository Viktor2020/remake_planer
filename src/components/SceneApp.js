
import { Container, Graphics, autoDetectRenderer } from 'pixi.js';
import { PlPanel } from '../utils/plBasicUnits/PlPanel.js';
import { PlButton } from '../utils/plBasicUnits/PlButton.js';
import { SFloor } from '../components/SFloor.js';
import globalParam from '../components/GlobalParam.js';
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
	globalParam.setParam('stage', this.stage);

	this.sFloor = new SFloor();
	this.stage.addChild(this.sFloor.content2d)

	this.resize = function (width, height) {
		this.width = width;
		this.height = height;

		this.sFloor.resize(this.width, this.height);
		// this.draw();
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