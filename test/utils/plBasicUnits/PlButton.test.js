var assert = require('assert');

import { PlButton } from '../../../src/utils/plBasicUnits/PlButton.js';

var btn = new PlButton();
console.log(btn)

describe('PlButton', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});