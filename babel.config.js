module.exports = function (api) {
  api && api.cache(false);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          "targets": {
            "esmodules": true
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      // '@babel/plugin-transform-object-assign',
      // [
      //   "@babel/plugin-proposal-decorators",
      //   {
      //     "legacy": true
      //   }
      // ],
      "@babel/plugin-proposal-class-properties"
    ]
  };
};
