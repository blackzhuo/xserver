let Router = function() {
    let router = function(req, res, next) {
        let rouIndex = 0;
        let _next = function() {
            let rouItem = router.rouStack[rouIndex++];
            if (rouItem) {
                if (rouItem.path === req.url) {
                    rouItem.fn(req, res, _next);
                } else {
                    _next();
                }
            } else {
                res.statusCode = 404;
                res.end();
            }
        };
        if (!router.rouStack || !router.rouStack.length) {
            res.statusCode = 404;
            res.end();
        }
        _next();
    }
    router.rouStack = [];
    router.use = function(path, fn) {
        if (typeof path !== 'string') {
            fn = path;
            path = '/';
        }
        router.rouStack.push({
            path: path,
            fn: fn
        });
        return this;
    }
    return router;
}
module.exports = Router;