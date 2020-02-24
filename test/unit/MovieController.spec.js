const expect = require("chai").expect;
const sinon = require("sinon");

const MovieController = require("../../controllers/movie");
const Movie = require("../../models/Movie");

describe('Movie Controller', () => {
  const req = {
    params: {},
    body: {}
  }

  const res = {
    status: () => {},
    json: () => {}
  }
  let id;

  describe('#addOne()', () => {
    it('should add movie to database', async () => {
      const movie = {
        title: 'Star Wars',
        year: 1977,
        format: 'DVD',
        actors: ['Harrison Ford', 'Mark Hamill']
      };
      req.body = movie;
  
      await MovieController.addOne(req, res, () => {});
      const result = await Movie.find({}, '-__v');

      expect(result).to.have.length(1);
      id = result[0].id;
      const toCompare = result[0]._doc;
      delete toCompare._id;
      expect(Object.entries(toCompare)).to.have.deep.members(Object.entries(movie));
    });
 
  });

  describe('#deleteMovie()', () => {
    it('should delete movie from database by id', async () => {
      req.params.movieId = id;

      await MovieController.deleteMovie(req, res, () => {});
      const result = await Movie.findById(id);
      expect(result).to.be.a('null');
    });
  });

  describe('#addMany()', () => {
    it('should add all movies in array to database at once', async () => {
      const spy = sinon.spy(Movie, 'insertMany');
      const movies = require('../helpers/movies_array');
      req.body.movies = movies;

      await MovieController.addMany(req, res, () => {});
      const result = await Movie.find({});
      expect(result).to.have.length(movies.length);
      spy.restore();
      sinon.assert.calledOnce(spy)
    });

    it('should not interact with database if no movies are provided', async () => {
      delete req.body.movies;

      const spy = sinon.spy(Movie, 'insertMany');

      await MovieController.addMany(req, res, () => {});
    
      spy.restore();
      sinon.assert.notCalled(spy)
    });
      
  });

  after(async () => {
    await Movie.deleteMany({});
  });
});