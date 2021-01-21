const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {

	return {
		context: path.resolve(__dirname, './src'),

		entry: { app: './index.tsx' },

		output: {
			filename: '[name].[fullhash].bundle.js',
			chunkFilename: '[name].[fullhash].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: ''
		},

		devServer: {
			open: true,
			hot: true
		},

		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			alias: {
				"react": "preact/compat",
				"react-dom": "preact/compat",
				preact: path.resolve(__dirname, 'node_modules', 'preact'),
				"preact/hooks": path.resolve(__dirname, 'node_modules', 'preact', 'hooks')
			}
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]'
							}
						}
					]
				}
			],
		},

		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: 'Preact TSX PWA',
				filename: "index.html",
				favicon: 'favicon.ico',
				chunksSortMode: "manual",
				chunks: ['vendors', 'app']
			}),
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
				chunkFilename: '[id].[contenthash].css',
			}),
			new WorkboxPlugin.GenerateSW({
				clientsClaim: true,
				skipWaiting: true
			}),
			new CopyPlugin({
				patterns: [
					{ from: path.resolve(__dirname, './public/images'), to: 'images' },
					{ from: path.resolve(__dirname, './public/manifest'), to: 'manifest' }
				]
			}),
		],

		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
			splitChunks: {
				cacheGroups: {
					commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
				}
			}
		}
	}
}
