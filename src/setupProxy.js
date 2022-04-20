const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com",
      changeOrigin: true,
    })
  );
};
