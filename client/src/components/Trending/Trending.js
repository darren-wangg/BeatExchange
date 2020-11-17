import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBRow, MDBCol } from "mdbreact";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import Fade from "react-reveal/Fade";
import { CircularProgress } from "@material-ui/core";

import loading from "../../assets/images/loading.png";
const TOTAL_RELEASES = 10;
const TITLE_SUBSTR = 24;
const NEWS_TITLE_SUBSTR = 50;
const NEWS_DESCRIPTION_SUBSTR = 200;
const NEWS_API_KEY = "0ae39ff91005420e99d096f5d224e223";
const NEWS_QUERY =
  "https://newsapi.org/v2/everything?q=music&apiKey=" + NEWS_API_KEY;
const LAST_FM_KEY = "f6fb36743399303c53f0c7dbdcc4ea06";
const LAST_FM_TRACKS_QUERY =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
  LAST_FM_KEY +
  "&format=json" +
  "&limit=" +
  TOTAL_RELEASES;
const LAST_FM_ARTISTS_QUERY =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
  LAST_FM_KEY +
  "&format=json" +
  "&limit=" +
  TOTAL_RELEASES;

const styles = theme => ({
  container: {
    fontFamily: "Rubik",
    paddingTop: "15px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabs: {
    margin: "auto"
  },
  me: {
    marginTop: "25px"
  },
  world: {
    marginTop: "25px"
  },
  releases: {
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: "25px"
  },
  releaseMenu: {
    display: "block",
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  releaseCol: {
    width: "250px",
    display: "inline-block",
    float: "none",
    [theme.breakpoints.down("md")]: {
      width: "200px"
    }
  },
  playlistCol: {
    display: "inline-block",
    float: "none",
    bottom: "50px",
    width: "250px",
    wordBreak: "break-all",
    whiteSpace: "normal",
    [theme.breakpoints.down("md")]: {
      width: "200px",
      bottom: "30px"
    }
  },
  newsCol: {
    display: "inline-block",
    float: "none",
    bottom: "100px",
    height: "400px",
    width: "300px",
    wordBreak: "break-all",
    whiteSpace: "normal",
    [theme.breakpoints.down("md")]: {
      height: "350px",
      width: "250px"
    }
  },
  searchImg: {
    width: "175px",
    height: "auto",
    boxShadow: "0 8px 6px -6px #2B2B2C",
    "&:hover": {
      transform: "scale(1.05)"
    },
    [theme.breakpoints.down("md")]: {
      width: "125px"
    }
  },
  newsImg: {
    boxShadow: "0 8px 6px -6px #2B2B2C",
    "&:hover": {
      transform: "scale(1.05)"
    }
  }
});

export class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "me",
      myAlbums: [],
      myArtists: [],
      mySongs: [],
      artists: [],
      songs: [],
      news: [],
      loading: true
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
      loading: false
    });
  }

  setupReleases() {
    const { classes } = this.props;
    const cols = [];
    let key = 1;
    cols.push(
      <MDBCol className={classes.releaseCol} key={key++}>
        <img
          className={classes.searchImg}
          src={loading}
          alt="Please log in..."
        />
      </MDBCol>
    );
    this.setState({
      myAlbums: cols,
      myArtists: cols,
      mySongs: cols,
      artists: cols,
      songs: cols,
      news: cols
    });
  }

  getMyReleases() {
    const { classes } = this.props;
    const cols = [];
    this.props.spotifyApi
      .getNewReleases({ limit: TOTAL_RELEASES })
      .then(data => {
        data.albums.items.forEach(album =>
          cols.push(
            <MDBCol className={classes.releaseCol} key={album.id}>
              <a href={album.external_urls.spotify} target="_blank">
                <img
                  className={classes.searchImg}
                  src={album.images[0].url}
                  alt="Album Art"
                />
              </a>
              <p style={{ wordWrap: "break-word", margin: "7px" }}>
                <strong>
                  {album.name.length > TITLE_SUBSTR
                    ? album.name.substring(0, TITLE_SUBSTR) + "..."
                    : album.name}
                </strong>
              </p>
              <p style={{ margin: "5px" }}>{album.artists[0].name}</p>
            </MDBCol>
          )
        );
        this.setState({
          myAlbums: cols
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getWorldReleases() {
    const { classes } = this.props;
    const artistCols = [];
    const trackCols = [];
    axios.get(LAST_FM_ARTISTS_QUERY).then(res => {
      res.data.artists.artist.forEach(artist =>
        this.props.spotifyApi
          .searchArtists(artist.name, { limit: 1 })
          .then(data => {
            artistCols.push(
              <MDBCol className={classes.releaseCol} key={artist.name}>
                <a
                  href={data.artists.items[0].external_urls.spotify}
                  target="_blank"
                >
                  <img
                    className={classes.searchImg}
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
                  Plays
                </p>
              </MDBCol>
            );
          })
      );
      this.setState({
        artists: artistCols
      });
    });
    axios
      .get(LAST_FM_TRACKS_QUERY)
      .then(res => {
        res.data.tracks.track.forEach(track =>
          this.props.spotifyApi
            .searchTracks(track.name, { limit: 1 })
            .then(data => {
              trackCols.push(
                <MDBCol className={classes.releaseCol} key={track.name}>
                  <a
                    href={data.tracks.items[0].external_urls.spotify}
                    target="_blank"
                  >
                    <img
                      className={classes.searchImg}
                      src={data.tracks.items[0].album.images[0].url}
                      alt="Album Art"
                    />
                  </a>
                  <p style={{ wordWrap: "break-word", margin: "7px" }}>
                    <strong>
                      {track.name.length > TITLE_SUBSTR
                        ? track.name.substring(0, TITLE_SUBSTR) + "..."
                        : track.name}
                    </strong>
                  </p>
                  <p style={{ margin: "5px" }}>{track.artist.name}</p>
                </MDBCol>
              );
            })
        );
        this.setState({
          songs: trackCols
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getMyTop() {
    const { classes } = this.props;
    const cols = [];
    this.props.spotifyApi
      .getUserPlaylists({ limit: TOTAL_RELEASES })
      .then(data => {
        data.items.forEach(playlist =>
          cols.push(
            <MDBCol className={classes.playlistCol} key={playlist.id}>
              <a href={playlist.external_urls.spotify} target="_blank">
                <img
                  className={classes.searchImg}
                  src={playlist.images[0].url}
                  alt="Playlist Art"
                />
              </a>
              <p style={{ wordWrap: "break-word", margin: "7px" }}>
                <strong>
                  {playlist.name.length > TITLE_SUBSTR
                    ? playlist.name.substring(0, TITLE_SUBSTR) + "..."
                    : playlist.name}
                </strong>
              </p>
              <p style={{ margin: "5px" }}>
                {playlist.owner.display_name} | <em>{playlist.tracks.total}</em>
              </p>
            </MDBCol>
          )
        );
        this.setState({
          myArtists: cols
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.props.spotifyApi
      .getMyTopTracks({ limit: TOTAL_RELEASES })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getNews() {
    const { classes } = this.props;
    const cols = [];
    axios
      .get(NEWS_QUERY)
      .then(data => {
        data = data.data;
        data.articles.slice(0, TOTAL_RELEASES).map(article =>
          cols.push(
            <MDBCol className={classes.newsCol} key={article.title}>
              <a href={article.url} target="_blank">
                <img
                  className={classes.newsImg}
                  src={article.urlToImage}
                  alt="Album Art"
                />
              </a>
              <p style={{ margin: "7px" }}>
                <strong>
                  {article.title.length > NEWS_TITLE_SUBSTR
                    ? article.title.substring(0, NEWS_TITLE_SUBSTR) + "..."
                    : article.title}
                </strong>
              </p>
              <p style={{ margin: "5px" }}>
                {article.description.substring(0, NEWS_DESCRIPTION_SUBSTR) +
                  "..."}
              </p>
            </MDBCol>
          )
        );
        this.setState({
          news: cols
        });
      })
      .catch(error => {
        console.error(error);
      });
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
        <MDBCol className={classes.container}>
          <h2>
            <u>Trending</u>
          </h2>
          <Tabs
            className={classes.tabs}
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={k => this.setState({ key: k })}
          >
            <Tab eventKey="me" title="Me" />
            <Tab eventKey="world" title="World" />
          </Tabs>
          {this.state.key === "me" ? (
            <div className={classes.me}>
              <p className={classes.releases}>New Albums</p>
              <MDBRow className={classes.releaseMenu}>
                {this.state.myAlbums}
              </MDBRow>
              <p className={classes.releases}>My Songs</p>
              <MDBRow className={classes.releaseMenu}>
                {this.state.mySongs}
              </MDBRow>
              <p className={classes.releases}>My Playlists</p>
              <MDBRow className={classes.releaseMenu}>
                {this.state.myArtists}
              </MDBRow>
            </div>
          ) : (
            <div className={classes.world}>
              <p className={classes.releases}>Top Artists</p>
              <MDBRow className={classes.releaseMenu}>
                {this.state.artists}
              </MDBRow>
              <p className={classes.releases}>Top Songs</p>
              <MDBRow className={classes.releaseMenu}>
                {this.state.songs}
              </MDBRow>
              <p className={classes.releases}>News</p>
              <MDBRow className={classes.releaseMenu}>{this.state.news}</MDBRow>
            </div>
          )}
        </MDBCol>
      </Fade>
    );
  }
}

Trending.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Trending);
