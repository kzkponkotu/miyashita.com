import path from 'path';

const webpackConfigs = [
  (config, args) => {
    const { stage, defaultLoaders: { jsLoader, fileLoader } } = args;
    const isDev = stage === 'dev';
    const cssLoader = {
      test: /\.css$/,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: isDev,
            ident: 'postcss',
            plugins: loader => [
              require('postcss-import')({
                path: [path.resolve(__dirname, '../src')],
                root: loader.resourcePath,
              }),
              require('postcss-cssnext')({
                features: {
                  browsers: ['last 2 versions', 'safari >= 9'],
                },
              }),
              require('postcss-flexbugs-fixes'),
              ...(isDev ? [] : [require('csswring')()]),
            ],
          },
        },
      ],
    };

    config.module.rules = [
      {
        oneOf: [jsLoader, cssLoader, fileLoader],
      },
    ];
    return config;
  },
];
export default webpackConfigs;