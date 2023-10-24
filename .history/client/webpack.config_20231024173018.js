const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Mode specifies the build type
    mode: 'development',

    // Entry points for the application
    entry: {
      main: './src/js/index.js',     // Main application entry point
      install: './src/js/install.js', // Entry for installation-related scripts
    },

    // Output configuration for bundled files
    output: {
      filename: '[name].bundle.js', // Name of the output bundles
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    plugins: [
      // Generate HTML files from templates
      new HtmlWebpackPlugin({
        template: './src/index.html', // Source template file
        filename: 'index.html',       // Output file name
        chunks: ['main'],             // Which chunks to include
      }),

      // Generate a PWA manifest file
      new WebpackPwaManifest({
        name: 'COOLTEXT',      // Full name of the PWA
        short_name: 'Text Editor',         // Short name for app launcher
        description: 'A progressive web app text editor.', // Description
        background_color: '#ffffff',       // Background color
        theme_color: '#3498db',            // Theme color
        start_url: '/',                    // Start URL when the app is launched
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Icon path
            sizes: [96, 128, 192, 256, 384, 512],    // Icon sizes
          },
        ],
      }),

      // Generate a service worker using Workbox
      new InjectManifest({
        swSrc: './src-sw.js',  // Source service worker script
        swDest: 'src-sw.js',       // Output service worker script
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,                  // Test for CSS files
          use: ['style-loader', 'css-loader'], // Loaders for CSS
        },
        {
          test: /\.js$/,                   // Test for JS files
          exclude: /node_modules/,         // Exclude node_modules
          use: {
            loader: 'babel-loader',        // Use Babel loader for JS
            options: {
              presets: ['@babel/preset-env'], // Babel presets
            },
          },
        },
      ],
    },
  };
};
