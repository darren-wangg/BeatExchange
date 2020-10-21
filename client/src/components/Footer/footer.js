import React, { Component } from "react";
import "./footer.css";

const GITHUB = "https://github.com/darren-wangg";
const INSTA = "https://instagram.com";
const FACEBOOK = "https://www.facebook.com/darrenwangg";
const TWITTER = "https://www.twitter.com/darren_yupio";
const LINKEDIN = "https://www.linkedin.com/in/darrenwangg/";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <a href={GITHUB}>
            <i className="fab fa-github"></i>
          </a>
          <a href={INSTA}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href={FACEBOOK}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href={TWITTER}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href={LINKEDIN}>
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
