const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://54.84.184.35/:8080",
      changeOrigin: true,
    })
  );
};
