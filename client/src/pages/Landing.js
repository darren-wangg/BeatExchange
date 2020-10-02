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
  MDBContainer
} from "mdbreact";

const styles = theme => ({
  body: {
    backgroundColor: "#fafafa"
  },
  content: {
    maxWidth: "90%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%"
    }
  }
});

export class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <MDBContainer className={classes.content}>
          <MDBCarousel
            interval={3000}
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={false}
            className="z-depth-1"
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
        </MDBContainer>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
