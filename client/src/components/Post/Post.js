import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol, MDBRow } from "mdbreact";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const styles = (theme) => ({
  container: {
    width: "100%",
    margin: "auto",
    padding: "25px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "2px solid #E0E0E0",
    textAlign: "center",
  },
  close: {
    position: "absolute",
    width: "20px",
    height: "auto",
    cursor: "pointer",
    margin: "5px",
    color: "#2B2B2C"
  },
  user: {},
  userImg: {
    width: "100px",
    height: "auto",
    margin: "auto",
    borderRadius: "3px",
  },
  like: {
    cursor: "pointer",
    marginTop: "10px",
    width: "35px",
    height: "auto",
  },
  songContainer: {
    width: "95%",
    margin: "auto",
    marginBottom: "15px",
    padding: "15px",
    backgroundColor: "#2B2B2C",
    borderRadius: "5px",
    boxShadow: "0 10px 8px -8px #2B2B2C",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      width: "75%",
    },
  },
  songImg: {
    display: "flex",
    margin: "auto",
    width: "70px",
    height: "auto",
    borderRadius: "3px",
    [theme.breakpoints.down("md")]: {
      width: "35px",
    },
  },
  textContainer: {
    margin: "auto",
    marginTop: "25px",
  },
  tags: {
    color: "#17A0FB",
    display: "inline",
    marginRight: "8px",
    textDecoration: "underline",
  },
  comments: {
    color: "#17A0FB",
  },
  tooltip: {
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
    textPrimary: { main: "#000000" },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `"Rubik", "Helvetica", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subheading: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
    },
  },
});

const Post = (props) => {
  const { classes, data, user } = props;

  function deletePost() {
    // axios({
    //   url: "/api/posts",
    //   method: "DELETE",
    //   data: data.id
    // })
  }

  function deleteLike() {}

  function submitLike() {}

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

  return (
    <MuiThemeProvider theme={lightTheme}>
      {user.id === data.user.id && (
        <Tooltip
          placement="bottom"
          title={<p className={classes.tooltip}>Delete your post</p>}
        >
          <CancelIcon className={classes.close} onClick={() => deletePost()} />
        </Tooltip>
      )}
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={2} md={2}>
          <MDBCol className={classes.user}>
            {/* profile pic, name, heart icon, likes */}
            <a href={user.link} target="_blank">
              <img
                src={data.user.image}
                alt="User Image"
                className={classes.userImg}
              />
            </a>
            <Typography variant="subheading" color="textPrimary">
              {data.user.name}
            </Typography>
            {data.likes.includes(user.id) ? (
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>Unlike this post</p>}
              >
                <FavoriteIcon
                  className={classes.like}
                  style={{ color: "#1EDD88" }}
                  onClick={() => deleteLike()}
                />
              </Tooltip>
            ) : (
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>Like this post</p>}
              >
                <FavoriteBorderIcon
                  className={classes.like}
                  onClick={() => submitLike()}
                />
              </Tooltip>
            )}
            <Typography variany="body1" color="textPrimary">
              {data.likes.length} Likes
            </Typography>
          </MDBCol>
        </Grid>

        <Grid item xs={10} md={10}>
          <MDBRow>
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
                  spacing={8}
                  justify="center"
                  alignItems="center"
                  className={classes.songContainer}
                >
                  <Grid item xs={2} md={2}>
                    <a href={data.post.url} target="_blank">
                      <img className={classes.songImg} src={data.post.image} />
                    </a>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography variant="subheading" color="primary">
                      {data.post.name}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {data.post.artist}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Typography variant="subheading" color="primary">
                      {data.post.album}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="subheading" color="secondary">
                      {millisToMinutesAndSeconds(data.post.duration)}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <a href={data.post.url} target="_blank">
                      <Tooltip
                        placement="bottom"
                        title={
                          <p className={classes.tooltip}>
                            Click for full song info
                          </p>
                        }
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
          </MDBRow>

          <MDBRow>
            <Grid
              container
              direction="row"
              spacing={0}
              justify="center"
              alignItems="center"
              className={classes.textContainer}
            >
              <Grid item xs={9} md={9}>
                {/* message */}
                <Typography variant="subheading" color="textPrimary">
                  {data.text}
                </Typography>
              </Grid>
              <Tooltip
                placement="bottom"
                title={<p className={classes.tooltip}>Related tags</p>}
              >
                <Grid item xs={3} md={3}>
                  {/* tags, comments */}
                  <Typography variant="body1">
                    {displayTags(data.tags)}
                  </Typography>
                </Grid>
              </Tooltip>
            </Grid>
          </MDBRow>
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
