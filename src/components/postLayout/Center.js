import React from "react";
import { Grid, Image, Text, Button, Like } from "../../elements";
import { history } from "../../redux/configureStore";
import styled from 'styled-components';
import { actionCreators as postActions } from '../../redux/modules/post';
import { useDispatch } from 'react-redux';


const Center = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            {props.is_me && (<Button width="auto" padding="4px" margin="4px"
              _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>)}
            {props.is_me && (<Button width="auto" padding="4px" margin="4px"
              _onClick={() => { dispatch(postActions.deletePostFB(props.id, props)); }}>삭제</Button>)}

            <Like post_id={props.id} />
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid _onClick={() => {
          history.push(`/post/${props.id}`);
        }}>
          <TableHeader>
            <Grid padding="16px" >
              <Text>{props.contents}</Text>
            </Grid>
          </TableHeader>
          <TableHeader>
            <Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </TableHeader>
          <Grid padding="16px">
            <Text margin="0px" bold>
              댓글 {props.comment_cnt}개 좋아요 {props.like_cnt}개
            </Text>
          </Grid>
        </Grid>
      </Grid>


    </React.Fragment>
  );
}

Center.defaultProps = {
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
const TableHeader = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  `;

export default Center;