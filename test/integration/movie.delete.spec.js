const app = require("../../app");
const request = require("supertest");

const Movie = require("../../models/Movie");

const route = '/api/movie';

function deleteRequest(param = '') {
  return request(app).delete(route + '/' + param)
}

describe(`DELETE ${route}`, () => {
  it('should respond with JSON object', () => {
    return deleteRequest('any').expect('Content-Type', /json/);
  });

  describe('request with valid data', () => {
    let id;

    beforeEach((done) => {
      const movie = new Movie({
        title: 'Star Wars',
        year: 1977,
        format: 'DVD',
        actors: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Alec Guinness', 'James Earl Jones']
      });
      return movie.save((err, added) => {
        if (err) {
          return done(err);
        }
        id = added._id;
        setImmediate(done);
      });
    
    });

    it('should respond with 200 status code', () => {
      return deleteRequest(id).expect(200);
    });

    it('should respond with `Movie deleted successfully.` message', () => {
      return deleteRequest(id)
        .expect( {message: "Movie deleted successfully."} );
    });

  });

  describe('request with invalid data', () => {
    
    it('should respond with 404 error status code', () => {
      return deleteRequest('anyNonExistentId').expect(404);
    });

    it('should respond with `Could not find movie.` message', () => {
      return deleteRequest('anyNonExistentId').expect( { message: "Could not find movie."} );
    });
  });
  
});