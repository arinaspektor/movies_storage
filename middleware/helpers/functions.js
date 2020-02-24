function setProperty(prop, value, obj) {
  switch (prop.trim()) {
    case "Title":
      obj.title = value;
      break ;
    case "Release Year":
      obj.year = parseInt(value);
      break ;
    case "Format":
      obj.format = value;
      break ;
    case "Stars":
      obj.actors = value.split(', ');
      break ;
    default:
      break ;
  }
}

module.exports = {
  getMoviesFromBuffer: (buffer) => {
    const keys = ['title', 'year', 'format', 'actors'];
    const str = buffer.toString('utf8').replace(/((\r\n)|\r)/g, "\n");
    
    const movies = [];

    const data = str.split("\n\n");
    data.map(info => {
      const elem = info.split("\n");
    
      if (elem.length < 4) {
        return ;
      }

      const newMovie = {};

      elem.forEach(el => {
        const keyValue = el.split(": ");
        setProperty(keyValue[0], keyValue[1], newMovie);
      });
    
      const hasAllKeys = keys.every(key => newMovie.hasOwnProperty(key));
      if (hasAllKeys) {
        movies.push(newMovie);
      }
      
    });

    return movies;
  }
}