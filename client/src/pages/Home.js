import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Grid, Typography, Tooltip } from "@material-ui/core";

import Profile from "../components/Profile/Profile";
import PostBox from "../components/PostBox/PostBox";
import Trending from "../components/Trending/Trending";
import Fade from "react-reveal/Fade";
import axios from "axios";

const TOTAL_RESULTS = 15;

const styles = theme => ({
  body: {
    fontFamily: "Rubik",
    textAlign: "center",
    width: "100%",
    height: "100vh"
  },
  row: {
    overflow: "hidden"
  },
  search: {
    width: "100%",
    margin: "20px 25px 0px 25px"
  },
  form: {
    margin: "auto 10px",
    height: "50px",
    backgroundColor: "#EDEDED",
    width: "85% !important"
  },
  searchBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      padding: "7px 15px 7px 15px"
    }
  },
  wall: {
    height: "100vh"
  },
  searchImg: {
    width: "125px",
    height: "auto",
    margin: "25px 0px 5px 0px",
    [theme.breakpoints.down("md")]: {
      width: "75px"
    }
  },
  searchResults: {
    width: "95%",
    margin: "auto",
    backgroundColor: "#EDEDED",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    display: "block",
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  searchCol: {
    width: "225px",
    margin: "auto",
    padding: "10px",
    textAlign: "center",
    display: "inline-block",
    float: "none",
    [theme.breakpoints.down("md")]: {
      width: "175px"
    }
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#fff" },
    secondary: { main: "#fafafa" }
  },
  typography: {
    fontFamily: `"Rubik", "Helvetica", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subtitle1: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "14px"
    }
  }
});

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: "",
      data: null,
      search: [],
      chosen: null
    };
  }

  componentDidMount() {
    this.fetchPosts();
    console.log("CHOSEN: " + this.state.chosen);
  }

  fetchPosts() {
    axios.get("/api/posts").then(res => {
      console.log("MONGO DB DATA: " + JSON.stringify(res, null, 2));
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      search: []
    });
    if (this.state.song.length > 0) {
      this.props.spotifyApi
        .searchTracks(this.state.song, { limit: TOTAL_RESULTS })
        .then(data => {
          this.setState({
            data: data
          });
          this.createSongs();
        })
        .catch(error => {
          console.error(error);
        });
    }
    // reset to default
    else {
      this.setState({
        search: []
      });
    }
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      song: e.target.value.trim()
    });
  };

  setSearchResult = song => {
    this.setState({
      chosen: song,
      search: []
    });
  };

  createSongs = () => {
    const { classes } = this.props;
    const cols = [];
    if (this.state.data) {
      this.state.data.tracks.items.forEach(song =>
        cols.push(
          <MDBCol
            className={classes.searchCol}
            key={song.id}
            onClick={() => {
              this.setSearchResult(song);
            }}
          >
            <img
              className={classes.searchImg}
              src={song.album.images[0].url}
              alt="Album Art"
            />
            <Typography variant="subtitle1">
              <strong>{song.name}</strong>
            </Typography>
            <Typography variant="body1">{song.artists[0].name}</Typography>
          </MDBCol>
        )
      );
    }
    this.setState({
      search: cols
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fade effect="fadeInUp">
        <MuiThemeProvider theme={lightTheme}>
          <div className="row">
            <div
              className="col-xs-0 col-sm-0 col-md-3 col-lg-2"
              style={{ padding: "0px" }}
            >
              <Profile spotifyApi={this.props.spotifyApi} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
              <div className={classes.wall}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  className={classes.search}
                >
                  <Grid item xs={0} md={0}>
                    <MDBIcon icon="search" />
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <MDBFormInline
                      className="md-form"
                      onSubmit={this.handleSubmit}
                    >
                      <input
                        className={`form-control form-control-sm ml-3 w-75 ${classes.form}`}
                        type="text"
                        placeholder="What do you want to share with the world?"
                        aria-label="Search"
                        onChange={this.handleInputChange}
                      />
                    </MDBFormInline>
                  </Grid>
                  <Grid item xs={0} md={0}>
                    {!this.state.chosen ? (
                      <button className={classes.searchBtn}>Search</button>
                    ) : (
                      <br />
                    )}
                  </Grid>
                </Grid>
                <MDBRow className={classes.searchResults}>
                  {this.state.search}
                </MDBRow>
                <PostBox chosen={this.state.chosen} />
              </div>
            </div>

            <div
              className="col-xs-0 col-sm-0 col-md-3 col-lg-2"
              style={{ padding: "0px" }}
            >
              <Trending spotifyApi={this.props.spotifyApi} />
            </div>
          </div>
        </MuiThemeProvider>
      </Fade>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
