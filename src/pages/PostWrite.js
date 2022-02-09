import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const [layout, setLayout] = React.useState("center");

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const handleLayout = (e) => {
    setLayout(e.target.value);
  };
  const { history } = props;
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents, layout));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, {
      contents: contents, layout: layout
    }));
  }

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      <Grid padding="16px">
        <Text margin="0px" size="24px" bold>
          1
          <Select onChange={handleLayout}>
            <option value="center">중앙</option>
            <option value="left">왼쪽</option>
            <option value="right">오른쪽</option>
          </Select>
        </Text>
      </Grid>
      {layout === "center" ? (
        <>
          <Grid>
            <Grid padding="16px">
              <Input
                value={contents}
                _onChange={changeContents}
                label="게시글 내용"
                placeholder="게시글 작성"
                multiLine
              />
              <Image
                shape="rectangle"
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
            </Grid>
          </Grid>
          <Grid padding="16px">
            {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
          </Grid>
        </>
      ) : layout === "right" ? (
        <>

          <TableHeader>
            <Grid padding="5px">
              <Image
                shape="rectangle"
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
            </Grid>
            <Grid padding="5px">

              <Input
                value={contents}
                _onChange={changeContents}
                placeholder="게시글 작성"
                left
              />

            </Grid>

          </TableHeader>
          <Grid padding="16px">
            {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
          </Grid>

        </>

      ) : (
        <>
          <TableHeader>
            <Grid padding="5px">
              <Input
                value={contents}
                _onChange={changeContents}
                placeholder="게시글 작성"
                left
              />
            </Grid>
            <Grid padding="5px">
              <Image
                shape="rectangle"
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
            </Grid>

          </TableHeader>

          <Grid padding="16px">
            {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
          </Grid>
        </>
      )
      }
    </React.Fragment >
  );
};
const Select = styled.select`
width: 200px;
height: 50px;
`;

const TableHeader = styled.div`
    columns: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  `;

export default PostWrite;