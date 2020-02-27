import React from 'react';

export const Pagination = (props) => {
  const { perPage, current, count, next} = props;
  const total = Math.ceil(count / perPage);

  const start = total > 10 && current > 5
                ? Math.abs(5 - current) > total - 10
                ? total - 10 : Math.abs(5 - current) : 1;

  const end = total < 10 ? total : (start + 10) < total ? start + 10 : total;

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div>
      <ul className="pagination center">
        <li className={current === 1 ? "disabled" : ""}>
          <a onClick={current !== 1 ? () => next(1) : () => {}} href="#!">first</a>
        </li>
        <li className={current === 1 ? "disabled" : ""}>
          <a onClick={current !== 1 ? () => next(current - 1) : () => {}} href="#!"><i className="material-icons">chevron_left</i></a>
        </li>
          { pages.map( i =>{
            return <li key={i} className={i === current ? "active" : ""}><a onClick={() => next(i)} href="#!">{i}</a></li>
          })}
        <li className={current === total ? "disabled" : ""}>
          <a onClick={current !== total ? () => next(current + 1) : () => {}} href="#!"><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={current === total ? "disabled" : ""}>
          <a onClick={current !== total ? () => next(total) : () => {}} href="#!">last</a>
        </li>
      </ul>
    </div>
  );
}