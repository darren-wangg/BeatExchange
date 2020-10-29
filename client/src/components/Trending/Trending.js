import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBRow, MDBCol } from "mdbreact";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { getChart } from "billboard-top-100";

import loading from "../../assets/images/loading.png";
const TOTAL_RELEASES = 10;
const TITLE_SUBSTR = 24;
const NEWS_TITLE_SUBSTR = 50;
const NEWS_DESCRIPTION_SUBSTR = 200;
const NEWS_API_KEY = "0ae39ff91005420e99d096f5d224e223";
const NEWS_QUERY =
  "https://newsapi.org/v2/everything?q=music&apiKey=" + NEWS_API_KEY;

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
    display: "inline-block",
    float: "none"
  },
  playlistCol: {
    display: "inline-block",
    float: "none",
    bottom: "50px",
    width: "300px",
    wordBreak: "break-all",
    whiteSpace: "normal",
    [theme.breakpoints.down("md")]: {
      width: "250px"
    }
  },
  newsCol: {
    display: "inline-block",
    float: "none",
    bottom: "50px",
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
    [theme.breakpoints.down("md")]: {
      width: "125px"
    }
  }
});

export class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: props.spotifyApi,
      key: "me",
      myAlbums: [],
      myArtists: [],
      mySongs: [],
      albums: [],
      songs: [],
      news: []
    };
  }

  componentWillMount() {
    // setup menu with default results
    this.setupReleases();
  }

  componentDidMount() {
    this.getMyReleases();
    this.getMyTop();
    this.getWorldReleases();
    this.getNews();
  }

  setupReleases() {
    const { classes } = this.props;
    const cols = [];
    cols.push(
      <MDBCol className={classes.releaseCol}>
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
      albums: cols,
      songs: cols,
      news: cols
    });
  }

  getMyReleases() {
    const { classes } = this.props;
    const cols = [];
    this.state.spotifyApi
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
    const cols = [];
    // getChart((err, chart) => {
    //   if (err) console.log(err);
    //   console.log("CHARTS: ", chart.songs); // prints the week of the chart in the date format YYYY-MM-DD
    // });

    // .then(data => {
    //   data.albums.items.forEach(album =>
    //     cols.push(
    //       <MDBCol className={classes.releaseCol} key={album.id}>
    //         <a href={album.external_urls.spotify} target="_blank">
    //           <img
    //             className={classes.searchImg}
    //             src={album.images[0].url}
    //             alt="Album Art"
    //           />
    //         </a>
    //         <p style={{ wordWrap: "break-word", margin: "7px" }}>
    //           <strong>
    //             {album.name.length > TITLE_SUBSTR
    //               ? album.name.substring(0, TITLE_SUBSTR) + "..."
    //               : album.name}
    //           </strong>
    //         </p>
    //         <p style={{ margin: "5px" }}>{album.artists[0].name}</p>
    //       </MDBCol>
    //     )
    //   );
    //   this.setState({
    //     albums: cols
    //   });
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  }

  getMyTop() {
    const { classes } = this.props;
    const cols = [];
    this.state.spotifyApi
      .getUserPlaylists()
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
    this.state.spotifyApi
      .getMyRecentlyPlayedTracks()
      .then(data => {})
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
            <MDBCol className={classes.newsCol} key={article.source.title}>
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

    return (
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
            <p className={classes.releases}>My Playlists</p>
            <MDBRow className={classes.releaseMenu}>
              {this.state.myArtists}
            </MDBRow>
            <p className={classes.releases}>Top Songs</p>
            <MDBRow className={classes.releaseMenu}>
              {this.state.mySongs}
            </MDBRow>
          </div>
        ) : (
          <div className={classes.world}>
            <p className={classes.releases}>Albums</p>
            <MDBRow className={classes.releaseMenu}>{this.state.albums}</MDBRow>
            <p className={classes.releases}>Songs</p>
            <MDBRow className={classes.releaseMenu}>{this.state.songs}</MDBRow>
            <p className={classes.releases}>News</p>
            <MDBRow className={classes.releaseMenu}>{this.state.news}</MDBRow>
          </div>
        )}
      </MDBCol>
    );
  }
}

Trending.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Trending);
