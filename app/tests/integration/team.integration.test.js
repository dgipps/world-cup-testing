var app = require('../../server');
var chai = require('chai');
var request = require('supertest');
var mongoose = require('mongoose');

var Team = require('../../models/team.model');

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
                expect(res.body).to.deep.equal({teams: []});
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
        .expect(201)
        .end(function(err, res) {
            if (err) return done(err);
            var query = Team.where({ country: 'Iceland' });
            query.findOne(function(err, team) {
                if (err) return done(err);
                expect(team.fifa_code).to.be.equal('ISL');
                expect(team.group_id).to.be.equal(4);
                expect(team.group_letter).to.be.equal('D');
                done()
            });
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
