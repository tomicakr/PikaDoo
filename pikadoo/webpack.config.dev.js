import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors/
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/src/index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: [' ','.jsx']
    }
}