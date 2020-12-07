import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  nav: {
    fontFamily: "Rubik",
    height: "65px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2b2b2c",
    fontSize: "1rem"
  },
  logoContainer: {
    marginLeft: "10%"
  },
  logo: {
    color: "white",
    "&:hover": {
      color: "#1e87f0"
    }
  },
  navbar: {
    marginRight: "10%"
  },
  home: {
    color: "white",
    padding: "10px 25px 0px 0px",
    "&:hover": {
      textDecoration: "none",
      color: "#1e87f0"
    }
  },
  loginBtn: {
    background: "#1edd88",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#1bcb7f",
      color: "#1e87f0"
    }
  }
});

export class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.nav}>
        <div className={classes.logoContainer}>
          <Link to="/">
            <i
              className={`fas fa-compact-disc fa-2x ${classes.logo}`}
            ></i>
          </Link>
        </div>
        <div className={classes.navbar}>
          <Link className={classes.home} to="/home">
            Home
          </Link>
          <a href="http://localhost:8888">
            <button className={classes.loginBtn}>Log In</button>
          </a>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
