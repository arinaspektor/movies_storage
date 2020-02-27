import React, { useState, useCallback, useEffect } from 'react';
import M from 'materialize-css';

import { useRequest } from "../_hooks/fetch";
import { Loader } from '../_components/Loader';
import { AddNewButton } from '../_components/AddMovieButton';
import { Movie } from '../_components/Movie';
import { Pagination } from '../_components/Pagination';

export const ListPage = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const perPage = 10;
  const { loading, request } = useRequest();

  const initMaterialize = () => {
    const elemsCollapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elemsCollapsible, {});
    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown, {alignment: 'right'});
  }

  const fetchMovies = useCallback(async (urn=null) => {
    try {
      if (!urn) {
        urn = '/api/movies/?limit=' + perPage;
      }
 
      const fetched = await request(urn);
      setMovies(fetched.movies); 
      setCount(parseInt(fetched.count));
      initMaterialize();
    } catch (err) {}
  }, [request]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const paginate = async (page=current) => {
    let urn = '/api/movies/?limit=' + perPage;
    if (page) {
      urn += ('&offset=' + (perPage * (page - 1)));
    }
    await fetchMovies(urn);
    setCurrent(page);
  }

  const onDelete = async () => {
    const pageToReload = (count - 1) % perPage ? current : current - 1;
    await paginate(pageToReload);
  }

  if (loading) {
    return <Loader />
  }

  if(!movies.length) {
    return (
      <div className="row">
        <div className="col s12">
          <p className="center">No movies yet. Press red button to add one:)</p>
        </div>
        <AddNewButton />
      </div>
    )
  }

  return (
    <>
      <div className="row">
        <div className="col m2"></div>
        <ul className="collapsible col s12 m8">
          { movies.map(m => {
            return <Movie key={m._id} m={m} onDelete={onDelete}/>
          })}
        </ul>
        <div className="col m2"></div>
      </div>
      <AddNewButton />
      <Pagination
        current={current}
        perPage={perPage}
        count={count}
        next={paginate}
      />
    </>
  );

}