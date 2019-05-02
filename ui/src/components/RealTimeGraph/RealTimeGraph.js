import React, { Component } from 'react';
import RTChart from 'react-rt-chart';

// import classnames from 'classnames';
//
// import styles from './styles.module.scss';

import 'c3/c3.css';

class RealTimeGraph extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    setInterval(() => this.getNewData(), 1000);
  }

  getNewData = () => {
    var data = {
      date: new Date(),
      '2xx': Math.floor(Math.random() * 20),
      '4xx': Math.floor(Math.random() * 20),
      '5xx': Math.floor(Math.random() * 20)
    };

    this.setState({
      data: data
    });
  }

  render() {
    const { data } = this.state;

    return (
      <RTChart
        maxValues={10}
        fields={['2xx', '4xx', '5xx']}
        data={data}
      />
    );
  }
}

export default RealTimeGraph;
