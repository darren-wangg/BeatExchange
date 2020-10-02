import React, { Component } from "react";
import "./footer.css";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <a href="https://github.com/darren-wangg">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://instagram.com">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/darrenwangg">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/in/darren-wang-073511163/">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
