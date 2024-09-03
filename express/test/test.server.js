const assert = require('assert');
const request = require('supertest');
const { server } = require('../server'); // Import your server

describe('Server Tests', function() {
  let serverInstance;

  before(function(done) {
    // Start the server before running tests
    serverInstance = server.listen(3000, done);
  });

  after(function(done) {
    // Close the server after tests are done
    serverInstance.close(done);
  });

  it('should return status 200 for GET /', function(done) {
    request(serverInstance)
      .get('/')
      .expect(200, done);
  });

  // Add more test cases
});
