import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Typography, Tooltip } from "@material-ui/core";

import Profile from "../components/Profile/Profile";
import PostBox from "../components/PostBox/PostBox";
import Trending from "../components/Trending/Trending";
import Fade from "react-reveal/Fade";

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
    paddingTop: "15px"
  },
  form: {
    margin: "auto 10px",
    height: "42px",
    backgroundColor: "#FAFAFA",
    [theme.breakpoints.down("md")]: {
      width: "310px !important"
    }
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
    marginTop: "25px"
  },
  searchResults: {
    backgroundColor: "#FAFAFA",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    display: "block",
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  searchCol: {
    margin: "auto",
    textAlign: "center",
    display: "inline-block",
    float: "none"
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
    h6: {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "18px"
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

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.song.length > 0) {
      this.props.spotifyApi
        .searchTracks(this.state.song, { limit: TOTAL_RESULTS })
        .then(data => {
          this.setState({
            data: data
          });
          this.searchSongs();
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

  searchSongs = () => {
    const { classes } = this.props;
    const cols = [];
    if (this.state.data) {
      this.state.data.tracks.items.forEach(song =>
        cols.push(
          <MDBCol
            key={song.id}
            sm="4"
            md="3"
            lg="2"
            className={classes.searchCol}
            onClick={() => {
              this.setSearchResult(song);
            }}
          >
            <a>
              <img
                className={classes.searchImg}
                src={song.album.images[0].url}
                alt="Album Art"
              />
            </a>
            <Typography variant="h6">
              <strong>{song.name}</strong>
            </Typography>
            <Typography variant="subtitle1">{song.artists[0].name}</Typography>
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
                <div className={classes.search}>
                  <MDBFormInline
                    className="md-form"
                    onSubmit={this.handleSubmit}
                  >
                    <MDBIcon icon="search" />
                    <input
                      className={`form-control form-control-sm ml-3 w-75 ${classes.form}`}
                      type="text"
                      placeholder="What do you want to share with the world?"
                      aria-label="Search"
                      onChange={this.handleInputChange}
                    />
                    <button className={classes.searchBtn}>Search</button>
                  </MDBFormInline>
                </div>
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
