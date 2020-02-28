import React from 'react';

import { useRequest } from "../_hooks/fetch";

export const Movie = (props) => {
  const {m, onDelete } = props;
  const { request } = useRequest();

  const deleteMovie = async () => {
    await request('/api/movie/' + m._id, 'DELETE');
    onDelete();
  }

  return (
    <li>
      <div className="collapsible-header black-text">{m.title}</div>
      <div className="collapsible-body">
        <p><span className="black-text">Release year: </span>{m.year}</p>
        <p><span className="black-text">Format: </span>{m.format}</p>
        <p><span className="black-text">Actors: </span>
          { m.actors.map((a, i, arr) => {
            return i < arr.length - 1 ? a + ', ' : a;
          })}
        </p>
        <div className="section delete">
          <button className="right btn-flat" onClick={deleteMovie}><i className="material-icons red-text text-lighten-1">delete_forever</i></button>
        </div>
      </div>
  </li>
  );
}