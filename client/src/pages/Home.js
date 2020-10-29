import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MDBRow, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

import Profile from "../components/Profile/Profile";
import TextBox from "../components/TextBox/TextBox";
import Trending from "../components/Trending/Trending";
import Fade from "react-reveal/Fade";
import { StringDecoder } from "string_decoder";

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
    borderBottomRightRadius: "5px"
  }
});

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: props.spotifyApi,
      song: "",
      data: null,
      search: [],
      chosen: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.song.length > 0) {
      this.state.spotifyApi
        .searchTracks(this.state.song, { limit: 6 })
        .then(data => {
          console.log("SEARCH: " + JSON.stringify(data, null, 2));
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
      <Fade effect="fadeInUp">
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-3 col-lg-2">
            <Profile spotifyApi={this.state.spotifyApi} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
            <div className={classes.wall}>
              <div className={classes.search}>
                <MDBFormInline className="md-form" onSubmit={this.handleSubmit}>
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
              <TextBox chosen={this.state.chosen} />
            </div>
          </div>

          <div className="col-xs-0 col-sm-0 col-md-3 col-lg-2">
            <Trending spotifyApi={this.state.spotifyApi} />
          </div>
        </div>
      </Fade>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  spotifyApi: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
