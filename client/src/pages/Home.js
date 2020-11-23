import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import Profile from "../components/Profile/Profile";
import Feed from "../components/Feed/Feed";
import PostBox from "../components/PostBox/PostBox";
import Trending from "../components/Trending/Trending";
import Fade from "react-reveal/Fade";
import Tour from "reactour";

const TOTAL_RESULTS = 15;

const styles = (theme) => ({
  body: {
    fontFamily: "Rubik",
    textAlign: "center",
    width: "100%",
    height: "100vh",
  },
  row: {
    overflow: "hidden",
  },
  search: {
    width: "100%",
    margin: "auto",
    padding: "35px",
    backgroundColor: "#FAFAFA",
    borderBottom: "1px solid #E0E0E0",
    boxShadow: "0 10px 15px -15px #2b2b2c",
    zIndex: "99999",
  },
  form: {
    margin: "auto 10px",
    height: "50px",
    backgroundColor: "#EFEFEF",
    width: "85% !important",
    border: "1px solid #E0E0E0",
  },
  searchBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
  },
  searchImg: {
    width: "125px",
    height: "auto",
    margin: "20px 0px 5px 0px",
    cursor: "pointer",
    borderRadius: "3px",
    boxShadow: "0 8px 6px -6px #2B2B2C",
    "&:hover": {
      transform: "scale(1.03)",
    },
    [theme.breakpoints.down("md")]: {
      width: "75px",
    },
  },
  close: {
    width: "25px",
    height: "auto",
    cursor: "pointer",
    position: "absolute",
    margin: "5px",
    zIndex: "99999",
  },
  searchResults: {
    width: "100%",
    margin: "auto",
    backgroundColor: "#EFEFEF",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    display: "block",
    overflowX: "auto",
    whiteSpace: "nowrap",
    zIndex: "99999",
    position: "absolute",
    borderBottom: "1px solid #E0E0E0",
    boxShadow: "0 25px 15px -15px #2B2B2C",
  },
  searchCol: {
    width: "225px",
    margin: "auto",
    padding: "10px",
    textAlign: "center",
    display: "inline-block",
    float: "none",
    [theme.breakpoints.down("md")]: {
      width: "175px",
    },
  },
  disabled: {
    opacity: "0.7",
    pointerEvents: "none",
  },
  tooltip: {
    fontSize: "0.8rem",
    margin: "10px auto",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#fff" },
    secondary: { main: "#fafafa" },
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
      fontSize: "14px",
    },
  },
});

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        profile: null,
        url: null,
        username: null,
        country: null,
        followers: null,
        type: null,
      },
      song: "",
      data: null,
      search: null,
      chosen: null,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.props.spotifyApi
      .getMe()
      .then((data) => {
        this.setState({
          user: {
            id: data.id,
            profile: data.images[0].url,
            url: data.external_urls.spotify,
            username: data.display_name,
            country: data.country,
            followers: data.followers.total,
            type: data.product,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  reset() {
    this.setState({
      song: "",
      data: null,
      search: [],
      chosen: null,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.reset();
    if (this.state.song.length > 0) {
      this.props.spotifyApi
        .searchTracks(this.state.song, { limit: TOTAL_RESULTS })
        .then((data) => {
          this.setState({
            data: data,
          });
          this.createSongs();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // reset to default
    else {
      this.reset();
    }
  };

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      song: e.target.value.trim(),
    });
  };

  setSearchResult = (song) => {
    this.setState({
      song: "",
      chosen: song,
      search: [],
    });
  };

  createSongs = () => {
    const { classes } = this.props;
    const cols = [];
    if (this.state.data) {
      this.state.data.tracks.items.forEach((song) =>
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
      search: cols,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fade>
        <MuiThemeProvider theme={lightTheme}>
          <div className="row">
            <div
              className="col-xs-0 col-sm-0 col-md-0 col-lg-2"
              style={{ padding: "0px" }}
            >
              <Profile user={this.state.user} />
            </div>

            <div
              className="col-xs-12 col-sm-12 col-md-12 col-lg-8"
              style={{ padding: "0px" }}
            >
              <Grid
                container
                direction="row"
                spacing={0}
                justify="center"
                alignItems="center"
                className={classes.search}
              >
                <Grid item xs={false} md={false}>
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
                <Grid item xs={false} md={false}>
                  <button
                    className={classes.searchBtn}
                    style={{
                      pointerEvents: this.state.song ? "" : "none",
                      opacity: this.state.song ? "1" : "0.7",
                    }}
                  >
                    Search
                  </button>
                </Grid>
              </Grid>

              {this.state.search && (
                <MDBRow className={classes.searchResults}>
                  <Tooltip
                    placement="bottom"
                    title={<p className={classes.tooltip}>Close search</p>}
                  >
                    <CancelIcon
                      className={classes.close}
                      onClick={() => this.reset()}
                    />
                  </Tooltip>
                  {this.state.search}
                </MDBRow>
              )}

              <PostBox user={this.state.user} chosen={this.state.chosen} />

              <Feed user={this.state.user} />
            </div>

            <div
              className="col-xs-0 col-sm-0 col-md-0 col-lg-2"
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
  spotifyApi: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
