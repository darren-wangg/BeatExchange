import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formGroup: {
    position: "absolute",
    bottom: "0",
    left: "0",
    margin: "auto",
    width: "100%",
    display: "block"
  },
  postBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "7px 17px 7px 17px",
    border: "none",
    borderRadius: "5px",
    position: "absolute",
    bottom: "10%",
    right: "2%"
  }
});

export class TextBox extends Component {
  render() {
    const { classes, chosen } = this.props;
    console.log("TEXT BOX DATA: ", chosen);
    return (
      <div>
        <div className={`${classes.formGroup} blue-border-focus`}>
          <textarea
            className="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="3"
          ></textarea>
          <button className={classes.postBtn}>Post</button>
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
  classes: PropTypes.object.isRequired,
  chosen: PropTypes.object
};

export default withStyles(styles)(TextBox);
