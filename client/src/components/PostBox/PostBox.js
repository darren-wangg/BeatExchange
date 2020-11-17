import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

const styles = theme => ({
  container: {
    maxHeight: "500px",
    margin: "auto",
    width: "100%",
    display: "block",
    fontFamily: "Rubik"
  },
  close: {
    width: "30px",
    height: "auto",
    cursor: "pointer"
  },
  songContainer: {
    width: "70%",
    margin: "auto",
    marginBottom: "10px",
    backgroundColor: "#2B2B2C",
    borderRadius: "5px",
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
    position: "relative",
    width: "100%"
  },
  textArea: {
    width: "80%",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    borderRadius: "5px"
  },
  postBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    position: "absolute",
    right: "15%",
    bottom: "15%"
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
    secondary: { main: "#CCCCCC" },
    textPrimary: { main: "#000000" }
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
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      message: "",
      currTime: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
  }

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

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  };

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  submitPost = e => {
    e.preventDefault();
    // axios({
    //   url: '/api/posts',
    //   method: 'POST',
    //   data: payload
    // })
    //   .then(() => {

    //   })
    //   .catch(() => {

    //   });
  };

  render() {
    const { classes, chosen } = this.props;
    if (!chosen) {
      return <div />;
    }

    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={lightTheme}>
          {this.state.active ? (
            <div>
              <Grid
                container
                direction="row"
                spacing={8}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={2} md={2}>
                  <CancelIcon
                    className={classes.close}
                    onClick={() => this.deleteChosen()}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Grid
                    container
                    direction="row"
                    spacing={8}
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
                      <Typography variant="body1" color="secondary">
                        {chosen.artists[0].name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Typography variant="subtitle1" color="primary">
                        {chosen.album.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      {chosen.type == "track" ? (
                        <Typography variant="body1" color="secondary">
                          {this.millisToMinutesAndSeconds(chosen.duration_ms)}
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="secondary">
                          {chosen.release_date}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Typography variant="body1" color="textPrimary">
                    {this.state.currTime}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div style={{ display: "none" }} />
          )}
          <form className={classes.formGroup} onSubmit={this.submitPost}>
            <textarea
              className={classes.textArea}
              id="exampleFormControlTextarea2"
              rows="3"
              type="text"
              maxLength="200"
              name="message"
              value={this.state.message}
              onChange={this.handleInputChange}
            ></textarea>
            <button className={classes.postBtn}>Post</button>
          </form>
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
