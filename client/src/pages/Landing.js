import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import first from "../assets/images/first.jpg";
import second from "../assets/images/second.jpg";
import third from "../assets/images/third.jpg";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBCarouselCaption
} from "mdbreact";
import Fade from "react-reveal/Fade";

const styles = (theme) => ({
  container: {
    backgroundColor: "#DEDEDE",
    width: "100%",
    margin: "auto",
    position: "relative"
  },
  header: {
    position: "absolute",
    zIndex: "99999",
    color: "#2B2B2C",
    fontWeight: "500",
    top: "30%",

    display: "none"
  },
  desc: {
    fontSize: "1.5rem",
    fontFamily: "Rubik",
    color: "#2B2B2C",

    display: "none"
  },
  carousel: {
    width: "100%",
    height: "800px",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      height: "700px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "600px",
    }
  },
  image: {
    opacity: "0.7"
  }
});

export class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fade>
        <div className={classes.container}>
          <h1 className={classes.header}>Beat Exchange</h1>
          <MDBCarousel
            interval={4000}
            activeItem={1}
            length={3}
            showControls={false}
            showIndicators={true}
            className={`z-depth-1 ${classes.carousel}`}
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView className={classes.carousel}>
                  <img
                    className={`d-block w-100 ${classes.image}`}
                    src={first}
                    alt="First slide"
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <p className={classes.desc}>share and discover music with the world</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView className={classes.carousel}>
                  <img
                    className={`d-block w-100 ${classes.image}`}
                    src={second}
                    alt="Second slide"
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <p className={classes.desc}>share and discover music with the world</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView className={classes.carousel}>
                  <img
                    className={`d-block w-100 ${classes.image}`}
                    src={third}
                    alt="Third slide"
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <p className={classes.desc}>share and discover music with the world</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </div>
      </Fade>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
