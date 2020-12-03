import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const GITHUB = "https://github.com/darren-wangg";
const INSTA = "https://instagram.com/darrenwang_";
const FACEBOOK = "https://www.facebook.com/darrenwangg";
const TWITTER = "https://www.twitter.com/darren_yupio";
const LINKEDIN = "https://www.linkedin.com/in/darrenwangg/";

const styles = (theme) => ({
  footer: {
    height: "75px",
    width: "100%",
    backgroundColor: "#2B2B2C",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 100px",
    color: "rgba(0,0,0,0.3)",
    bottom: "0"
  },
  footerLinks: {
    display: "flex",
    alignItems: "center"
  },
  socials: {
    color: "white",
    opacity: "0.5",
    textDecoration: "none",
    fontSize: "24px",
    padding: "0px 10px"
  },
});


export class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.footer}>
        <div className={classes.footerLinks}>
          <a className={classes.socials} href={GITHUB} target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a className={classes.socials} href={INSTA} target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
          <a className={classes.socials} href={FACEBOOK} target="_blank">
            <i className="fab fa-facebook"></i>
          </a>
          <a className={classes.socials} href={TWITTER} target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
          <a className={classes.socials} href={LINKEDIN} target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
