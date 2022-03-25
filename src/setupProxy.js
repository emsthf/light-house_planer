const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "Springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com",
      // target: "http://54.84.184.35:80",
      changeOrigin: true,
    })
  );
};
