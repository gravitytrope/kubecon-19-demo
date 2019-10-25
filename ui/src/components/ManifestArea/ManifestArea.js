import React, { Component } from 'react';

import 'c3/c3.css';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import styles from './styles.module.scss';

// the URL where the backend will be listening for POSTs
// the body posted will be used for running `kubectl apply`
// ie, 'http://127.0.0.1:5000'
const baseURL = process.env.REACT_APP_BACKEND_URL_BASE;

class ManifestArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.manifest,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var fullURL = baseURL + '/kubectl/'

    alert('The manifest has been submitted to ' + fullURL);

    // POST to the backend the manifest
    fetch(fullURL, {
      method: 'POST',
      body: this.props.manifest // maybe we need to use JSON.stringify()
    })

    event.preventDefault();
  }

  render() {
    const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    }));

    const inputProps = {
      fontFamily: "monospace,courier",
      step: 300,
    };

    return (
        <form onSubmit={this.handleSubmit}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end">
              <TextField
                id="outlined-multiline-static"
                label="Manifest"
                multiline
                rows="25"
                fullWidth="true"
                defaultValue="Default Value"
                className={useStyles.textField}
                inputProps={inputProps}
                value={this.props.manifest}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            <button className={styles.Button}>Apply</button>
          </Grid>
        </form>
    );
  }
}

export default ManifestArea;
