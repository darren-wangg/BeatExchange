import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBCol, MDBRow } from "mdbreact";
import { CircularProgress } from "@material-ui/core";
import Post from "../Post/Post";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroller";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const MAX_POSTS = 100;

const styles = (theme) => ({
  container: {
    margin: "auto",
    top: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginBottom: "25px",
    textAlign: "center",
  },
  wall: {
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    height: "130vh",
    overflowX: "hidden",
    overflowY: "scroll",
    [theme.breakpoints.down("md")]: {
      height: "175vh",
    },
    [theme.breakpoints.down("lg")]: {
      height: "200vh",
    }
  },
});

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPosts();
    // refresh feed every 5 minutes
    this.interval = setInterval(this.fetchPosts, 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchPosts = () => {
    axios.get("/api/posts").then((res) => {
      // loop through each post in mongo, pass in entire post, create a Post component
      if (res.status === 200) {
        this.setState(
          {
            data: res.data.slice(0, MAX_POSTS),
          },
          () => this.createPosts()
        );
      } else {
        console.error("Failed to load from Mongo" + res.statusText);
      }
    });
  };

  createPosts = () => {
    const items = [];
    this.state.data.forEach((post) => {
      items.push(<Post key={post.id} data={post} user={this.props.user} />);
    });
    this.setState({
      loading: false,
      posts: items,
    });
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <MDBCol className={classes.container}>
          <CircularProgress
            size={150}
            style={{ margin: "10% auto auto auto", color: "#1edd88" }}
          />
        </MDBCol>
      );
    }

    if (!this.state.loading && !this.state.data) {
      return (
        <MDBCol>
          <MDBRow className={classes.container}>
            <SentimentVeryDissatisfiedIcon
              style={{ margin: "auto", width: "10%", height: "auto" }}
            />
          </MDBRow>
          <MDBRow className={classes.container}>
            <h3>
              Sorry, we were not able to load any posts. Please try again later.
            </h3>
          </MDBRow>
        </MDBCol>
      );
    }

    return <MDBCol className={classes.wall}>{this.state.posts}</MDBCol>;
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);
