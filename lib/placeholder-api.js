const Promise = require('bluebird');
const request = require('request');

const baseUrl = 'http://jsonplaceholder.typicode.com';

// todo: add caching of x minutes? https://github.com/ptarjan/node-cache

module.exports = {
    get: (route) => new Promise((resolve, reject) => {
        request(`${baseUrl}${route}`, (err, response, body) => {
            if (err) {
               return reject(err);
            }
            if (response.statusCode !== 200) {
                return reject('error ' + response.statusCode);
            }
            try {
               const data = JSON.parse(body);
               return resolve(data);
            } catch (err) {
               return reject(err);
            }
        });
    })
};