import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Tooltip,
  Snackbar,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import hash from "object-hash";

const TITLE_SUBSTR = 32;
const ALBUM_SUBSTR = 20;

const styles = (theme) => ({
  container: {
    maxHeight: "450px",
    margin: "auto",
    padding: "25px 0px 15px 0px",
    backgroundColor: "#FAFAFA",
    width: "100%",
    display: "block",
    fontFamily: "Rubik",
    position: "absolute",
    borderBottom: "1px solid #E0E0E0",
    boxShadow: "0 25px 15px -15px #2B2B2C",
    zIndex: "99999",
  },
  close: {
    width: "30px",
    height: "auto",
    cursor: "pointer",
    margin: "auto",
    position: "absolute",
    color: "#DEDEDE",
    top: "-12px",
    left: "-12px",
    [theme.breakpoints.down("md")]: {
      width: "25px",
    },
  },
  songContainer: {
    width: "100%",
    margin: "auto",
    backgroundColor: "#2B2B2C",
    borderRadius: "5px",
    boxShadow: "0 15px 10px -10px #2B2B2C",
    position: "relative",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  songImg: {
    display: "flex",
    margin: "auto",
    width: "75px",
    maxWidth: "75px",
    height: "auto",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      width: "50px",
    },
  },
  formGroup: {
    position: "relative",
    width: "100%",
  },
  textArea: {
    resize: "none",
    width: "70%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      height: "150px",
    },
  },
  postBtn: {
    background: "#1D87F0",
    color: "white",
    padding: "10px 20px 10px 20px",
    border: "none",
    borderRadius: "5px",
    position: "absolute",
    right: "20%",
    bottom: "10%",
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
  },
  tagsForm: {
    margin: "auto",
    minWidth: "100px",
    maxWidth: "250px",
    position: "absolute",
    left: "20%",
    bottom: "10%",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    margin: "4px",
    color: "#1D87F0",
  },
  more: {
    width: "30px",
    height: "auto",
    cursor: "pointer",
    color: "#CCCCCC",
    [theme.breakpoints.down("md")]: {
      width: "25px",
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
    primary: { main: "#fff" },
    secondary: { main: "#CCCCCC" },
    textPrimary: { main: "#2b2b2c" },
  },
  typography: {
    useNextVariants: true,
    subtitle1: {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

const tags = [
  "alt",
  "ambient",
  "blues",
  "classical",
  "comedy",
  "country",
  "dance",
  "EDM",
  "disco",
  "folk",
  "guitar",
  "hiphop",
  "house",
  "indie",
  "jazz",
  "live",
  "lofi",
  "love",
  "metal",
  "new",
  "old-school",
  "piano",
  "pop",
  "r&b",
  "rap",
  "reggae",
  "remix",
  "rock",
  "soul",
  "soundtrack",
  "trap",
  "world",
];

export class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      message: "",
      tags: [],
      currTime: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      data: {
        id: null,
        user: null,
        post: null,
        text: null,
      },
      snackbar: {
        open: false,
        severity: null,
        msg: null,
      },
    };
  }

  handleClose = (e, reason) => {
    e.preventDefault();
    if (reason === "clickaway") return;
    this.setState({
      snackbar: {
        open: false,
        severity: this.state.snackbar.severity,
      },
    });
  };

  deleteChosen() {
    this.setState({
      active: false,
      message: "",
      tags: [],
    });
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      message: e.target.value,
    });
  };

  handleTagChange = (e) => {
    e.preventDefault();
    if (this.state.tags.length < 3) {
      this.setState({
        tags: e.target.value,
      });
    } else {
      this.setState({
        snackbar: {
          open: true,
          severity: "warning",
          msg: "Can only assign 3 tags. Please try again.",
        },
      });
    }
  };

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  createPost = (e) => {
    e.preventDefault();
    if (this.state.message.length <= 1) {
      this.setState({
        snackbar: {
          open: true,
          severity: "error",
          msg: "Message is too short.",
        },
      });
      return;
    }
    try {
      const postID = this.props.chosen.id + this.props.user.id + new Date();
      const newPost = {
        id: hash(postID),
        user: {
          id: this.props.user.id,
          name: this.props.user.username,
          status: "author",
          image: this.props.user.img,
          url: this.props.user.link,
        },
        post: {
          id: this.props.chosen.id,
          type: this.props.chosen.type,
          name: this.props.chosen.name,
          duration: this.props.chosen.duration_ms,
          album: this.props.chosen.album.name,
          artist: this.props.chosen.artists[0].name,
          image: this.props.chosen.album.images[0].url,
          url: this.props.chosen.external_urls.spotify,
        },
        text: this.state.message,
        tags: this.state.tags,
      };
      this.setState(
        {
          data: newPost,
        },
        () => {
          this.submitPost();
        }
      );
    } catch (err) {
      console.error("Failed to create new post: ", err);
    }
  };

  submitPost = () => {
    axios({
      url: "/api/posts",
      method: "POST",
      data: this.state.data,
    })
      .then((res) => {
        this.setState({
          snackbar: {
            open: true,
            severity: res.status === 200 ? "success" : "error",
            msg:
              res.status === 200
                ? "Success. Thanks for sharing!"
                : "Unable to submit your post. Please try again.",
          },
        });
      })
      .catch((error) => {
        console.error("Failed to submit post: ", error);
        this.setState({
          snackbar: {
            open: true,
            severity: "error",
            msg: "There was an error submitting your post. Please try again.",
          },
        });
      });
    this.setState({
      active: false,
      message: "",
      data: null,
    });
  };

  render() {
    const { classes, chosen } = this.props;

    return (
      <MuiThemeProvider theme={lightTheme}>
        <Snackbar
          open={this.state.snackbar.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <Alert
            severity={this.state.snackbar.severity}
            onClose={this.handleClose}
            variant="filled"
            style={{ fontWeight: "300", textTransform: "none", maxWidth: 500 }}
          >
            {this.state.snackbar.msg}
          </Alert>
        </Snackbar>
        {this.state.active && (
          <div className={classes.container}>
            {this.state.active ? (
              <div>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  style={{ marginBottom: "25px" }}
                >
                  <Grid item xs={2} md={2} />
                  <Grid item xs={8} md={8}>
                    <Grid
                      container
                      direction="row"
                      spacing={4}
                      justify="center"
                      alignItems="center"
                      className={classes.songContainer}
                    >
                      <Tooltip
                        placement="bottom"
                        title={<p className={classes.tooltip}>Delete song</p>}
                      >
                        <CancelIcon
                          className={classes.close}
                          onClick={() => this.deleteChosen()}
                        />
                      </Tooltip>
                      <Grid item xs={2} md={2}>
                        <img
                          className={classes.songImg}
                          src={chosen.album.images[0].url}
                          alt="Track Art"
                        />
                      </Grid>
                      <Grid item xs={4} md={4}>
                        {chosen.name.length > TITLE_SUBSTR ? (
                          <Tooltip
                            placement="bottom"
                            title={
                              <p className={classes.tooltip}>{chosen.name}</p>
                            }
                          >
                            <Typography variant="subtitle1" color="primary">
                              {chosen.name.substring(0, TITLE_SUBSTR) + "..."}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="subtitle1" color="primary">
                            {chosen.name}
                          </Typography>
                        )}
                        <Typography variant="body1" color="secondary">
                          {chosen.artists[0].name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={3}>
                        {chosen.album.name.length > ALBUM_SUBSTR ? (
                          <Tooltip
                            placement="bottom"
                            title={
                              <p className={classes.tooltip}>
                                {chosen.album.name}
                              </p>
                            }
                          >
                            <Typography variant="subtitle1" color="primary">
                              {chosen.album.name.substring(0, ALBUM_SUBSTR) +
                                "..."}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="subtitle1" color="primary">
                            {chosen.album.name}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                        {/* edit here for adding album, artist, podcast, etc. */}
                        {chosen.type === "track" ? (
                          <Tooltip
                            placement="bottom"
                            title={
                              <p className={classes.tooltip}>Song length</p>
                            }
                          >
                            <Typography variant="subtitle1" color="secondary">
                              {this.millisToMinutesAndSeconds(
                                chosen.duration_ms
                              )}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="subtitle1" color="secondary">
                            {chosen.release_date}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={1} md={1} style={{ padding: "0px" }}>
                        <a href={chosen.external_urls.spotify} target="_blank">
                          <Tooltip
                            placement="bottom"
                            title={
                              <p className={classes.tooltip}>More song info</p>
                            }
                          >
                            <MoreVertIcon className={classes.more} />
                          </Tooltip>
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="body1" color="textPrimary" style={{ marginLeft: "15px" }}>
                      {this.state.currTime}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div style={{ display: "none" }} />
            )}
            <form className={classes.formGroup} onSubmit={this.createPost}>
              <textarea
                className={classes.textArea}
                id="exampleFormControlTextarea2"
                rows="3"
                type="text"
                maxLength="200"
                name="message"
                value={this.state.message}
                onChange={this.handleInputChange}
                required
              ></textarea>

              <FormControl className={classes.tagsForm}>
                <InputLabel id="tags">Tags</InputLabel>
                <Tooltip
                  placement="left"
                  title={<p className={classes.tooltip}> Add up to 3 tags</p>}
                >
                  <Select
                    labelId="tags"
                    id="post tags"
                    multiple
                    value={this.state.tags}
                    onChange={this.handleTagChange}
                    input={<Input id="post tags" />}
                    renderValue={(selected) => (
                      <div className={classes.tags}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.tag}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {tags.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
              </FormControl>

              <button
                className={classes.postBtn}
                style={{
                  pointerEvents: this.state.message.trim() ? "" : "none",
                  opacity: this.state.message.trim() ? "1" : "0.7",
                }}
              >
                Post
              </button>
            </form>
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

PostBox.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  chosen: PropTypes.object,
};

export default withStyles(styles)(PostBox);
