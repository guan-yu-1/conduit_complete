import React from "react";
import dateFormat from "dateformat";
import { connect } from "react-redux";
import { deleteCommentRequest } from "@requests/article";
import { deleteCommentCreator } from "@creators/articleCreators";

class CommentItem extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 组件状态
    this.state = {
      // 记录删除评论请求的请求状态
      deleteCommentRequestStatus: "idle",
      // 记录删除评论请求的错误信息
      deleteCommentRequestError: null,
    };
  }
  // 删除评论
  async deleteComment() {
    // 获取评论状态、文章状态
    const { comment, article, dispatch } = this.props;
    // 防止请求重复发送
    if (this.state.deleteCommentRequestStatus === "loading") return;
    // 更新请求状态
    this.setState({
      deleteCommentRequestStatus: "loading",
      deleteCommentRequestError: null,
    });
    // 捕获错误
    try {
      // 发送请求删除评论
      // 评论删除成功后服务端返回空对象
      await deleteCommentRequest(article.result.slug, comment.id);
      // 更新请求状态
      this.setState({
        deleteCommentRequestStatus: "success",
        deleteCommentRequestError: null,
      });
      // 删除本地评论
      dispatch(deleteCommentCreator(comment.id));
    } catch (error) {
      // 更新请求状态
      this.setState({
        deleteCommentRequestStatus: "error",
        deleteCommentRequestError: null,
      });
    }
  }
  render() {
    // 评论对象
    const { comment, user } = this.props;
    // 渲染视图
    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a href="" className="comment-author">
            <img
              src={comment.author.image}
              className="comment-author-img"
              alt=""
            />
          </a>
          &nbsp;
          <a href="" className="comment-author">
            {comment.author.username}
          </a>
          <span className="date-posted">
            {dateFormat(comment.updatedAt, "yyyy-mm-dd")}
          </span>
          {user.token && user.username === comment.author.username && (
            <span className="mod-options">
              <i
                className="ion-trash-a"
                onClick={() => this.deleteComment(comment.id)}
              ></i>
            </span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // 获取用户状态
  user: state.userReducer.user,
  // 获取文章状态
  article: state.articleReducer.article,
});

export default connect(mapStateToProps)(CommentItem);
