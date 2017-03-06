const xserver = require('../../index');
const router = xserver.Router();
const app = xserver();

app.use('/static', xserver.static(__dirname + '/public'));
app.use((req, res, next) => {
    console.log(1);
    next();
});
app.use((req, res, next) => {
    console.log(2);
    next();
});
router.use('/xxx', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'xserver');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('xxx');
    res.end();
});
router.use('/yyy', (req, res, next) => {
    res.render('index', {
    	title: 'test',
    	body: 'test'
    });
});
app.use(router);
app.listen();