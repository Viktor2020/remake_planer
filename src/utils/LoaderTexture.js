

import { utils, loaders, Texture, BaseTexture } from 'pixi.js';

export function LoaderTexture () {
	var self = this;
	this.type = 'LoaderTexture';

	this.array = [];
	this.getTexture = function (link, fun) {
		if (!link || link === 'null') {
			fun(Texture.EMPTY);
			return;
		}
		// уже загружен в текстурном кеше
		var textureFromCache = utils.TextureCache[link];
		if (textureFromCache) {
			fun(textureFromCache);
			return;
		}
		// уже загружен
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].okLoad === true) {
				if (this.array[i].link === link) {
					fun(this.array[i].texture);
					return;
				}
			}
		}
		// загружаеться
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].okLoad === false) {
				if (this.array[i].link === link) {
					this.array[i].arrFun.push(fun);
					return;
				}
			}
		}
		// несуществует
		var p = new PPixi();
		this.array.push(p);
		p.link = link;
		p.arrFun.push(fun);
		p.idArr = this.array.length - 1;
		p.start();
	};

	var arrFun = [];
	this.getTexture2 = function (link, fun) {
		if (!arrFun[link]) arrFun[link] = [];
		if (fun) arrFun[link].push(fun);
		var t = utils.TextureCache[link];
		if (t) {
			while (arrFun[link].length > 0) {
				arrFun[link].pop()(t);
			}
			return;
		}
		new loaders.Loader().add(link).load(function (e) {
			t = utils.TextureCache[link];
			if (t) {
				while (arrFun[link].length > 0) {
					arrFun[link].pop()(t);
				}
			} else {
				// new PLImage(main.content2d, Math.random() * 500, Math.random() * 500, link);
			}
		});
	};

	this.clearFun = function (link, fun) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].link === link) {
				if (fun) {
					var index = this.array[i].arrFun.indexOf(fun);
					if (index !== -1) {
						this.array[i].arrFun.splice(index, 1);
					}
				} else {
					this.array[i].arrFun.length = 0;
				}
			}
		}
	};

	this.clearFun2 = function (link, fun) {
		if (arrFun[link]) {
			if (fun) {
				var index = arrFun[link].indexOf(fun);
				if (index !== -1) arrFun[link].splice(index, 1);
			} else {
				arrFun[link].length = 0;
			}
		}
	};
}
/**
 * Создание картинки и загрузка.
 */
function PPixi () {
	var self = this;
	this.okLoad = false;
	this.name = 'xzNull';
	this.link = 'xzNull';
	this.idArr = -1;
	this.texture = null;
	this.arrFun = [];
	this.image = new Image();

	this.loadError = function (e) {
		self.texture = Texture.EMPTY;
		window.console.log('Херня в PPixi нет линка текстур', e);
		self.finish();
	};

	this.loadComplit = function (e) {
		self.texture = new Texture(new BaseTexture(self.image));
		self.finish();
	};

	this.start = function () {
		self.image.onerror = self.loadError;
		self.image.crossOrigin = '';
		self.image.onload = self.loadComplit;
		self.image.src = self.link;
		self.image.interactive = false;
	};

	this.finish = function () {
		self.okLoad = true;
		while (this.arrFun.length > 0) {
			var fun = this.arrFun.pop();
			fun(this.texture);
		}
	};
}
