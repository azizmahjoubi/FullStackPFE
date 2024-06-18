const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('Server Tests', function() {
  it('should return status 200 for GET /', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  // Add more test cases as per your application's logic
});
