import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

import Profile from "../components/Profile/Profile";
import TextBox from "../components/TextBox/TextBox";
import Trending from "../components/Trending/Trending";

const styles = theme => ({
  body: {
    textAlign: "center",
    width: "100%",
    height: "100vh"
  },
  search: {
    paddingTop: "15px"
  },
  button: {
    borderRadius: "5px",
    marginLeft: "20px !important"
  },
  wall: {
    height: "100vh"
  },
  song: {
    marginTop: "10px"
  },
  searchImg: {
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  }
});

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: props.spotifyApi,
      song: "",
      data: null,
      search: []
    };
  }

  // getNowPlaying() {
  //     this.state.spotifyApi.getMyCurrentPlaybackState()
  //         .then((response) => {
  //             this.setState({
  //                 nowPlaying: {
  //                     name: response.item.name,
  //                     albumArt: response.item.album.images[0].url
  //                 }
  //             });
  //         });
  // }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.song.length > 0) {
      this.state.spotifyApi
        .searchTracks(this.state.song, { limit: 6 })
        .then(data => {
          this.setState({
            data: data
          }),
            this.searchSongs();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
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

  searchSongs = () => {
    const { classes } = this.props;
    const cols = [];
    if (this.state.data) {
      this.state.data.tracks.items.forEach(song =>
        cols.push(
          <MDBCol key={song.id} sm="4" md="3" lg="2">
            <a href={song.external_urls.spotify} target="_blank">
              <img
                className={classes.searchImg}
                src={song.album.images[0].url}
                alt="Album Art"
              />
            </a>
            <p style={{ wordWrap: "break-word" }}>
              <strong>{song.name}</strong>
            </p>
            <p>{song.artists[0].name}</p>
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
      <div>
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Profile />
          </div>

          <div className="col-md-6 col-lg-8">
            <div className={classes.wall}>
              <div className={classes.search}>
                <MDBCol>
                  <MDBFormInline
                    className="md-form"
                    onSubmit={this.handleSubmit}
                  >
                    <MDBIcon icon="search" />
                    <input
                      className="form-control form-control-sm ml-3 w-75"
                      type="text"
                      placeholder="What do you want to share with the world?"
                      aria-label="Search"
                      style={{ width: "100%", backgroundColor: "#f4f4f4" }}
                      onChange={this.handleInputChange}
                    />
                    <button
                      className="uk-button uk-button-primary"
                      style={{ borderRadius: "5px" }}
                    >
                      Search
                    </button>
                  </MDBFormInline>
                </MDBCol>
              </div>
              <h3 className={classes.song}>
                <strong>{this.state.song.toUpperCase()}</strong>
              </h3>
              <MDBRow>{this.state.search}</MDBRow>
              <TextBox />
            </div>
          </div>

          <div className="col-md-3 col-lg-2">
            <Trending />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
