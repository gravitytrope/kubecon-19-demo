import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import WelcomePage from './pages/Welcome';
import DeclarativeConfigurationPage from './pages/DeclarativeConfiguration';
import MultiPlatformPage from './pages/MultiPlatform';
import DiagnosticsPage from './pages/Diagnostics';
import SingleSignOnPage from './pages/SingleSignOn';
import RateLimitingPage from './pages/RateLimiting';

const routes = [
  {
    path: '/',
    title: 'Welcome',
    exact: true,
    component: WelcomePage
  },
  {
    title: 'Declarative Configuration',
    path: '/declarative-configuration',
    component: DeclarativeConfigurationPage
  },
  {
    title: 'Multi Platform',
    path: '/multi-platform',
    component: MultiPlatformPage
  },
  {
    title: 'Diagnostics',
    path: '/diagnostics',
    component: DiagnosticsPage
  },
  {
    title: 'Single Sign On',
    path: '/single-sign-on',
    component: SingleSignOnPage
  },
  {
    title: 'Rate Limiting',
    path: '/rate-limiting',
    component: RateLimitingPage
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
