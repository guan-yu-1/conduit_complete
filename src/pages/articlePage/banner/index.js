import React from "react";
import ArticleMeta from "@pages/articlePage/meta";
import { connect } from "react-redux";

class ArticleBanner extends React.Component {
  render() {
    // 获取文章详情数据
    const { article } = this.props;
    // 在文章详情数据没有获取成功之前不要渲染当前组件
    if (article.status !== "success") return null;
    // 渲染组件
    return (
      <div className="banner">
        <div className="container">
          {/* 渲染文章标题 */}
          <h1>{article.result.title}</h1>
          <ArticleMeta />
        </div>
      </div>
    );
  }
}

// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 获取文章状态
  article: state.articleReducer.article,
});

export default connect(mapStateToProps)(ArticleBanner);
