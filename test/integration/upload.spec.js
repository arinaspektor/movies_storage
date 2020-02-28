const app = require("../../app");
const expect = require("chai").expect;
const request = require("supertest");
const path = require("path");

const Movie = require("../../models/Movie");

const route = '/api/upload';

const validFile = path.dirname(__dirname) + "/files/valid_sample.txt";
const invalidFile = path.dirname(__dirname) + "/files/invalid_sample.txt";
const jsFile = path.dirname(__filename) + "/movie.post.spec.js";
const bigFile = path.dirname(__dirname) + "/files/big.txt";

function postFile(file) {
  return request(app)
    .post(route)
    .field('name', 'file')
    .attach('file', file);
}

describe(`POST ${route}`, () => {
  it('should respond with JSON object', () => {
    return postFile(invalidFile).expect('Content-Type', /json/);
  });

  describe('request with valid file', () => {
    
    beforeEach(async () => {
      await Movie.deleteMany({});
    });

    it('should respond with 201 status code', () => {
      return postFile(validFile).expect(201);
    });

    it('should respond with message `Movies added successfully.`', () => {
      return postFile(validFile)
        .then(res => {
          expect(res.body.message).to.be.equal('Movies added successfully.');
        });
    });

    it('should respond with an array of movies added', () => {
      return postFile(validFile)
        .then(res => {
          expect(res.body.movies).to.be.an('array').to.have.length(10);
        });
    });
  });

  describe('request with invalid file', () => {
  
    it('should respond with 400 status code', () => {
      return postFile(invalidFile).expect(400);
    });
    
    it('should respond with message `Invalid file.`', () => {
      return postFile(invalidFile)
        .expect({ message: 'Invalid file.'});
    });

  });

  describe('request with file which contains only already existing data', () => {
  
    it('should respond with 400 status code', () => {
      return postFile(validFile).expect(400);
    });

    it('should respond with message `Movies added successfully.`', () => {
      return postFile(validFile)
        .then(res => {
          expect(res.body.message).to.be.equal('All movies from the file already exist.');
        });
    })

  });

  describe('empty request', () => {
  
    it('should respond with 400 status code', () => {
      request(app)
        .post(route)
        .expect(400);
    });

    it('should respond with message `Choose some txt file to upload.`', () => {
      request(app)
        .post(route)
        .expect({ message: 'Choose some txt file to upload.'});
    })
    
  });

  describe('request with not txt file', () => {
    it('should respond with 400 status code', () => {
      return postFile(jsFile).expect(400);
    });

    it('should respond with message `Choose some txt file to upload.`', () => {
      return postFile(jsFile)
        .expect({message: 'Choose some txt file to upload.'});
    });
  });

  describe('request with file of greater then 2MB size', () => {
    it('should respond with 400 status code', () => {
      return postFile(bigFile).expect(400);
    });

    it('should respond with message `File too large`', () => {
      return postFile(bigFile)
        .expect({message: 'File too large'});
    });
  });

  after(async () => {
    await Movie.deleteMany({});
  });
});