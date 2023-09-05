import React from "react";
import { followRequest, unFollowRequest } from "@requests/profile";
import { updateProfileCreator } from "@creators/profileCreators";
import { connect } from "react-redux";

class FollowAuthor extends React.Component {
  constructor(props) {
    super(props);
    // 组件状态
    this.state = {
      // 关注用户/取消关注用户请求的请求状态
      followRequestStatus: "idle",
      // 关注用户/取消关注用户请求的错误信息
      followRequestError: null,
    };
    // 使以下方法中的 this 关键字指向当前类的实例
    this.onFollow = this.onFollow.bind(this);
  }
  // 关注或取消关注
  async onFollow(article) {
    // 防止连续发送请求
    if (this.state.followRequestStatus === "loading") return;
    // 获取用户名
    const username = article.author.username;
    // 获取该用户是否已经被关注的标识
    const following = article.author.following;
    // 捕获错误
    try {
      // 更新请求状态
      this.setState({
        followRequestStatus: "loading",
        followRequestError: null,
      });
      // 发送请求
      const response = await (following
        ? unFollowRequest(username)
        : followRequest(username));
      // 更新请求状态
      this.setState({
        followRequestStatus: "success",
        followRequestError: null,
      });
      // 更新文章中的作者信息
      this.props.dispatch(updateProfileCreator(response.profile));
    } catch (error) {
      // 更新请求状态
      this.setState({
        followRequestStatus: "error",
        followRequestError: error.response?.data.errors,
      });
    }
  }
  // 渲染视图
  render() {
    return this.props.render(this.state, this.onFollow);
  }
}

export default connect()(FollowAuthor);
