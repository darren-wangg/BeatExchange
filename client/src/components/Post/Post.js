import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol } from "mdbreact";
import {
  Grid,
  Typography,
  Tooltip,
  Snackbar,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

const TITLE_SUBSTR = 45;
const ALBUM_SUBSTR = 40;

const styles = (theme) => ({
  container: {
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    padding: "20px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #DEDEDE",
    textAlign: "center",
  },
  close: {
    position: "absolute",
    width: "15px",
    height: "auto",
    cursor: "pointer",
    margin: "10px",
    color: "#2B2B2C",
  },
  deleteBtn: {
    background: "#1edd88",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "5px",
    margin: "15px 15px 0px 15px",
    "&:hover": {
      backgroundColor: "#1bcb7f",
    },
  },
  userImg: {
    width: "110px",
    height: "auto",
    margin: "auto",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      width: "90px",
    },
  },
  like: {
    cursor: "pointer",
    marginTop: "20px",
    width: "35px",
    height: "auto",
    "&:hover": {
      transform: "scale(1.03)",
      color: "#1bcb7f",
    },
  },
  songContainer: {
    width: "90%",
    margin: "auto",
    backgroundColor: "#2B2B2C",
    borderRadius: "5px",
    boxShadow: "0 5px 5px -5px #2B2B2C",
    textAlign: "left",
    fontSize: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "80%",
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
      maxWidth: "50px",
    },
  },
  textContainer: {
    margin: "20px auto",
  },
  tags: {
    color: "#17A0FB",
    display: "inline",
    marginRight: "7px",
  },
  comments: {
    color: "#17A0FB",
  },
  tooltip: {
    fontWeight: "300",
    fontSize: "0.8rem",
    margin: "10px auto",
  },
  more: {
    width: "30px",
    height: "auto",
    cursor: "pointer",
    color: "#CCCCCC",
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
    primary: { main: "#fff" },
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

const Post = (props) => {
  const { classes, data, user } = props;
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: null,
    msg: null,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function deletePost(id) {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        setSnackbar({
          open: true,
          severity: res.status === 200 ? "success" : "error",
          msg:
            res.status === 200
              ? "Successfully deleted your post."
              : "Unable to delete your post. Please try again.",
        });
      })
      .catch((error) => {
        console.error(error);
        setSnackbar({
          open: true,
          severity: "error",
          msg: "There was an error deleting your post. Please try again.",
        });
      });
    handleDeleteDialogClose();
  }

  function submitLike(id) {
    axios({
      url: `/api/posts/${id}/like`,
      method: "POST",
      data: {
        user: user,
      },
    })
      .then((res) => {
        setSnackbar({
          open: true,
          severity: res.status === 200 ? "success" : "error",
          msg:
            res.status === 200
              ? "Successfully liked this post."
              : "Unable to like this post. Please try again.",
        });
      })
      .catch((error) => {
        console.error(error);
        setSnackbar({
          open: true,
          severity: "error",
          msg: "There was an error liking this post. Please try again.",
        });
      });
  }

  function deleteLike(id) {
    axios({
      url: `/api/posts/${id}/unlike`,
      method: "POST",
      data: {
        user: user,
      },
    })
      .then((res) => {
        setSnackbar({
          open: true,
          severity: res.status === 200 ? "success" : "error",
          msg:
            res.status === 200
              ? "Successfully unliked this post."
              : "Unable to unlike this post. Please try again.",
        });
      })
      .catch((error) => {
        console.error(error);
        setSnackbar({
          open: true,
          severity: "error",
          msg: "There was an error unliking this post. Please try again.",
        });
      });
  }

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function formatDate(date) {
    const format = new Date(date);
    const month = format.getMonth() + 1;
    const day = format.getDate();
    const year = format.getFullYear();
    return month + "/" + day + "/" + year;
  }

  function formatTime(date) {
    const format = new Date(date);
    const hour = format.getHours();
    let minutes = format.getMinutes();
    let time;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hour > 0 && hour < 12) {
      time = hour + ":" + minutes + " AM";
    } else if (hour > 12) {
      time = hour - 12 + ":" + minutes + " PM";
    } else if (hour === 0) {
      time = "12:" + minutes + " AM";
    } else if (hour === 12) {
      time = hour + ":" + minutes + " PM";
    }
    return time;
  }

  function displayTags(tags) {
    return (
      <ul>
        {tags.map((tag, index) => {
          return (
            <li key={index} className={classes.tags}>
              #{tag}
            </li>
          );
        })}
      </ul>
    );
  }

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({
      open: false,
      severity: snackbar.severity,
    });
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <MuiThemeProvider theme={lightTheme}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          variant="filled"
          style={{ fontWeight: "300", textTransform: "none", maxWidth: 500 }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#2b2b2c",
            color: "#FAFAFA",
            width: "500px",
            padding: "15px",
            fontFamily: "Rubik, sans serif",
          },
        }}
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" color="primary">
            Delete Post
            <span role="img" aria-label="trash">
              🗑️
            </span>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" color="primary">
              Are you sure you want to delete this post? It will be deleted
              permanently.
            </Typography>
          </DialogContentText>
          <button
            className={classes.deleteBtn}
            onClick={handleDeleteDialogClose}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #FAFAFA",
            }}
          >
            No
          </button>
          <button
            className={classes.deleteBtn}
            onClick={() => deletePost(data._id)}
          >
            Yes
          </button>
        </DialogContent>
      </Dialog>

      {user.id === data.user.id && (
        <Tooltip
          placement="bottom"
          title={<p className={classes.tooltip}>Delete your post</p>}
        >
          <CancelIcon
            className={classes.close}
            onClick={() => setDeleteDialogOpen(true)}
          />
        </Tooltip>
      )}
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.container}
        tourname="Post"
      >
        <Grid item xs={2} md={2}>
          <MDBCol className={classes.user}>
            {/* profile pic, name, heart icon, likes */}
            <a href={user.link} target="_blank">
              <img
                src={data.user.image}
                alt="User"
                className={classes.userImg}
              />
            </a>
            <Typography variant="subtitle1" color="textPrimary">
              {data.user.name}
            </Typography>
            {data.likes.some((like) => like.id === user.id) ? (
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>Unlike this post</p>}
              >
                <FavoriteIcon
                  className={classes.like}
                  style={{ color: "#1EDD88" }}
                  onClick={() => deleteLike(data._id)}
                />
              </Tooltip>
            ) : (
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>Like this post</p>}
              >
                <FavoriteBorderIcon
                  className={classes.like}
                  onClick={() => submitLike(data._id)}
                />
              </Tooltip>
            )}
            <Typography variant="body1" color="textPrimary">
              {data.likeCount} Likes
            </Typography>
          </MDBCol>
        </Grid>

        <Grid item xs={10} md={10}>
          <Grid
            container
            direction="row"
            spacing={0}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10} md={10}>
              {/* song data */}
              <Grid
                container
                direction="row"
                spacing={4}
                justify="center"
                alignItems="center"
                className={classes.songContainer}
              >
                <Grid item xs={2} md={2}>
                  <a href={data.post.url} target="_blank">
                    <img
                      className={classes.songImg}
                      src={data.post.image}
                      alt="Track Art"
                    />
                  </a>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Typography variant="subtitle1" color="primary">
                    {data.post.name.length > TITLE_SUBSTR ? (
                      <Tooltip
                        placement="bottom"
                        title={
                          <p className={classes.tooltip}>{data.post.name}</p>
                        }
                      >
                        <Typography variant="subtitle1" color="primary">
                          {data.post.name.substring(0, TITLE_SUBSTR) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography variant="subtitle1" color="primary">
                        {data.post.name}
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    {data.post.artist}
                  </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                  {data.post.album.length > ALBUM_SUBSTR ? (
                    <Tooltip
                      placement="bottom"
                      title={
                        <p className={classes.tooltip}>{data.post.album}</p>
                      }
                    >
                      <Typography variant="subtitle1" color="primary">
                        {data.post.album.substring(0, ALBUM_SUBSTR) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="subtitle1" color="primary">
                      {data.post.album}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <Tooltip
                    placement="bottom"
                    title={<p className={classes.tooltip}>Song length</p>}
                  >
                    <Typography variant="subtitle1" color="secondary">
                      {millisToMinutesAndSeconds(data.post.duration)}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={1} md={1} style={{ padding: "0px" }}>
                  <a href={data.post.url} target="_blank">
                    <Tooltip
                      placement="bottom"
                      title={<p className={classes.tooltip}>More song info</p>}
                    >
                      <MoreVertIcon className={classes.more} />
                    </Tooltip>
                  </a>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} md={2}>
              {/* time stamp */}
              <Typography variant="body1" color="textPrimary">
                {formatDate(data.date)}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {formatTime(data.date)}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            spacing={0}
            justify="center"
            alignItems="center"
            className={classes.textContainer}
          >
            <Grid item xs={8} md={8}>
              {/* message */}
              <Typography variant="subtitle1" color="textPrimary">
                {data.text}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              {/* tags, comments */}
              {data.tags.length > 0 && (
                <Typography variant="body1">
                  <Tooltip
                    placement="bottom"
                    title={<p className={classes.tooltip}>Related tags</p>}
                  >
                    {displayTags(data.tags)}
                  </Tooltip>
                </Typography>
              )}
              <Typography variant="body1" style={{ color: "#17A0FB" }}>
                <u>{data.comments.length} comments</u>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
