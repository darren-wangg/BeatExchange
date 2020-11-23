import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBCol } from "mdbreact";
import { Tooltip } from "@material-ui/core";

const styles = theme => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "15px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  profileImg: {
    width: "275px",
    height: "auto",
    borderRadius: "3px",
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
  },
  tooltip: {
    fontSize: "0.8rem",
    margin: "10px auto"
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, user } = this.props;
    return (
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
            <a href={user.link} target="_blank">
              <img
                className={classes.profileImg}
                src={user.profile}
                alt="Profile"
              />
            </a>
            <h3 className={classes.name}>{user.username}</h3>
            <p>Followers: {user.followers}</p>
            <p>Country: {user.country}</p>
            <p>Type: {user.type}</p>
            <p>ID: {user.id}</p>
            <Tooltip
              placement="bottom"
              title={<p className={classes.tooltip}>See your full Spotify account information</p>}
            >
              <a href={user.link} target="_blank">
                <button className={classes.profileBtn}>Full Profile</button>
              </a>
            </Tooltip>
          </div>
        ) : (
          <h3>Please sign in...</h3>
        )}
      </MDBCol>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
