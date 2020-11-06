import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBCol } from "mdbreact";

const styles = theme => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "15px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  profileImg: {
    width: "275px",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "200px"
    }
  },
  name: {
    marginTop: "25px"
  },
  profileBtn: {
    background: "#1edd88",
    color: "white",
    marginTop: "50%",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#1bcb7f"
    }
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: props.spotifyApi,
      profile: null,
      link: null,
      username: null,
      country: null,
      followers: 0,
      type: null
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.props.spotifyApi
      .getMe()
      .then(data => {
        this.setState({
          profile: data.images[0].url,
          link: data.external_urls.spotify,
          username: data.display_name,
          country: data.country,
          followers: data.followers.total,
          type: data.product
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <MDBCol className={classes.container}>
        <h2>
          <u>Profile</u>
        </h2>
        {this.state.username ? (
          <div>
            <a href={this.state.link} target="_blank">
              <img
                className={classes.profileImg}
                src={this.state.profile}
                alt="Profile"
              />
            </a>
            <h3 className={classes.name}>{this.state.username}</h3>
            <p>Country: {this.state.country}</p>
            <p>Followers: {this.state.followers}</p>
            <p>Type: {this.state.type}</p>
            <a href={this.state.link} target="_blank">
              <button className={classes.profileBtn}>Full Profile</button>
            </a>
          </div>
        ) : (
          <p>Please sign in...</p>
        )}
      </MDBCol>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
