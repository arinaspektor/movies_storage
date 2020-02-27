import React, { useState } from 'react';
import M from 'materialize-css';

export const SearchBar = ({ cb }) => {
  const [state, setState] = useState({by: "title", query: ""});

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const clearState = () => {
    setState({by: "title", query: ""});
    document.querySelector('input[name="query"').classList.value = "validate";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    cb(state);
    clearState();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems, {});
  });


  return (
    <div className="row search-container">
      <div className="col s12 m2">
        <select name="by" value={state.by} onChange={handleChange} className="browser-default grey darken-4 white-text">
          <option value="" disabled>Search by</option>
          <option value="title">Movie title</option>
          <option value="name">Actor's name</option>
        </select>
      </div>
      <nav className="col s12 m10 white">
        <div className="nav-wrapper white grey-text text-darken-4">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                id="search"
                type="search"
                placeholder="Search movie..."
                name="query"
                value={state.query}
                onChange={handleChange}
                required 
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}
