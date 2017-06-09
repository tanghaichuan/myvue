
var path=require("path");
var webpack=require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var config={
	devtool:'eval-source-map',
	entry:path.resolve(__dirname,'./src/index.js'),
	output: {
		path:path.resolve(__dirname,"./dist"),
		filename:"index.js"
	},
	module:{
		loaders:[
			{
				test: /\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/
			}
		]
	},
	devServer: {
    	open:true
 	}
}

module.exports=config;