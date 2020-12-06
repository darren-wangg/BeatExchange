import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol } from "mdbreact";
import { Tooltip, Typography } from "@material-ui/core";

const styles = (theme) => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "15px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  profileImg: {
    width: "275px",
    height: "auto",
    borderRadius: "3px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
    },
  },
  name: {
    marginTop: "25px",
  },
  profileBtn: {
    background: "#1edd88",
    color: "white",
    marginTop: "50%",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#1bcb7f",
    },
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#fff" },
    secondary: { main: "#fafafa" },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#000" },
    secondary: { main: "#CCCCCC" },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `"Rubik", "Helvetica", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subtitle1: {
      margin: "15px auto",
      fontSize: "18px",
    },
  },
});

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, user } = this.props;
    return (
      <MuiThemeProvider theme={lightTheme}>
        <MDBCol className={classes.container}>
          <Tooltip
            placement="bottom"
            title={<p className={classes.tooltip}>Your Spotify account</p>}
          >
            <h2>
              <u>Profile</u>
            </h2>
          </Tooltip>
          {user.username ? (
            <div>
              <a href={user.url} target="_blank">
                <Tooltip
                  placement="bottom"
                  title={
                    <p className={classes.tooltip}>
                      See your full Spotify account info
                    </p>
                  }
                >
                  <img
                    className={classes.profileImg}
                    src={user.profile}
                    alt="Profile"
                  />
                </Tooltip>
              </a>
              <Typography variant="h5" color="primary" className={classes.name}>
                {user.username}
              </Typography>
              <br />
              <Typography variant="subtitle1" color="primary">
                Followers: {user.followers}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Country: {user.country}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Type: {user.type}
              </Typography>
              <Tooltip
                placement="bottom"
                title={
                  <p className={classes.tooltip}>
                    Your unique Spotify ID number
                  </p>
                }
              >
                <Typography variant="subtitle1" color="primary">
                  ID: {user.id}
                </Typography>
              </Tooltip>
            </div>
          ) : (
            <h3>Please sign in...</h3>
          )}
        </MDBCol>
      </MuiThemeProvider>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
