export class Test {
	constructor () {
		window.console.log('constructor test');
	}

	sizeWindow () {
		//
	}

	init () {
		this.sayHello();
		document.writeln('App 2 inited');
		setTimeout(() => {
			window.alert('loading second project');
		}, 100);
	}

	fackeInit () {
		if (this.fun) this.fun(100);
		this.init();
	}

	sayHello () {
		window.console.log('Hellog Test.js');
	}
}
