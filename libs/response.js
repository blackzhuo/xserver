const fs = require('fs');
const path = require('path');
const http = require('http');
const Handlebars = require('handlebars');
let res = {};
res.render = function(name, data) {
    let source = fs.readFileSync(path.resolve(process.cwd(), 'views', `${name}.hbs`), 'utf-8');
    let template = Handlebars.compile(source);
    let html = template(data);
    this.setHeader('Content-Type', 'text/html');
    this.setHeader('X-Powered-By', 'xserver');
    this.writeHead(200, {
        'Content-Type': 'text/html'
    });
    this.end(html);
}
res.__proto__ = http.ServerResponse.prototype;
module.exports = res;