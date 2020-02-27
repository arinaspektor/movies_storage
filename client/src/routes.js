import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ListPage } from './pages/ListPage';
import { SearchPage } from './pages/SearchPage';
import { CreatePage } from './pages/CreatePage';
import { UploadPage } from './pages/UploadPage';

export const useRoutes = () => {
  return(
    <Switch>
      <Route path="/create" exact>
        <CreatePage />
      </Route>
      <Route path="/upload" exact>
        <UploadPage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/">
        <ListPage />
      </Route>
    </Switch>
  );
}