const path = require('path');

let conf = {
	entry: './src/index.js',
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
				loader: 'babel-loader'
				// exclude: '/node_modules/'
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
