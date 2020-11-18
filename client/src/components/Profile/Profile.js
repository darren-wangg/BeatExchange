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
        <h2>
          <u>Profile</u>
        </h2>
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
            <p>Country: {user.country}</p>
            <p>Followers: {user.followers}</p>
            <p>Type: {user.type}</p>
            <a href={user.link} target="_blank">
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
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
