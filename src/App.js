import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import WelcomePage from './pages/Welcome';
import RateLimitingPage from './pages/RateLimiting';

const routes = [
  {
    path: '/',
    exact: true,
    component: WelcomePage
  },
  {
    path: '/rate-limiting',
    component: RateLimitingPage
  }
];

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <div className="Body">
          {
            routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            )
          }
        </div>
      </Router>
    </div>
  );
}

export default App;
