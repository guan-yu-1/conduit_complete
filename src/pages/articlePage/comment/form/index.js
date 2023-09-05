import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { publishCommentRequest } from "@requests/article";
import classNames from "classnames";
import { updateCommentsCreator } from "@creators/articleCreators";

class CommentForm extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 组件状态
    this.state = {
      // 记录用户输入的评论内容
      comment: "",
      // 发布评论请求的请求状态
      publishCommentRequestStatus: "idle",
      // 发布评论请求的错误信息
      publishCommentRequestError: null,
    };
    // 使以下方法中的 this 关键字指向当前类的实例
    this.publishComment = this.publishComment.bind(this);
  }
  // 用户未登录时渲染的视图
  unauthorized() {
    return (
      <p>
        <Link to="/login">Sign in</Link>
        &nbsp;or&nbsp;
        <Link to="/register">sign up</Link>
        &nbsp;to add comments on this article.
      </p>
    );
  }
  // 发布评论
  async publishComment(event) {
    // 阻止表单默认提交的跳转行为
    event.preventDefault();
    // 防止重复发送请求
    if (this.state.publishCommentRequestStatus === "loading") return;
    // 获取文章状态
    const { article, dispatch } = this.props;
    // 如果文章 slug 不存在, 阻止程序继续执行
    if (typeof article.result.slug === "undefined") return;
    // 更新请求状态
    this.setState({
      publishCommentRequestStatus: "loading",
      publishCommentRequestError: null,
    });
    // 捕获错误
    try {
      // 发送请求
      const response = await publishCommentRequest(
        article.result.slug,
        this.state.comment
      );
      // 保存评论
      dispatch(updateCommentsCreator(response.comment));
      // 更新请求状态
      this.setState({
        comment: "",
        publishCommentRequestStatus: "success",
        publishCommentRequestError: null,
      });
    } catch (error) {
      // 更新请求状态记录错误信息
      this.setState({
        publishCommentRequestStatus: "error",
        publishCommentRequestError: error.response?.data.errors,
      });
    }
  }
  // 用于登录后渲染的视图
  form() {
    // 获取文章状态
    const { article } = this.props;
    return (
      <form className="card comment-form" onSubmit={this.publishComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows="3"
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
          ></textarea>
        </div>
        <div className="card-footer">
          <img
            src={article.result.author?.image}
            className="comment-author-img"
            alt=""
          />
          <button
            className={classNames("btn btn-sm btn-primary", {
              disabled: this.state.publishCommentRequestStatus === "loading",
            })}
          >
            {this.state.publishCommentRequestStatus === "loading"
              ? "publishing..."
              : "Post Comment"}
          </button>
        </div>
      </form>
    );
  }
  // 渲染视图
  render() {
    // 获取用户状态
    const { user } = this.props;
    // 如果用户登录渲染发表评论的表单否则渲染登录提示信息
    return user.token ? this.form() : this.unauthorized();
  }
}
// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 从 store 对象中获取用户状态
  user: state.userReducer.user,
  // 获取文章状态
  article: state.articleReducer.article,
});

export default connect(mapStateToProps)(CommentForm);
