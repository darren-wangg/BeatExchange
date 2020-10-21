import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    paddingTop: "15px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%"
  },
  profileImg: {
    width: "275px",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "200px"
    }
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: props.spotifyApi,
      profile: "",
      username: "",
      followers: 0,
      link: ""
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    const { classes } = this.props;
    const cols = [];
    this.state.spotifyApi
      .getMe()
      .then(data => {
        console.log("USER:" + JSON.stringify(data, null, 2));
        this.setState({
          profile: data.images[0].url,
          username: data.display_name,
          followers: data.followers.total,
          link: data.external_urls.spotify
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h2>
          <u>Profile</u>
        </h2>
        <a href={this.state.link} target="_blank">
          <img
            className={classes.profileImg}
            src={this.state.profile}
            alt="Profile image"
          />
        </a>
        <h3>{this.state.username}</h3>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
