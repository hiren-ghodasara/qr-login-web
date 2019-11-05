const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@layout-body-background": "#FFFFFF",
      "@layout-header-background": "#FFFFFF",
      "@layout-footer-background": "#F5F5F5",
      'primary-color': '#0069d9',
      'link-color': '#0069d9',
    }
  })
);
