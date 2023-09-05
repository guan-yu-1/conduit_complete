import React from "react";
import { connect } from "react-redux";
import {
  requestArticleBySlugCreator,
  requestCommentsCreator,
} from "@creators/articleCreators";
import { articleBySlugRequest, commentsRequest } from "@requests/article";
import ArticleBanner from "@pages/articlePage/banner";
import ArticleContent from "@pages/articlePage/content";
import ArticleMeta from "@pages/articlePage/meta";
import { CommentForm, CommentList } from "@pages/articlePage/comment";

class ArticlePage extends React.Component {
  // 组件挂载完成后执行
  componentDidMount() {
    // 获取 dispatch 方法、match 对象
    const { dispatch, match } = this.props;
    // 发送请求获取文章详情数据
    dispatch(
      requestArticleBySlugCreator(() => articleBySlugRequest(match.params.slug))
    );
    // 获取评论列表
    dispatch(requestCommentsCreator(() => commentsRequest(match.params.slug)));
  }
  // 渲染视图的方法
  render() {
    return (
      <div className="article-page">
        <ArticleBanner />
        <div className="container page">
          <ArticleContent />
          <hr />
          <div className="article-actions">
            <ArticleMeta />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentForm />
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ArticlePage);
