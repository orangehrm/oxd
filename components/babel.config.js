module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".vue", ".js", ".json"],
        alias: {
          "@orangehrm/oxd": "./src"
        }
      }
    ]
  ]
};
