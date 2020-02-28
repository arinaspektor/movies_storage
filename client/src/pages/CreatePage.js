import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

import { useRequest } from "../_hooks/fetch";
import { useToast } from '../_hooks/message';

export const CreatePage = () => {
  const toast = useToast();
  const yearNow = new Date().getFullYear();
  const { 
    error,
    clearError,
    loading, 
    request
  } = useRequest();

  const initialState = {
    title: '',
    year: yearNow,
    format: 'DVD',
    actors: []
  }

  const [movie, setMovie] = useState({...initialState});

  useEffect(() => {
    toast(error);
    clearError();
  }, [toast, error, clearError]);

  const handleChange = e => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }


  const onChipAdd = (data) => {
    const chips = data[0].M_Chips.chipsData;
    const chip = chips[chips.length - 1];

    if (!(/^[a-zа-я]+(\s[a-zа-я]+){1,}$/i).test(chip.tag.trim())) {
      const instance = M.Chips.getInstance(data[0]);
      instance.deleteChip(chips.length - 1);
    }
  }

  const deleteAllChips = () => {
    const chips = document.querySelector(".chips");
    const instance = M.Chips.getInstance(chips);
    for(let i = instance.chipsData.length - 1; i >= 0; i--) {
      instance.deleteChip(i);
    }
  }

  const showChipsError = () => {
    const helper = document.querySelector('.chips-helper')
    helper.innerText = "Add some actors";
    helper.classList.add('red-text');
    setTimeout(() => {
      helper.innerText = "Add fullname of actor and press enter";
      helper.classList.remove('red-text');
    }, 3000);
  }

  const getActorsFromChips = () => {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(c => movie.actors.push(c.innerText.trim()));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    getActorsFromChips();
    if (!movie.actors.length) {
      showChipsError();
      return ;
    }

    try {
      const body = JSON.stringify({...movie});
      const headers = {'Content-Type': 'application/json'};
      const res = await request('/api/movie', 'POST', body, headers);

      toast(res.message, true);
      setMovie({...initialState});
      deleteAllChips();
    } catch(err) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems, {});
    const chipsElems = document.querySelectorAll('.chips');
    M.Chips.init(chipsElems, {placeholder: "Actors", secondaryPlaceholder: "Fullname", onChipAdd});
  });



  return (
    <div className="row">
      <div className="col s2"></div>
      <div className="col s8">
        <form action="#" onSubmit={handleSubmit}>
          <h5>New Movie</h5>
          <div className="row">
            <div className="col s12">
              <div className="input-field">
                <input
                  className="validate" 
                  id="title"
                  type="text"
                  name="title"
                  value={movie.title}
                  onChange={handleChange}
                  required
                  />
                <label htmlFor="title">Title</label>
                <span className="helper-text" data-error="Title field can't be empty"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                type="number"
                name="year"
                min="1896"
                max={yearNow} 
                value={movie.year}
                onChange={handleChange}
                required
              />
              <label>Release Year</label>
            </div>
            <div className="input-field col s6">
              <select name="format" onChange={handleChange} value={movie.format}>
                <option value="VHS">VHS</option>
                <option value="DVD">DVD</option>
                <option value="Blu-Ray">Blu-Ray</option>
              </select>
              <label>Format</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="chips"></div>
              <span className="helper-text chips-helper">Add fullname of actor and press enter</span>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn red lighten-1 right" disabled={loading}>Send</button>
            </div>
          </div>
          </form>
        </div>
      <div className="col s2"></div>
    </div>
  );
}