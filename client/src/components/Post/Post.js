import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { MDBCol, MDBRow } from "mdbreact";
import { Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
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
    textAlign: "center"
  },
  user: {
  },
  userImg: {
    width: "100px",
    height: "auto",
    margin: "auto",
    borderRadius: "3px"
  },
  like: {
    cursor: "pointer",
    marginTop: "10px",
    width: "35px",
    height: "auto"
  },
  songContainer: {
    width: "95%",
    margin: "auto",
    marginBottom: "15px",
    padding: "15px",
    backgroundColor: "#2B2B2C",
    borderRadius: "5px",
    boxShadow: "0 10px 7px -7px #2B2B2C",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      width: "75%"
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
    marginTop: "25px"
  },
  tags: {
    color: "#17A0FB",
    display: "inline",
    marginRight: "8px",
    textDecoration: "underline"
  },
  comments: {
    color: "#17A0FB"
  }
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
    fontFamily: `"Rubik", "Helvetica", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subtitle1: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px"
    },
  }
});

const Post = (props) => {
  const { classes, data, user } = props;

  function deleteLike() {
    ;
  }

  function submitLike() {
    ;
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
            <li
              key={index}
              className={classes.tags}
            >#{tag}</li>
          )
        })}
      </ul>
    )
  }

  return (
    <MuiThemeProvider theme={lightTheme}>
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
            <Typography variant="subtitle1" color="textPrimary">
              {data.user.name}
            </Typography>
            {data.likes.includes(user.id) ? (
              <FavoriteIcon
                className={classes.like}
                style={{ color: "#1EDD88" }}
                onClick={() => deleteLike()}
              />
            ) : (
              <FavoriteBorderIcon
                className={classes.like}
                onClick={() => submitLike()}
              />
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
                <a href={data.post.url} target="_blank">
                <Grid
                  container
                  direction="row"
                  spacing={8}
                  justify="center"
                  alignItems="center"
                  className={classes.songContainer}
                >
                  <Grid item xs={2} md={2}>
                    <img className={classes.songImg} src={data.post.image} />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography variant="subtitle1" color="primary">
                      {data.post.name}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {data.post.artist}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography variant="subtitle1" color="primary">
                      {data.post.album}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="subtitle1" color="secondary">
                      {millisToMinutesAndSeconds(data.post.duration)}
                    </Typography>
                  </Grid>
                </Grid>
                </a>
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
                <Typography variant="subtitle1" color="textPrimary">
                  {data.text}
                </Typography>
              </Grid>
              <Grid item xs={3} md={3}>
                {/* tags, comments */}
                <Typography variant="body1">{displayTags(data.tags)}</Typography>
                {/* <Typography variant="body1">{<Comments comments={data.comments} />}</Typography> */}
              </Grid>
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
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
