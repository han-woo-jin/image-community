import React from "react";
import { Grid, Image, Text, Button, Like } from "../elements";
import { history } from "../redux/configureStore";
import Left from './postLayout/Left';
import Right from './postLayout/Right';
import Center from './postLayout/Center';
import { useDispatch } from 'react-redux';

const Post = (props) => {

  return (
    <>
      {props.layout === "center" ? (
        <Grid padding="20px 0px">
          <Center {...props} />
        </Grid>
      ) : props.layout === "right" ? (
        <Grid padding="20px 0px">
          <Right {...props} />
        </Grid>
      ) : (
        <Grid padding="20px 0px">
          <Left {...props} />
        </Grid>
      )}
    </>
  );
}

Post.defaultProps = {
  user_info: {
    user_name: "woo",
    user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7JloDUKI37hsDMe8wP5_A8wP0nL2gQYTiQ&usqp=CAU",
  },
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7JloDUKI37hsDMe8wP5_A8wP0nL2gQYTiQ&usqp=CAU",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;