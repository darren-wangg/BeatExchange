import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  container: {
    maxHeight: "500px",
    position: "absolute",
    bottom: "0",
    left: "0",
    margin: "auto",
    width: "100%",
    display: "block",
    fontFamily: "Rubik"
  },
  songContainer: {
    width: "70%",
    margin: "auto",
    marginBottom: "10px",
    backgroundColor: "#2B2B2C",
    borderRadius: "3px",
    boxShadow: "0 12px 10px -10px #000",
    "&:hover": {
      transform: "scale(1.01)"
    },
    [theme.breakpoints.down("md")]: {
      width: "90%"
    }
  },
  songImg: {
    display: "flex",
    margin: "auto",
    width: "75px",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "50px"
    }
  },
  formGroup: {
    width: "100%"
  },
  postBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "7px 17px 7px 17px",
    border: "none",
    borderRadius: "5px",
    position: "absolute",
    bottom: "10%",
    right: "2%"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#fff" },
    secondary: { main: "#CCCCCC" }
  },
  typography: {
    subtitle1: {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }
});

export class PostBox extends Component {
  state = {
    active: false,
    currTime: new Date().toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.chosen != nextProps.chosen) {
      this.setState({
        active: true
      });
    }
  }

  deleteChosen() {
    this.setState({
      active: false
    });
  }

  render() {
    const { classes, chosen } = this.props;
    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={lightTheme}>
          {this.state.active ? (
            <div>
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => this.deleteChosen()}
              />
              <Grid
                container
                direction="row"
                spacing={24}
                justify="center"
                alignItems="center"
                className={classes.songContainer}
              >
                <Grid item xs={2} md={2}>
                  <a href={chosen.external_urls.spotify} target="_blank">
                    <img
                      className={classes.songImg}
                      src={chosen.album.images[0].url}
                    />
                  </a>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Typography variant="subtitle1" color="primary">
                    {chosen.name}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Typography variant="subtitle1" color="primary">
                    {chosen.artists[0].name}
                  </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Typography variant="subtitle1" color="primary">
                    {chosen.album.name}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography variant="caption" color="secondary">
                    {this.state.currTime}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div style={{ display: "none" }} />
          )}
          <div className={classes.formGroup}>
            <textarea
              className="form-control rounded-0"
              id="exampleFormControlTextarea2"
              rows="3"
            ></textarea>
            <button className={classes.postBtn}>Post</button>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

PostBox.propTypes = {
  classes: PropTypes.object.isRequired,
  chosen: PropTypes.object
};

export default withStyles(styles)(PostBox);
