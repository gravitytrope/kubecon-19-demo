import React, { Component } from 'react';
import 'c3/c3.css';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import styles from './styles.module.scss';

const defaultCols = 60;
const defaultRows = 17;

class ManifestArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.manifest,
      cols: (this.props.cols == undefined ? defaultCols : this.props.cols),
      rows: (this.props.rows == undefined ? defaultRows : this.props.rows)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('The manifest has been submitted: ' + this.props.manifest);

    // POST to the backend the manifest
    // fetch('/kubectl/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/x-yaml',
    //     'Content-Type': 'application/x-yaml',
    //   },
    //   body: this.props.manifest // maybe we need to use JSON.stringify()
    // })

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

    return (
      
        <form onSubmit={this.handleSubmit}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end">
              <TextField
                id="outlined-multiline-static"
                label="Manifest"
                multiline
                rows="10"
                fullWidth="true"
                defaultValue="Default Value"
                className={useStyles.textField}
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
