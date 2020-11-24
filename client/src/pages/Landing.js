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
} from "mdbreact";
import Fade from "react-reveal/Fade";

const styles = (theme) => ({
  container: {
    backgroundColor: "#EFEFEF",
    width: "100%",
    margin: "auto",
  },
  carousel: {
    width: "70%",
    margin: "auto",
  },
});

export class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fade>
        <div className={classes.container}>
          <MDBCarousel
            interval={4000}
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={false}
            className={`z-depth-1 ${classes.carousel}`}
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={first}
                    alt="First slide"
                  />
                </MDBView>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={second}
                    alt="Second slide"
                  />
                </MDBView>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={third}
                    alt="Third slide"
                  />
                </MDBView>
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
