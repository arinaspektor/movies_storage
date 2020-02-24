const expect = require("chai").expect;
const path = require("path");
const fs = require("fs");

const { getDataFromFile } = require("../../middleware/fileHandler");

describe('getDataFromFile middleware', () => {
  const req = { 
    body: {},
    file: {
      buffer: ""
    } 
  };

  getDataFromFile(req, null, () => {});

  it('should add `movies` property to the `req.body`', () => {
    expect(req.body).to.have.property('movies');
  });

  it('should set an array to `movies` property', () => {
    expect(req.body.movies).to.be.an('array');
  });

  describe('processing valid file content', () => {
    const data = fs.readFileSync(path.dirname(__dirname) + "/files/valid_sample.txt");
    req.file.buffer = Buffer.from(data);

    getDataFromFile(req, null, () => {});
    const { movies } = req.body;

    it('should put 10 objects in `movies` array', () => {
      expect(movies).to.have.length(10);
    });

    it('should set `title`, `year`, `format` and `actors` properties to every object', () => {
      movies.forEach(movie => {
        expect(movie).to.have.all.keys('title', 'year', 'format', 'actors');
      });
    });
  })

  describe('processing invalid file content', () => {
    const data = fs.readFileSync(path.dirname(__dirname) + "/files/invalid_sample.txt");
    req.file.buffer = Buffer.from(data);
    getDataFromFile(req, null, () => {});

    it('should return an empty array', () => {
      expect(req.body.movies).to.be.an('array').that.is.empty;
    });

  });

});
