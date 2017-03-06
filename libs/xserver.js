const http = require('http');
const https = require('https');
const ServerStatic = require('serve-static');
const Router = require('./router');
const ResPack = require('./response');
let XServer = function() {
    let xserver = function(req, res, next) {
        res.__proto__ = ResPack;
        let midIndex = 0;
        let _next = function() {
            let midItem = xserver.midStack[midIndex++];
            if (midItem) {
                midItem.fn(req, res, _next);
            } else {
                res.end();
            }
        };
        if (!xserver.midStack || !xserver.midStack.length) {
            res.statusCode = 404;
            res.end();
        }
        _next();
    }
    xserver.midStack = [];
    xserver.use = function(path, fn) {
        if (typeof path !== 'string') {
            fn = path;
            path = '/';
        }
        xserver.midStack.push({
            path: path,
            fn: fn
        });
        return this;
    }
    xserver.listen = function(options) {
        options = Object.assign({}, {
            port: 3000,
            sport: 3443,
            https: false,
            key: 'server-key',
            cert: 'server-cert'
        }, options);
        const httpdone = function() {
            console.log(`http server start, listen port ${options.port}`);
        }
        const httpsdone = function() {
            console.log(`https server start, listen port ${options.sport}`);
        }
        http.createServer(this).listen(options.port, httpdone);
        if (options.https) {
            https.createServer({
                key: options.key,
                cert: options.cert
            }, this).listen(options.sport, httpsdone);
        }
    }
    return xserver;
};
XServer.Router = Router;
XServer.static = ServerStatic;
module.exports = XServer;