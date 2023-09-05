import React from "react";
import { connect } from "react-redux";
import CommentItem from "@pages/articlePage/comment/item";

class CommentList extends React.Component {
  render() {
    // 获取文章评论列表
    const { comments } = this.props;
    // 组件还没挂载完成数据还没开始获取
    if (comments.status === "idle") return null;
    // 如果正在获取评论列表数据
    if (comments.status === "loading")
      return <div>loading article comments...</div>;
    // 获取评论列表数组
    const commentsArray = Object.values(comments.result);
    // 暂无评论
    if (commentsArray.length === 0) return <div>暂无评论</div>;
    // 渲染评论列表
    return commentsArray.map((comment) => (
      <CommentItem key={comment.id} comment={comment} />
    ));
  }
}

// 从 store 中获取状态
const mapStateToProps = (state) => ({
  // 从 store 中获取文章评论列表
  comments: state.articleReducer.comments,
});

export default connect(mapStateToProps)(CommentList);
