import React from "react";
import { favoriteRequest, unFavoriteRequest } from "@requests/article";
import { updateArticleCreator } from "@creators/articleCreators";
import { connect } from "react-redux";

const withFavorite = (Component) => {
  class Favorite extends React.Component {
    // 构造函数
    constructor(props) {
      super(props);
      // 组件状态
      this.state = {
        // 点赞或取消点赞请求的加载状态
        favoriteRequestStatus: "idle",
        // 点赞或取消点赞请求的错误信息
        favoriteRequestError: null,
      };
      // 使以下方法中的 this 关键字指向当前类的实例
      this.favorite = this.favorite.bind(this);
    }
    // 点赞或取消点赞
    async favorite(article) {
      // 如果正在对当前文章进行点赞或取消点赞, 阻止程序继续向下执行防止重复请求
      if (this.state.favoriteRequestStatus === "loading") return;
      // 更新请求加载状态
      this.setState({
        favoriteRequestStatus: "loading",
        favoriteRequestError: null,
      });
      // 捕获错误
      try {
        const response = await (article.favorited
          ? // 取消点赞
            unFavoriteRequest(article.slug)
          : // 为文章点赞
            favoriteRequest(article.slug));
        // 更新文章数据
        this.props.dispatch(updateArticleCreator(response.article));
        // 更新请求加载状态
        this.setState({
          favoriteRequestStatus: "success",
          favoriteRequestError: null,
        });
      } catch (error) {
        console.log(error);
        // 更新请求加载状态
        this.setState({
          favoriteRequestStatus: "error",
          favoriteRequestError: error.response?.data.errors,
        });
      }
    }
    // 渲染视图
    render() {
      return (
        <Component {...this.props} {...this.state} favorite={this.favorite} />
      );
    }
  }
  return connect()(Favorite);
};

export default withFavorite;
