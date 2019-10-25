import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import AnalyticsTracker from './components/AnalyticsTracker';

import RateLimitingActionPage from './pages/RateLimitingAction';
import AuthenticationPage from './pages/Authentication';
import DevPortalPage from './pages/DevPortal';
import SelfServicePage from './pages/SelfService';

const routes = [
  {
    title: 'Rate Limiting',
    path: '/',
    exact: true,
    component: RateLimitingActionPage
  },
  {
    title: 'Authentication',
    path: '/authentication',
    component: AuthenticationPage
  },
  {
    title: 'Dev Portal',
    path: '/dev-portal',
    component: DevPortalPage
  }
];

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar links={routes} />
        <div className="Body">
          {
            routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={AnalyticsTracker(route.component)}
              />
            )
          }
        </div>
      </Router>
    </div>
  );
}

export default App;
