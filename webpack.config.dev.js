var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool:'inline-source-map',
  entry: [
    './src/index.js'
  ]
  , output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
  , module: {                                           // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
      rules: [
          {
            loader: 'babel-loader',				// babel loader가 파이프를 통해 js 코드를 불러옴
            test: /\.(js$|jsx$)/,                          // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
            exclude: /node_module/                 // node module 폴더는 babel 컴파일에서 제외
          },
          {
            test: /\.(s[ac]ss$|css$)/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
            test: /\.(tsx|ts|jsx)?$/,
            use: [
              'ts-loader'
            ]
          }
      ]
  }
  , resolve: {
    extensions: ['.js', '.jsx', 'ts']
  } // webpack이 확장자 없이 해석할수 있도록 확장자 등록
  ,plugins: [
    new HtmlWebpackPlugin(
        {template: path.join(__dirname, 'src/index.html')}
    ),
    new CleanWebpackPlugin()
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
  }
};