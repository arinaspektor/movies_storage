import React from 'react';

export const Navbar = () => {
  
  return (
    <nav>
      <div className="row">
        <div className="col s6">
          <a id="search-link" href="/search"><i className="material-icons">search</i></a>
        </div>
        <div className="col s6">
          <a className="logo right" href="/">Movies</a>
        </div>
      </div>
    </nav>
  );
}