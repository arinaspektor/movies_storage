import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';

import { useRoutes } from './routes';
import { Navbar } from './_components/Navbar';

function App() {
  const routes = useRoutes();

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="container">
        { routes }
      </main>
    </Router>
  );
}

export default App;
