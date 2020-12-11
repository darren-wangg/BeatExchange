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

Tour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tour);