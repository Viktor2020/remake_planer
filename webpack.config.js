const path = require('path');

let conf = {
	entry: ['./src/testComp/test.exec.js', './src/testComp/test2.exec.js', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// exclude: '/node_modules/'
			},
			{
				test: /\.exec\.js$/,
				loader: 'script-loader'
			}
		]
	},
	devtool: 'eval-sourcemap'
};

module.exports = conf;

module.exports = (_env, _options) => {
	let production = (_options.mode === 'production');
	conf.devtool = production ? false : 'eval-sourcemap';
	// conf.devtool = production ? 'source-map' : 'eval-sourcemap';
	return conf;
};
