const app = require("../../app");
const expect = require("chai").expect;
const request = require("supertest");

const Movie = require("../../models/Movie");

const route = '/api/movie';

function postRequest(body={}) {
  return request(app)
    .post(route)
    .set('Accept', 'application/json')
    .send(body)
}

describe(`POST ${route}`, () => {
  const body = {
    title: 'Star Wars',
    year: 1977,
    format: 'DVD',
    actors: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Alec Guinness', 'James Earl Jones']
  }

  it('should respond with JSON object', () => {
    return postRequest().expect('Content-Type', /json/);
  });

  describe('request with valid data', async () => {
    it('should respond with 201 status code', () => {
      return postRequest(body).expect(201);
    });

    it('should respond with message `Movie added successfully.`', () => {
      return postRequest(body)
        .expect({ message: 'Movie added successfully.'})
    });
  });

  describe('request with invalid data', () => {
    it('should respond with 400 status code', () => {
      return postRequest().expect(400);
    });

    it('should respond with message `Invalid data.`', () => {
      return postRequest()
        .then(res => {
          expect(res.body.message).to.be.equal('Invalid data.');
        });
    });

    it('should return an array in errors property', () => {
      return postRequest()
        .then(res => {
          expect(res.body.errors).to.be.an('array');
        });
    });

    it('should specify error in errors array', () => {
      const body = {
        title: 'Star Wars',
        year: 1977,
        format: 'aaa',
        actors: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Alec Guinness', 'James Earl Jones']
      }

      return postRequest(body)
        .then(res => {
          expect(res.body.errors[0]).to.be.an('object').with.property('param').to.be.equal('format');
        });
    });
  });

  after(async () => {
    await Movie.deleteMany({});
  });

});