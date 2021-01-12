import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol, MDBRow } from "mdbreact";
import {
  CircularProgress,
  Grid,
  Typography,
  Input,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import Post from "../Post/Post";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroller";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const MAX_POSTS = 100;
const allTags = ["all", ...process.env.REACT_APP_ALL_TAGS.split(",")];

const styles = (theme) => ({
  container: {
    margin: "auto",
    top: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    margin: "1px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    boxShadow: "0 15px 20px -20px #2b2b2c",
  },
  tagsForm: {
    margin: "auto",
    minWidth: "100px",
    maxWidth: "100px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    margin: "auto",
    padding: "0px",
    color: "#1D87F0",
  },
  wall: {
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    height: "130vh",
    overflowX: "hidden",
    overflowY: "scroll",
    padding: "0",
    [theme.breakpoints.down("md")]: {
      height: "175vh",
    },
    [theme.breakpoints.down("lg")]: {
      height: "200vh",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#fff" },
    secondary: { main: "#fafafa" },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#fff" },
    secondary: { main: "#CCCCCC" },
    textPrimary: { main: "#2b2b2c" },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `"Rubik", "Helvetica", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subtitle1: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginTop: "5px"
    },
  },
});

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      posts: [],
      tag: "all",
    };
  }

  componentDidMount() {
    this.fetchPosts();
    // refresh feed every 3 minutes
    this.interval = setInterval(this.fetchPosts, 180000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTagChange = (e) => {
    e.preventDefault();
    this.setState(
      {
        tag: e.target.value,
        loading: true,
        data: null,
        posts: [],
      },
      () => this.fetchTags()
    );
  };

  fetchPosts = () => {
    axios.get("/api/posts").then((res) => {
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

  fetchTags = () => {
    if (this.state.tag === "all") {
      this.fetchPosts();
    } else {
      axios.get(`/api/posts/tags/${this.state.tag}`).then((res) => {
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
    }
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
            size={100}
            style={{ margin: "15% auto auto auto", color: "#1edd88" }}
          />
        </MDBCol>
      );
    }

    if (!this.state.loading && !this.state.data) {
      return (
        <MDBCol>
          <MDBRow className={classes.container}>
            <SentimentVeryDissatisfiedIcon
              style={{
                margin: "15% auto 2% auto",
                width: "10%",
                height: "auto",
              }}
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

    return (
      <MuiThemeProvider theme={lightTheme}>
        <Grid
          container
          direction="row"
          spacing={3}
          justify="center"
          alignItems="center"
          className={classes.filterContainer}
        >
          <Grid item xs={7} md={7} />
          <Grid item xs={2} md={2}>
            <MDBRow>
              <Typography variant="subtitle1" color="textPrimary">
                Sort By:
              </Typography>

              <FormControl className={classes.tagsForm}>
                <Select
                  labelId="tags"
                  id="post tags"
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                  input={<Input id="post tags" />}
                  renderValue={() => (
                    <div className={classes.tags}>
                      <MenuItem
                        key={this.state.tag}
                        value={this.state.tag}
                        className={classes.tag}
                      >
                        {this.state.tag}
                      </MenuItem>
                    </div>
                  )}
                >
                  {allTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBRow>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant="subtitle1" color="textPrimary">
              Filter:
            </Typography>
          </Grid>
          <Grid item xs={1} md={1} />
        </Grid>
        <MDBCol className={classes.wall}>{this.state.posts}</MDBCol>
      </MuiThemeProvider>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);
