const assert = require('assert');
const request = require('supertest');
const { server } = require('../server');

describe('Server Tests', function() {
  this.timeout(10000); // Setting the timeout for all tests

  after(function(done) {
    server.close(done); // Close the server after tests are done
  });

  it('should return status 200 for GET /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  // Add more test cases
});
