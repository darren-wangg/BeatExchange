import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBRow, MDBCol } from "mdbreact";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";

import loading from "../../assets/images/loading.png";
const TOTAL_RELEASES = 7;
const TITLE_SUBSTR = 24;

const styles = theme => ({
  container: {
    fontFamily: "Rubik",
    padding: "15px 0px 0px 0px",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: "100%"
  },
  releases: {
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: "25px"
  },
  releaseMenu: {
    display: "block",
    overflowX: "auto",
    whiteSpace: "nowrap",
    margin: "15px auto"
  },
  releaseCol: {
    display: "inline-block",
    float: "none"
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
    this.getReleases();
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
      albums: cols,
      songs: cols,
      news: cols
    });
  }

  getReleases() {
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
          albums: cols
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h2>
          <u>Trending</u>
        </h2>
        <p className={classes.releases}>Albums</p>
        <MDBRow className={classes.releaseMenu}>{this.state.albums}</MDBRow>
        <p className={classes.releases}>Songs</p>
        <MDBRow className={classes.releaseMenu}>{this.state.songs}</MDBRow>
        <p className={classes.releases}>News</p>
        <MDBRow>{this.state.news}</MDBRow>
      </div>
    );
  }
}

Trending.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Trending);
