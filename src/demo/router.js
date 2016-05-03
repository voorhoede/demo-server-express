const express = require('express');
const listModules = require('../../lib/list-modules');
const markdownToHtml = require('../../lib/markdown-to-html');
const placeholderApi = require('../../lib/placeholder-api');
const renderer = require('../../lib/renderer');

const renderHtml = (filename, data) => renderer.render(filename, data);
const renderReadme = (filename) => renderHtml('demo/info/info.html', { body: markdownToHtml.render(filename) });

const router = express.Router();

router.get('/', (req, res) => res.send(renderHtml('demo/viewer/viewer.html')));
router.use('/viewer.css', express.static('src/demo/viewer/viewer.css'));
router.use('/viewer.js', express.static('src/demo/viewer/viewer.js'));

router.get('/mapping.json', (req, res) => res.send(require('./mapping.json')));
router.use('/linker.css', express.static('src/demo/linker/linker.css'));
router.use('/linker.js', express.static('src/demo/linker/linker.js'));

router.get('/modules.json', (req, res) => res.send(modulesJson()));
router.get('/modules/*?/readme', (req, res) => res.send(renderReadme(req.params[0] + '/README.md')));
router.get('/modules/*?', (req, res) => res.send(renderHtml(req.params[0] + '.demo.html')));

function modulesJson() {
    return listModules().map(name => {
        const nameParts = name.split('/');
        return {
            group: nameParts[0],
            name: (nameParts[1] === nameParts[2]) ? nameParts[2] : [nameParts[1], nameParts[2]].join('/'),
            url: '/demo/modules/' + name,
            info: {
                readme: '/demo/modules/' + [nameParts[0], nameParts[1]].join('/') + '/readme'
            }
        }
    });
}

module.exports = router;

