var app = require('../../server');
var chai = require('chai');
var request = require('supertest');
var mongoose = require('mongoose');

request = request(app);
var expect = chai.expect;

describe('Team API tests', function() {
    before((done) => {
        mongoose.connection.db.dropDatabase(() => {
            console.log('Setup - test database dropped');
        });
        return done();
    });

    it('get should return empty list with no teams', function(done) {
        request
            .get('/api/team')
            .end(function(err, res) {
                expect(res.body).to.deep.equal({Teams: []});
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('post should create a team', function(done) {
        request
            .post('/api/team')
            .send({
                country: 'Iceland',
                fifa_code: 'ISL',
                group_id: 4,
                group_letter: 'D',
             })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });

    });

    after((done) => {
        mongoose.connection.close(() => {
            console.log('Teardown - mongodb connection closed');
            app.stop()
            console.log('Teardown - app stopped');
            done()
        });
    });
});
