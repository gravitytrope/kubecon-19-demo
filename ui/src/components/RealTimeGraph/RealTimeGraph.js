import React, { Component } from 'react';
import RTChart from 'react-rt-chart';
import 'c3/c3.css';

import styles from './styles.module.scss';

class RealTimeGraph extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      paused: true,
    };
  }

  componentDidMount() {
    this.poller = setInterval(() => this.makeRequests(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.poller);
  }

  toggle = () => {
    this.setState({ paused: !this.state.paused })
  };

  makeRequests() {
    if(this.state.paused) {
      return;
    }

    const requests = [...Array(100)];

    Promise.all(requests.map(() =>
      fetch('/backend')
        .then(response => Promise.resolve(this.parseResponseStatusCode(response.status)))
        .catch(() => Promise.resolve(400))
    )).then((statuses) => {
      // group and count statuses
      const statusGroups = statuses.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {}); // eslint-disable-line

      const data = {
        date: new Date(),
        '2xx': statusGroups['2xx'] || 0,
        '3xx': statusGroups['3xx'] || 0,
        '4xx': statusGroups['4xx'] || 0,
        '5xx': statusGroups['5xx'] || 0
      };

      this.setState({ data });
    })
  }

  parseResponseStatusCode(status) {
    // 2xx
    if (status < 300) {
      return '2xx';
    }

    // 2xx
    if (status >= 300 && status < 400) {
      return '3xx';
    }

    // 4xx
    if(status >= 400 && status < 500) {
      return '4xx';
    }

    // 5xx
    if(status >= 500) {
      return '5xx';
    }
  }

  render() {
    const { data, paused } = this.state;

    const options = {
      color: {
        pattern: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336']
      }
    };

    return (
      <React.Fragment>
        <RTChart
          chart={options}
          maxValues={10}
          fields={['2xx', '3xx', '4xx', '5xx']}
          data={data}
        />
        <button
          className={styles.Button}
          onClick={this.toggle}
        >
          {paused ? 'Start' : 'Stop'} Requests
        </button>
      </React.Fragment>

    );
  }
}

export default RealTimeGraph;
