describe('getBounds', function () {
	it('it should work', function () {
		const container = new PIXI.Container();

		container.position.set(20, 20);

		expect(container.x).to.equal(20);
		expect(container.y).to.equal(20);
	});
});