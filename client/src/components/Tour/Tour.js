import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  Tour: {
    fontFamily: '"Rubik", sans-serif',
    borderRadius: "5px !important",
  },
});

class Tour extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: true,
    };
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <Tour
        steps={steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour}
        className={classes.Tour}
        accentColor="#1edd88"
      />
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

Tour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tour);
