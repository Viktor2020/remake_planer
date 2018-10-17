
let instance = null;
export default class GlobalParam {
	constructor () {
		this.param = {};
	}

	static setParam (param, value) {
		if (!instance) {
			instance = new GlobalParam();
		}
		instance.param[param] = value;
	}

	static getParam (param) {
		return instance.param[param];
	}
}
