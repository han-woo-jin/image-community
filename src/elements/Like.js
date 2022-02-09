import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { realtime } from "../shared/firebase";
import { actionCreators as postActions } from "../redux/modules/post";
import Icon from "./Icon";

const Like = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user?.uid);
  const [is_like, setIsLike] = React.useState(false);

  const likeCheck = () => {
    dispatch(postActions.likeFB(post_id, user_id, is_like));
  };

  React.useEffect(() => {
    const likeDB = realtime.ref(`like/${post_id}/${user_id}`);

    likeDB.on("value", (snapshot) => {
      console.log(snapshot.val()?.is_click);
      setIsLike(snapshot.val()?.is_click);
    });
  }, []);

  return (
    <React.Fragment>
      <button
        onClick={likeCheck}
        style={{ border: "none", backgroundColor: "white" }}
      >
        <Icon></Icon>
      </button>
    </React.Fragment>
  );
};

Like.defaultProps = {
  post_id: "",
};

export default Like;