import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';



export default {
	mode: 'development',
	entry: path.resolve('./src/js/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[ext]',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
  }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      
        {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
           "css-loader",
           {
             loader: "postcss-loader",
             options: {
              postcssOptions: {
                 plugins: ["postcss-preset-env"]
              }
             }
           },
           "sass-loader"
          ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].ext'
        }
      },
      {
        test: /\.(jpe?g|png|webp)/,
        type: 'asset/resource'
       },
       {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          targets: "defaults",
          presets: [
            ['@babel/preset-env']
          ]
        }
      }
    }
    ],
  },
};