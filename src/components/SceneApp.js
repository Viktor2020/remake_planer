
import { Container, Graphics, autoDetectRenderer } from 'pixi.js'
import Panel from '../utils/components/Panel.js'

export default function SceneApp () {
	var self = this;

	this.width = 100;
	this.height = 100;

	this.renderer = autoDetectRenderer(this.width, this.height, {
		antialias: false,
		transparent: false,
	});

	this.renderer.autoResize = true;
	document.body.appendChild(this.renderer.view);

	this.stage = new Container();

	this.background = new Graphics();
	this.stage.addChild(this.background);

	this.panel = new Panel(this.stage, 100, 100);

	this.draw = function () {
		this.background.clear();
		this.background.beginFill(0xffffff*Math.random());
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
	};

	this.update = function () {
		
	};
}