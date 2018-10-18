/* eslint-disable global-require */
require('../node_modules/pixi.js');

PIXI.utils.skipHello(); // hide banner

describe('PIXI', function () {
	it('should exist as a global object', function () {
		expect(PIXI).to.be.an('object');
	});
	require('./plComponents');
});