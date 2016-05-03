const express = require('express');
const placeholderApi = require('../../lib/placeholder-api');
const Promise = require('bluebird');
const renderer = require('../../lib/renderer');

const router = express.Router();

//router.get('/', function(req, res) {
//    res.write('<html><body>just be quick');
//    getPosts()
//        .then(data => res.end(JSON.stringify(data)) )
//        .catch(err => console.error(err));
//});

router.get('/', (req, res) => getPosts(req.query)
    .catch(err => console.error(err))
    .then(data => res.end(renderer.render('blog/index.html', data)))
);

router.get('/:id/:slug', (req, res) => getPost(req.params.id)
    .catch(err => console.error(err))
    .then(post => res.end(renderer.render('blog/item.html', { post })))
);

function getPosts(query) {
    query = Object.assign({ page: 1 }, query);
    const pageSize = 10;
    return placeholderApi.get('/posts/')
        .then(posts => ({
            posts: posts.slice((query.page - 1) * pageSize, query.page * pageSize),
            pages: {
                current: query.page,
                total: Math.ceil(posts.length / pageSize)
            }
        }));
}

function getPost(id) {
    return Promise.all([
            placeholderApi.get(`/posts/${id}`),
            placeholderApi.get(`/posts/${id}/comments`)
        ])
        .then(data => Object.assign(data[0], { comments: data[1] }));
}

module.exports = router;

