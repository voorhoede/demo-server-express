const express = require('express');
const renderer = require('./lib/renderer');

const app = express();
const isDevelopment = ('development' === process.env.NODE_ENV);
const port = process.env.PORT || 9777; // 9777 is "xprs" in T9

app.get('/', (req, res) => res.send(renderer.render('index.html')));
app.use('/assets', express.static('src/assets'));
app.use('/blog/', require('./src/blog/router'));
app.use('/gallery/', require('./src/gallery/router'));

if(isDevelopment) {
    app.use('/demo/', require('./src/demo/router'));
}

app.listen(port, listening);

function listening () {
    console.log('Demo server available on http://localhost:' + port);
    if(isDevelopment) {
        // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
        const browserSync = require('browser-sync');
        browserSync({
            files: ['src/**/*.{html,js,css}'],
            online: false,
            open: false,
            port: port + 1,
            proxy: 'localhost:' + port,
            ui: false
        });
    }
}
