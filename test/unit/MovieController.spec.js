const expect = require("chai").expect;
// const sinon = require('sinon');

const MovieController = require("../../controllers/movie");
const Movie = require("../../models/Movie");

describe('Movie Controller', () => {

  describe('#addOne()', (done) => {
   
  });

  describe('addMany', () => {

  });

  describe('#deleteMovie()', () => {
    
  });

  after(async () => {
    await Movie.deleteMany({});
  });
});