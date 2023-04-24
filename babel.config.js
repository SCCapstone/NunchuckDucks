module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // ["@babel/preset-env", { targets: { node: "current" } }],
      // ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-proposal-private-methods", { loose: false }],
      ["@babel/plugin-proposal-class-properties", { loose: false }],
    ],
  };
};

// module.exports = {
//   presets: [
//     // "babel-preset-expo",
//     // ["@babel/preset-env", { targets: { node: "current" } }],
//     // ["@babel/preset-react"],
//   ],
//   plugins: [
//     // "@babel/plugin-transform-flow-strip-types",
//     // ["@babel/plugin-proposal-private-methods", { loose: true }],
//   ],
// };

// //
// // ["@babel/plugin-proposal-private-property-in-object", { loose: false }],
