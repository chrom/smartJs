module.exports = {
  // context: __dirname + "/app",
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './js/index'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url?limit=1000',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
    ],
  },
  watch: true,
};
