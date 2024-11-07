const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('should response home api with message', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .expect({ message: 'Sak API v1.0.0' })
        .end((err, res) => {
            if (err) return done(err);
            done();
        })
    })
})