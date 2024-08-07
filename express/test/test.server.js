const assert = require('assert');
const request = require('supertest');
const { server } = require('../server');

describe('Server Tests', function() {
  it('should return status 200 for GET /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  // Add more test cases as per your application's logic
});
