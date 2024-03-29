import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol } from "mdbreact";
import { Tooltip, Typography, Button, Fab } from "@material-ui/core";
import Tour from "reactour";

const styles = (theme) => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "25px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    margin: "auto",
    color: "#2b2b2c",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  profileImg: {
    width: "250px",
    height: "auto",
    borderRadius: "3px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
    },
  },
  name: {
    marginTop: "25px",
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
  },
  Tour: {
    fontFamily: '"Rubik", sans-serif',
  },
  tourFab: {
    marginTop: "50px",
    height: "60px",
    width: "175px",
    color: "#2B2B2C",
    backgroundColor: "#FAFAFA",
    border: "1px solid #2B2B2C",
    "&:hover": {
      transform: "scale(1.03)",
      backgroundColor: "#FAFAFA",
    },
  },
  tourBackground: {
    filter: "blur(0px)",
    opacity: "0.8",
  },
  Mask: {
    outline: "none",
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
    primary: { main: "#2b2b2c" },
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
      fontSize: "16px",
    },
  },
});

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTourOpen: false,
    };
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <MuiThemeProvider theme={lightTheme}>
        <MDBCol className={classes.container} tourname="ProfileSidebar">
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
                    src={user.img}
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
                  <p className={classes.tooltip}>Your unique Spotify ID</p>
                }
              >
                <Typography variant="subtitle1" color="primary">
                  ID: {user.id}
                </Typography>
              </Tooltip>

              <Tour
                steps={steps}
                isOpen={this.state.isTourOpen}
                onRequestClose={this.closeTour}
                className={classes.Tour}
                accentColor="#1edd88"
                rounded={8}
                disableInteraction
                maskClassName={classes.tourBackground}
                highlightedMaskClassName={classes.Mask}
                nextButton={
                  <Button
                    size="medium"
                    variant="outlined"
                    style={{ fontWeight: 400 }}
                    small
                  >
                    &#62;
                  </Button>
                }
                prevButton={
                  <Button
                    size="medium"
                    variant="outlined"
                    style={{ fontWeight: 400 }}
                  >
                    &#60;
                  </Button>
                }
                lastStepNextButton={
                  <Button
                    size="medium"
                    variant="outlined"
                    style={{ fontWeight: 400 }}
                  >
                    Done!
                  </Button>
                }
              />
              <Fab
                className={classes.tourFab}
                variant="extended"
                onClick={this.openTour}
              >
                Tutorial
              </Fab>
            </div>
          ) : (
            <h3 className={classes.name}>Please sign in...</h3>
          )}
        </MDBCol>
      </MuiThemeProvider>
    );
  }
}

const steps = [
  {
    selector: '[tourName="ProfileSidebar"]',
    content: (
      <div>
        <h3>
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          My Profile
        </h3>
        <p>
          Your Spotify information. Click on your profile picture to see your
          full Spotify profile!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="Search"]',
    content: (
      <div>
        <h3>
          <span role="img" aria-label="magnifying glass">
            🔍
          </span>{" "}
          Search & Post
        </h3>
        <p>
          Search for any song you want to share, select it, add a message and
          tags (optional), and post. It's that easy!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="Post"]',
    content: (
      <div>
        <h3>
          <span role="img" aria-label="world">
            🌎
          </span>{" "}
          Post
        </h3>
        <p>
          These are posts from the community, each with a user, a song, and a
          message. Like what you see? Give it a heart!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="TrendingSidebar"]',
    content: (
      <div>
        <h3>
          <span role="img" aria-label="chart">
            📈
          </span>{" "}
          Trending
        </h3>
        <p>
          "Me": new releases tailored for you and your favorite songs & artists
          on Spotify.
        </p>
        <p>
          "World": what's trending on the charts today, including artists,
          songs, and general music news.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h3>
          <span role="img" aria-label="clap">
            👏
          </span>{" "}
          That's it!
        </h3>
        <p>
          Start sharing some of your favorite music! The world is waiting...
        </p>
      </div>
    ),
  },
];

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
