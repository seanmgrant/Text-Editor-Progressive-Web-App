const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add CSS loaders and babel to webpack. DID

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //Add and configure workbox plugins for a service worker and manifest file.  
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor',
      }),
      // Service worker injection
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      //Manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#01579b',
        theme_color: '#ffffff',
        star_url: '/',
        pulicpath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),    
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              Plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }
        
      ],
    },
  };
};
