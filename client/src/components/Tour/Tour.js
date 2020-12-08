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
        <h3>Search</h3>
        <p>
            Search
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="Post"]',
    content: (
      <div>
        <h3>Post</h3>
        <p>
            Post
        </p>
      </div>
    ),
  },
  {
    selector: '[tourName="TrendingSidebar"]',
    content: (
      <div>
        <h3>Trending</h3>
        <p>
            Trending
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
