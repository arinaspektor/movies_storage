import React from 'react';
import M from 'materialize-css';

export const AddNewButton = () => {

    document.addEventListener('DOMContentLoaded', () => {
      const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elemsDropdown, {alignment: 'right'});
    });

    return (
      <div className="btn-container container">
        <button className='dropdown-trigger btn-large btn-floating red lighten-1' data-target='add-movie'><i className="material-icons">add</i></button>
  
        <ul id='add-movie' className='dropdown-content'>
          <li><a className="red-text text-lighten-3" href="/create">add manually</a></li>
          <li className="divider" tabIndex="-1"></li>
          <li><a className="red-text text-lighten-3" href="/upload">upload file</a></li>
        </ul>
      </div>
    );
}