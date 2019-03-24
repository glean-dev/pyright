/**
* webpack.config-server.js
* Copyright: Microsoft 2018
*
* Configuration for webpack to bundle the javascript into a single file
* for the VS Code Extension language server.
*/

const path = require('path');

const shebangLoader = function(source) {
  this.cacheable && this.cacheable();
  if (typeof source === "string" && /^#!/.test(source)) {
    source = source.replace(/^#![^\n\r]*[\r\n]/, "");
  }
  return source;
};

module.exports = {
    entry: './src/server.ts',
    mode: 'development',
    target: 'node',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '../client/server')
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '.'),
            'node_modules'
        ],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'ts-loader', options: { configFile: 'tsconfig.json' }},
                    { loader: require.resolve('./shebang-loader.js') }
                ]

            }
        ]
    },

    node: {
        fs: 'empty'
    }
};
