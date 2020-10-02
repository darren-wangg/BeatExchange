import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    paddingTop: "15px",
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    height: "100%"
  }
});

export class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h2>Profile</h2>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
