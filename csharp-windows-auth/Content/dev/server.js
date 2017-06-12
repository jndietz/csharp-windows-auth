/* eslint-disable */

var webpack = require("webpack");
var Agent = require("agentkeepalive");
var config = require("./webpack.config.js");
var https = require("https");
var proxy = require('http-proxy-middleware');
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");

var onProxyRes = function (proxyRes, req, res) {
    const key = "www-authenticate";
    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(",");
};

var app = express();
var compiler = webpack(config);

app.use('/api', proxy(
    {
        target: 'http://localhost:51202/',
        changeOrigin: true,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            keepAliveTimeout: 90000 // free socket keepalive for 90 seconds
        }),
        onProxyRes: onProxyRes = (proxyRes) => {
            var key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
        }
    }
));

app.use(webpackDevMiddleware(compiler,
        {
            hot: true,
            historyApiFallback: true,
            contentBase: config.output.path,
            publicPath: config.output.publicPath,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }));

app.listen(7071, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Webpack Dev Server is fired up!!');
});