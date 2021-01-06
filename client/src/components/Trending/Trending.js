import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { MDBRow, MDBCol } from "mdbreact";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import Fade from "react-reveal/Fade";
import { CircularProgress, Tooltip } from "@material-ui/core";

import loading from "../../assets/images/loading.png";
const TOTAL_RELEASES = 10;
const TITLE_SUBSTR = 22;
const NEWS_TITLE_SUBSTR = 100;
const NEWS_DESCRIPTION_SUBSTR = 200;
const NYT_KEY = process.env.REACT_APP_NYT_API_KEY;
const NEWS_QUERY =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=music&api-key=" +
  NYT_KEY;
const LAST_FM_KEY = process.env.REACT_APP_LASTFM_API_KEY;
const LAST_FM_TRACKS_QUERY =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
  LAST_FM_KEY +
  "&format=json&limit=" +
  TOTAL_RELEASES;
const LAST_FM_ARTISTS_QUERY =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
  LAST_FM_KEY +
  "&format=json&limit=" +
  TOTAL_RELEASES;

const styles = (theme) => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "25px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    color: "#2b2b2c",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  tabs: {
    margin: "auto",
    color: "#2b2b2c",
  },
  me: {
    marginTop: "25px",
  },
  world: {
    marginTop: "25px",
  },
  releases: {
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: "25px",
    margin: "15px auto 10px auto",
  },
  releaseMenu: {
    display: "block",
    overflow: "scroll",
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: "25px",
    borderBottom: "1px solid #DEDEDE",
  },
  releaseCol: {
    marginTop: "10px",
    width: "225px",
    display: "inline-block",
    float: "none",
    [theme.breakpoints.down("md")]: {
      width: "150px",
    },
  },
  newsCol: {
    display: "inline-block",
    float: "none",
    height: "400px",
    width: "300px",
    wordBreak: "break-all",
    whiteSpace: "normal",
    marginRight: "20px",
    [theme.breakpoints.down("md")]: {
      height: "350px",
      width: "250px",
      marginRight: "10px",
    },
  },
  newsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  newsMenu: {
    display: "block",
    height: "450px",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  trendImg: {
    width: "170px",
    height: "170px",
    borderRadius: "3px",
    boxShadow: "0 10px 8px -8px #2B2B2C",
    "&:hover": {
      transform: "scale(1.02)",
    },
    [theme.breakpoints.down("md")]: {
      width: "130px",
      height: "130px",
    },
  },
  newsImg: {
    width: "175px",
    height: "auto",
    borderRadius: "3px",
    boxShadow: "0 10px 8px -8px #2B2B2C",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
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
    primary: { main: "#2b2b2c" },
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
    },
  },
});

