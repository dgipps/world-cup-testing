const axios = require('axios');

const matches = {
    getMatches: function () {
        return new Promise(function (resolve, reject) {
            axios.get('https://worldcup.sfg.io/matches')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }
};

module.exports = matches
