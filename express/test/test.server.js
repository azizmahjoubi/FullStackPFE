const assert = require('assert');
const request = require('supertest');
const { app, server } = require('../server'); // Ensure `server` is exported from `server.js`

describe('Server Tests', function() {
  let serverInstance;

  // Before all tests
  before(function(done) {
    serverInstance = app.listen(3001, () => {
      console.log('Server is running on port 3001.');
      done();
    });
  });

  // After all tests
  after(function(done) {
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('Server is closed.');
        done();
      });
    } else {
      done();
    }
  });

  it('should return status 200 for GET /', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  // Add more test cases
});
