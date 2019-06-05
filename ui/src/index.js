import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';

ReactGA.initialize('UA-57322503-12');

ReactDOM.render(<App />, document.getElementById('root'));
