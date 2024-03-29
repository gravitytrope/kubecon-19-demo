import React, { Component } from 'react';
import 'c3/c3.css';

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import styles from './styles.module.scss';



class SliderTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callback: this.props.onChange,
      template: this.props.template
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state.callback(this.props.template.replace("[VALUE]", this.props.default))
  }

  handleSubmit(event, value) {
    this.state.callback(this.props.template.replace("[VALUE]", value))
    event.preventDefault();
  }

  render() {
    return (
      <Box height="300px" width="50px" justify="flex-end" alignItems="flex-start">
        <Slider
          orientation="vertical"
          onChangeCommitted={this.handleSubmit}
          defaultValue={this.props.default}
          aria-labelledby="vertical-slider"
        />
      </Box>
    );
  }
}

export default SliderTemplate;
