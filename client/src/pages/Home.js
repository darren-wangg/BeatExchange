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
import Fade from "react-reveal/Fade";

import Profile from "../components/Profile/Profile";
import Feed from "../components/Feed/Feed";
import PostBox from "../components/PostBox/PostBox";
import Trending from "../components/Trending/Trending";

const TOTAL_RESULTS = 10;
const TITLE_SUBSTR = 30;

const styles = (theme) => ({
  search: {
    width: "100%",
    margin: "auto",
    padding: "15px",
    backgroundColor: "#FAFAFA",
    borderBottom: "1px solid #DEDEDE",
    boxShadow: "0 15px 20px -20px #2b2b2c",
    zIndex: "99999",
  },
  form: {
    margin: "auto 10px",
    height: "50px",
    backgroundColor: "#ECECEC",
    width: "90% !important",
    border: "1px solid #DEDEDE",
  },
  searchBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 15px 7px 15px",
    },
  },
  searchImg: {
    width: "125px",
    height: "auto",
    margin: "20px 0px 5px 0px",
    cursor: "pointer",
    borderRadius: "3px",
    boxShadow: "0 10px 8px -8px #2B2B2C",
    "&:hover": {
      transform: "scale(1.02)",
    },
    [theme.breakpoints.down("md")]: {
      width: "100px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "75px",
    },
  },
  close: {
    width: "20px",
    height: "auto",
    cursor: "pointer",
    position: "absolute",
    margin: "5px",
    zIndex: "99999",
    [theme.breakpoints.down("sm")]: {
      width: "15px",
    },
  },
  searchResults: {
    width: "100%",
    margin: "auto",
    backgroundColor: "#FAFAFA",
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
      width: "200px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "175px",
    },
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
  },
  profile: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  wall: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      flex: "none",
      maxWidth: "none",
    },
  },
  trending: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
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
    primary: { main: "#2b2b2c" },
    secondary: { main: "#fafafa" },
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
        img: null,
        url: null,
        username: null,
        country: null,
        followers: null,
        type: null,
      },
      song: "",
      searchData: null,
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
            img: data.images[0].url,
            url: data.external_urls.spotify,
            username: data.display_name,
            country: data.country,
            followers: data.followers.total,
            type: data.product,
          },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch user: ", error);
      });
  }

  reset() {
    this.setState({
      song: "",
      searchData: null,
      search: null,
      chosen: null,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.song.length > 0) {
      this.props.spotifyApi
        .searchTracks(this.state.song, { limit: TOTAL_RESULTS })
        .then((data) => {
          this.setState({
            searchData: data,
          });
          this.createSongs();
        })
        .catch((error) => {
          console.error("Failed to submit search: ", error);
        });
    }
    this.setState({
      song: "",
      searchData: null,
      chosen: null,
    });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      song: e.target.value,
    });
  };

  setSearchResult = (song) => {
    this.setState({
      chosen: song,
      search: [],
    });
  };

  createSongs = () => {
    const { classes } = this.props;
    const cols = [];
    if (this.state.searchData) {
      this.state.searchData.tracks.items.forEach((song) =>
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
            {song.name.length > TITLE_SUBSTR ? (
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>{song.name}</p>}
              >
                <Typography variant="subtitle1" color="primary">
                  <strong>
                    {song.name.substring(0, TITLE_SUBSTR) + "..."}
                  </strong>
                </Typography>
              </Tooltip>
            ) : (
              <Typography variant="subtitle1" color="primary">
                <strong>{song.name}</strong>
              </Typography>
            )}
            <Typography variant="subtitle1" color="primary">
              {song.artists[0].name}
            </Typography>
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
          <div className="row" style={{ margin: "0px" }}>
            <div
              className={`col-xs-0 col-sm-0 col-md-0 col-lg-2 ${classes.profile}`}
              style={{ padding: "0px" }}
            >
              <Profile user={this.state.user} />
            </div>

            <div
              className={`col-xs-12 col-sm-12 col-md-12 col-lg-8 ${classes.wall}`}
              style={{ padding: "0px" }}
            >
              <Grid
                container
                direction="row"
                spacing={0}
                justify="center"
                alignItems="center"
                className={classes.search}
                tourname="Search"
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
                      value={this.state.song}
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

              {this.state.search && !this.state.chosen && (
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

              {this.state.chosen && (
                <PostBox
                  user={this.state.user}
                  chosen={this.state.chosen}
                  tourname="PostBox"
                />
              )}

              <Feed user={this.state.user} />
            </div>

            <div
              className={`col-xs-0 col-sm-0 col-md-0 col-lg-2 ${classes.trending}`}
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
