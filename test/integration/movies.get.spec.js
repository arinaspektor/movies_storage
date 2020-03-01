const app = require("../../app");
const expect = require("chai").expect;
const request = require("supertest");

const Movie = require("../../models/Movie");

const route = '/api/movies';

function getRequest(query = '') {
  return request(app).get(route + query)
}

describe(`GET ${route}`, () => {

  before(async () => {
    const movies = require('../helpers/movies_array');

    await Movie.insertMany(movies);
  });

  it('should respond with JSON object', () => {
    return getRequest().expect('Content-Type', /json/);
  });

  it('should respond with 200 status code', () => {
    return getRequest().expect(200);
  });

  it('should respond with `Movies fetched.` message', () => {
    return getRequest()
      .then(res => {
        expect(res.body.message).to.be.equal('Movies fetched.');
      });
  });

  it('should respond with `movies` array', () => {
    return getRequest()
      .then(res => {
        expect(res.body.movies).to.be.an('array');
      });
  });

  it('should return `movies` array sorted by title in alphabetical order', () => {
      return getRequest()
        .then(res => {
          const { movies } = res.body;

          const checkOrder = movies.every((m, i, arr) => !i || arr[i - 1].title.toLowerCase() <= m.title.toLowerCase());

          expect(checkOrder).to.be.equal(true);
        });
  });


  describe('with query string', () => {
    let query;

    describe('limit', () => {
      it('should respond with 5 objects in movies', () => {
        query = '?' + "limit=5";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.have.length(5);
          });
      });

      it('should respond with 10 objects in movies in case of undefined value', () => {
        query = '?' + "limit";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.have.length(10);
          });
      });

      it('should respond with 10 objects in movies in case of 0 value', () => {
        query = '?' + "limit=0";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.have.length(10);
          });
      });

    })

    describe('offset', () => {
      it('should respond with an empty array', () => {
        query = '?' + "offset=10";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.be.empty;
          });
      });

      it('should respond with 3 objects in movies', () => {
        query = '?' + "offset=7";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.be.length(3);
          });
      });

      it('should respond with 10 objects in movies in case of undefined value', () => {
        query = '?' + "offset";

        return getRequest(query)
          .then(res => {
            expect(res.body.movies).to.be.length(10);
          });
      });

    });

    describe('search queries', () => {
      describe('title', () => {

        it('should respond with array of 2 objects with `Spaceballs` title', () => {
          query = '?' + "title=Spaceballs";
  
          return getRequest(query)
            .then(res => {
              const { movies } = res.body;
  
              expect(movies).to.have.length(2);
  
              movies.forEach(obj => {
                expect(obj.title).to.be.equal("Spaceballs");
              });
            });
        });
  
        it('should respond with an empty array in case of of an empty string value', () => {
          query = '?' + "title=''";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.be.empty;
            });
        });
  
        it('should respond with 10 objects in movies array in case of undefined value', () => {
          query = '?' + "title";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.have.length(10);
            });
        });
  
        it('should respond with an empty array in case of nonexistent value', () => {
          query = '?' + "title='Titanic'";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.be.empty;
            });
        });
  
      });

      describe('name', () => {

        it('should respond with array of 3 movies where `Mel Brooks` is in actors', () => {
          const name = "Mel Brooks";
          query = '?' + `name=${name}`;
          
          let movies;
          return getRequest(query)
            .then(res => {
              movies = res.body.movies;
              const checker = movies.every(m => m.actors.includes(name));
              expect(checker).to.be.true;
            })
        });
  
        it('should respond with an empty array in case of an empty string value', () => {
          query = '?' + "name=''";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.be.empty;
            });
        });
  
        it('should respond with 10 objects in movies array in case of undefined value', () => {
          query = '?' + "name";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.have.length(10);
            });
        });
  
        it('should respond with an empty array in case of nonexistent value', () => {
          query = '?' + "name='Mel Gibson'";
  
          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.be.empty;
            });
        });
  
      });
    });
   

    describe('multiple queries', () => {

      describe('offset=2&limit=3', () => {
        it('should respond with 3 objects starting from `Charade` movie', () => {
          query = '?' + "offset=2&limit=3";

          return getRequest(query)
            .then(res => {
              const { movies } = res.body;

              expect(movies).to.have.length(3);
              expect(movies[0].title).to.be.equal('Charade');
            });
        });
      });
      
      describe('name=Mel Brooks&limit=1&offset=1', () => {
        it('should respond with only `Spaceballs` movie in array', () => {
          query = '?' + "name=Mel Brooks&limit=1&offset=1";

          return getRequest(query)
            .then(res => {
              const { movies } = res.body;

              expect(movies).to.have.length(1);
              expect(movies[0].title).to.be.equal('Spaceballs');
            });
        });
      });

      describe('name=Mel Brooks&title=Casablanca', () => {
        it('should ignore name query and respond with `Casablanca` movies', () => {
          query = '?' + "name=Mel Brooks&title=Casablanca";

          return getRequest(query)
            .then(res => {
              const { movies } = res.body;

              expect(movies).to.have.length(1);
              expect(movies[0].title).to.be.equal('Casablanca');
            });
        });
      });

      describe('title&limit=4', () => {
        it('should ignore title query and respond with 4 movies in array', () => {
          query = '?' + "title&limit=4";

          return getRequest(query)
            .then(res => {
              expect(res.body.movies).to.have.length(4);
            });
        });
      });

    });

  });

  after(async () => {
    await Movie.deleteMany({});
  });
  
});
