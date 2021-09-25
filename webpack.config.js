var webpack = require('webpack');
// importing plugins that do not come by default in webpack

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
 
    module: {
       
        rules: [
           
            {
                test: [/\.ttf$/],
                use: [{ loader: 'file-loader'}]
              },
            {
                test: [/\.js$/],
                exclude: /node_modules/,
                use: [
                    {loader: "babel-loader"},
                   
                ]
                
            },
            {
                test: [/\.css$/i],
                exclude: /node_modules/,
                use: [
                 "css-loader"
                ]
                
            },
           
        ]
    },
    node: {
        global: true
      },
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            console: require.resolve('console-browserify'),
            constants: require.resolve('constants-browserify'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder'),
            sys: require.resolve('util'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url'),
            util: require.resolve('util'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),
        }
      },
      plugins :[ new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      })
      ,
    //   new UglifyJSPlugin(),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV' : JSON.stringify('production'),
      })
    ],
};