import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

import WelcomePage from './pages/Welcome';
import DeclarativeConfigurationPage from './pages/DeclarativeConfiguration';
import MultiPlatformPage from './pages/MultiPlatform';
import DiagnosticsPage from './pages/Diagnostics';
import SingleSignOnPage from './pages/SingleSignOn';
import RateLimitingPage from './pages/RateLimiting';
import AmbassadorProPage from './pages/AmbassadorPro';
import GitHubPage from './pages/GitHub';
import RateLimitingActionPage from './pages/RateLimitingAction';
import NextStepsPage from './pages/NextSteps';
import ServicePreviewPage from './pages/ServicePreview';

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
    title: 'Diagnostics and Monitoring',
    path: '/diagnostics-and-monitoring',
    component: DiagnosticsPage
  },
  {
    title: 'Single Sign-On',
    path: '/single-sign-on',
    component: SingleSignOnPage
  },
  {
    title: 'Rate Limiting',
    path: '/rate-limiting',
    component: RateLimitingPage
  },
  {
    title: 'Ambassador Pro',
    path: '/ambassador-pro',
    component: AmbassadorProPage
  },
  {
    title: 'GitHub Single Sign-On',
    path: '/github-sso',
    component: GitHubPage
  },
  {
    title: 'Rate Limiting in Action',
    path: '/rate-limit-in-action',
    component: RateLimitingActionPage
  },
  {
    title: 'Service Preview',
    path: '/service-preview',
    component: ServicePreviewPage
  },
  {
    title: 'Next Steps',
    path: '/next-steps',
    component: NextStepsPage
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
        <BottomNav routes={routes} />
      </Router>
    </div>
  );
}

export default App;
