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
    color: '#2B2B2C',
    backgroundColor: '#DEDEDE',
    border: "1px solid #2B2B2C",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  tourBackground: {
    filter: "blur(1px)",
    opacity: "0.7",
  },
  Mask: {
    outline: "solid 0px #FAFAFA",
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
        <MDBCol className={classes.container} tourName="ProfileSidebar">
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
                Followers:  {user.followers}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Country:  {user.country}
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

              <Tour
                steps={steps}
                isOpen={this.state.isTourOpen}
                onRequestClose={this.closeTour}
                className={classes.Tour}
                accentColor="#1edd88"
                rounded={10}
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
                    Next
                  </Button>
                }
                prevButton={
                  <Button
                    size="medium"
                    variant="outlined"
                    style={{ fontWeight: 400 }}
                  >
                    Back
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
            <h3>Please sign in...</h3>
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
        <h3>👋 My Profile</h3>
        <p>
            Where you'll find all your relevant Spotify information. Click on your profile picture to see your full profile!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="Search"]',
    content: (
      <div>
        <h3>🔍 Search & Post</h3>
        <p>
          Search for any song you want to share, select it, add a message and some tags (optional), and post. It's that easy!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="Post"]',
    content: (
      <div>
        <h3>🌎 Post</h3>
        <p>
          These are posts from the community, each with a user, a song, and a message. Like what you see? Give it a heart!
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="TrendingSidebar"]',
    content: (
      <div>
        <h3>📈 Trending</h3>
        <p>
          "Me" is where you'll see new releases tailored for you and your favorite songs & artists on Spotify. "World" is what's trending on the charts today, including artists, songs, and general music news.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h3>👏 That's it!</h3>
        <p>
          That's all for now. Start sharing some of your favorite music! The
          world is waiting...
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