export class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "me",
      myAlbums: [],
      myArtists: [],
      myTracks: [],
      artists: [],
      songs: [],
      news: [],
      loading: true,
    };
  }

  componentDidMount() {
    // setup menu with default results
    this.setupReleases();

    this.getMyReleases();
    this.getMyTop();
    this.getWorldReleases();
    this.getNews();
    this.setState({
      loading: false,
    });
  }

  setupReleases() {
    const { classes } = this.props;
    const cols = [];
    cols.push(
      <MDBCol className={classes.releaseCol}>
        <img className={classes.trendImg} src={loading} alt="Blank Album Art" />
      </MDBCol>
    );
    this.setState({
      myAlbums: cols,
      myArtists: cols,
      myTracks: cols,
      artists: cols,
      songs: cols,
      news: cols,
    });
  }

  getMyReleases() {
    const { classes } = this.props;
    const cols = [];
    this.props.spotifyApi
      .getNewReleases({ limit: TOTAL_RELEASES })
      .then((data) => {
        data.albums.items.forEach((album) =>
          cols.push(
            <MDBCol className={classes.releaseCol} key={album.id}>
              <a href={album.external_urls.spotify} target="_blank">
                <img
                  className={classes.trendImg}
                  src={album.images[0].url}
                  alt="Album Art"
                />
              </a>
              <p style={{ wordWrap: "break-word", margin: "7px" }}>
                {album.name.length > TITLE_SUBSTR ? (
                  <Tooltip
                    placement="bottom"
                    title={<p className={classes.tooltip}>{album.name}</p>}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <strong>
                        {album.name.substring(0, TITLE_SUBSTR) + "..."}
                      </strong>
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="subtitle1" color="primary">
                    <strong>{album.name}</strong>
                  </Typography>
                )}
              </p>
              <p style={{ margin: "5px" }}>{album.artists[0].name}</p>
            </MDBCol>
          )
        );
        this.setState({
          myAlbums: cols,
        });
      })
      .catch((error) => {
        console.error("Failed to get my releases: ", error);
      });
  }

  getWorldReleases() {
    const { classes } = this.props;
    const artistCols = [];
    const trackCols = [];
    axios.get(LAST_FM_ARTISTS_QUERY).then((res) => {
      res.data.artists.artist.forEach((artist) =>
        this.props.spotifyApi
          .searchArtists(artist.name, { limit: 1 })
          .then((data) => {
            artistCols.push(
              <MDBCol className={classes.releaseCol} key={artist.name}>
                <a
                  href={data.artists.items[0].external_urls.spotify}
                  target="_blank"
                >
                  <img
                    className={classes.trendImg}
                    src={data.artists.items[0].images[0].url} // LastFM API image url's not setup... look for new API in future
                    alt="Album Art"
                  />
                </a>
                <p style={{ wordWrap: "break-word", margin: "7px" }}>
                  <strong>
                    {artist.name.length > TITLE_SUBSTR
                      ? artist.name.substring(0, TITLE_SUBSTR) + "..."
                      : artist.name}
                  </strong>
                </p>
                <p style={{ margin: "5px" }}>
                  {artist.playcount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  plays
                </p>
              </MDBCol>
            );
          })
      );
      this.setState({
        artists: artistCols,
      });
    });
    axios
      .get(LAST_FM_TRACKS_QUERY)
      .then((res) => {
        res.data.tracks.track.forEach((track) =>
          this.props.spotifyApi
            .searchTracks(track.name, { limit: 1 })
            .then((data) => {
              trackCols.push(
                <MDBCol className={classes.releaseCol} key={track.name}>
                  <a
                    href={data.tracks.items[0].external_urls.spotify}
                    target="_blank"
                  >
                    <img
                      className={classes.trendImg}
                      src={data.tracks.items[0].album.images[0].url}
                      alt="Album Art"
                    />
                  </a>
                  <p style={{ wordWrap: "break-word", margin: "7px" }}>
                    {track.name.length > TITLE_SUBSTR ? (
                      <Tooltip
                        placement="bottom"
                        title={<p className={classes.tooltip}>{track.name}</p>}
                      >
                        <Typography variant="subtitle1" color="primary">
                          <strong>
                            {track.name.substring(0, TITLE_SUBSTR) + "..."}
                          </strong>
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography variant="subtitle1" color="primary">
                        <strong>{track.name}</strong>
                      </Typography>
                    )}
                  </p>
                  <p style={{ margin: "5px" }}>{track.artist.name}</p>
                </MDBCol>
              );
            })
        );
        this.setState({
          songs: trackCols,
        });
      })
      .catch((error) => {
        console.error("Failed to get world releases: ", error);
      });
  }

  getMyTop() {
    const { classes } = this.props;
    const artists = [];
    this.props.spotifyApi
      .getMyTopArtists({ limit: TOTAL_RELEASES })
      .then((data) => {
        if (data.items.length === 0) {
          return;
        }
        data.items.forEach((artist) =>
          artists.push(
            <MDBCol className={classes.releaseCol} key={artist.id}>
              <a href={artist.external_urls.spotify} target="_blank">
                <img
                  className={classes.trendImg}
                  src={artist.images[0].url}
                  alt="Artist Art"
                />
              </a>
              <p style={{ wordWrap: "break-word", margin: "7px" }}>
                <strong>
                  {artist.name.length > TITLE_SUBSTR
                    ? artist.name.substring(0, TITLE_SUBSTR) + "..."
                    : artist.name}
                </strong>
              </p>
            </MDBCol>
          )
        );
        this.setState({
          myArtists: artists,
        });
      })
      .catch((error) => {
        console.error("Failed to get my top artists: ", error);
      });

    const tracks = [];
    this.props.spotifyApi
      .getMyTopTracks({ limit: TOTAL_RELEASES })
      .then((data) => {
        if (data.items.length === 0) {
          return;
        }
        data.items.forEach((track) =>
          tracks.push(
            <MDBCol className={classes.releaseCol} key={track.id}>
              <a href={track.external_urls.spotify} target="_blank">
                <img
                  className={classes.trendImg}
                  src={track.album.images[0].url}
                  alt="Track Art"
                />
              </a>
              <p style={{ wordWrap: "break-word", margin: "7px" }}>
                {track.name.length > TITLE_SUBSTR ? (
                  <Tooltip
                    placement="bottom"
                    title={<p className={classes.tooltip}>{track.name}</p>}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <strong>
                        {track.name.substring(0, TITLE_SUBSTR) + "..."}
                      </strong>
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="subtitle1" color="primary">
                    <strong>{track.name}</strong>
                  </Typography>
                )}
                <Tooltip
                  placement="bottom"
                  title={
                    <p className={classes.tooltip}>Popularity (out of 100)</p>
                  }
                >
                  <em>{track.popularity}</em>
                </Tooltip>
              </p>
            </MDBCol>
          )
        );
        this.setState({
          myTracks: tracks,
        });
      })
      .catch((error) => {
        console.error("Failed to get my top tracks: ", error);
      });
  }

  getMyRecommendations() {
    // seed_artists (use users top artists ids)
    // seed_genres (*?)
    // seed_tracks (use users top tracks ids)
    // this.props.spotifyApi
    // .getRecommendations()
    // .then(data => {
    //   console.log("RECOMMENDATIONS: " + JSON.stringify(data, null, 2));
    // })
  }

  getNews() {
    const { classes } = this.props;
    const cols = [];
    axios
      .get(NEWS_QUERY)
      .then((data) => {
        data = data.data;
        data.response.docs.slice(0, TOTAL_RELEASES).map((article) =>
          cols.push(
            <MDBCol className={classes.newsCol} key={article.web_url}>
              <MDBRow className={classes.newsRow}>
                <a href={article.web_url} target="_blank">
                  <img
                    className={classes.newsImg}
                    src={`https://static01.nyt.com/${article.multimedia[29].url}`}
                    alt="News"
                  />
                </a>
              </MDBRow>
              <MDBRow className={classes.newsRow}>
                <p style={{ margin: "10px" }}>
                  {article.snippet.length > NEWS_TITLE_SUBSTR ? (
                    <Tooltip
                      placement="bottom"
                      title={
                        <p className={classes.tooltip}>{article.snippet}</p>
                      }
                    >
                      <strong>
                        {article.snippet.substring(0, NEWS_TITLE_SUBSTR) +
                          "..."}
                      </strong>
                    </Tooltip>
                  ) : (
                    <strong>{article.snippet}</strong>
                  )}
                </p>
              </MDBRow>
              <MDBRow className={classes.newsRow}>
                <p style={{ margin: "8px", textAlign: "left" }}>
                  {article.lead_paragraph.substring(
                    0,
                    NEWS_DESCRIPTION_SUBSTR
                  ) + "..."}
                </p>
              </MDBRow>
            </MDBCol>
          )
        );
        this.setState({
          news: cols,
        });
      })
      .catch((error) => {
        console.error("Failed to get music news: ", error);
      });
  }

  handleSelect(k) {
    let scrollBar = document.getElementsByClassName("releases");
    Array.from(scrollBar).forEach((el) => {
      el.scrollLeft = 0;
    });
    this.setState({ key: k });
  }

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <MDBCol className={classes.container}>
          <CircularProgress size={80} style={{ color: "#1edd88" }} />
        </MDBCol>
      );
    }

    return (
      <Fade>
        <MuiThemeProvider theme={lightTheme}>
          <MDBCol className={classes.container} tourname="TrendingSidebar">
            <h2>
              <u>Trending</u>
            </h2>
            <Tabs
              className={classes.tabs}
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={(k) => this.handleSelect(k)}
            >
              <Tab eventKey="me" title="Me" />
              <Tab eventKey="world" title="World" />
            </Tabs>
            {this.state.key === "me" ? (
              <div className={classes.me}>
                <Tooltip
                  placement="bottom"
                  title={
                    <p className={classes.tooltip}>
                      New album releases tailored for you
                    </p>
                  }
                >
                  <p className={classes.releases}>New Albums</p>
                </Tooltip>
                <MDBRow className={`releases ${classes.releaseMenu}`}>
                  {this.state.myAlbums}
                </MDBRow>
                <Tooltip
                  placement="bottom"
                  title={
                    <p className={classes.tooltip}>
                      Your all-time top artists on Spotify
                    </p>
                  }
                >
                  <p className={classes.releases}>My Artists</p>
                </Tooltip>
                <MDBRow className={`releases ${classes.releaseMenu}`}>
                  {this.state.myArtists}
                </MDBRow>
                <Tooltip
                  placement="bottom"
                  title={
                    <p className={classes.tooltip}>
                      Your all-time top songs on Spotify
                    </p>
                  }
                >
                  <p className={classes.releases}>My Songs</p>
                </Tooltip>
                <MDBRow className={`releases ${classes.releaseMenu}`}>
                  {this.state.myTracks}
                </MDBRow>
              </div>
            ) : (
              <div className={classes.world}>
                <Tooltip
                  placement="bottom"
                  title={<p className={classes.tooltip}>World top artists</p>}
                >
                  <p className={classes.releases}>Top Artists</p>
                </Tooltip>
                <MDBRow className={`releases ${classes.releaseMenu}`}>
                  {this.state.artists}
                </MDBRow>
                <Tooltip
                  placement="bottom"
                  title={<p className={classes.tooltip}>World top songs</p>}
                >
                  <p className={classes.releases}>Top Songs</p>
                </Tooltip>
                <MDBRow className={`releases ${classes.releaseMenu}`}>
                  {this.state.songs}
                </MDBRow>
                <Tooltip
                  placement="bottom"
                  title={<p className={classes.tooltip}>World music news</p>}
                >
                  <p className={classes.releases}>News</p>
                </Tooltip>
                <MDBRow className={classes.newsMenu}>
                  {this.state.news}
                </MDBRow>
              </div>
            )}
          </MDBCol>
        </MuiThemeProvider>
      </Fade>
    );
  }
}

Trending.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trending);
