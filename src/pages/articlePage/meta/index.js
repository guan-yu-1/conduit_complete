import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import classNames from "classnames";
import withFavorite from "@src/common/withFavorite";
import FollowAuthor from "@src/common/FollowAuthor";
import DeleteArticleButton from "@pages/articlePage/meta/delete";
import { withRouter } from "react-router-dom";
import { resetArticleCreator } from "@creators/articleCreators";

class ArticleMeta extends React.Component {
  // 构造函数
  constructor() {
    super();
    // 使以下方法中的 this 关键字指向当前类的实例
    this.onArticleDeleted = this.onArticleDeleted.bind(this);
  }
  // 渲染关注用户、点赞文章按钮
  followAndFavoriteButtons() {
    // 获取文章对象
    const { article, favorite, favoriteRequestStatus } = this.props;
    // 渲染按钮视图
    return (
      <>
        <FollowAuthor
          render={(state, onFollow) => (
            <button
              className={classNames("btn btn-sm", {
                "btn-outline-secondary": !article.result.author.following,
                "btn-secondary": article.result.author.following,
                disabled: state.followRequestStatus === "loading",
              })}
              onClick={() => onFollow(article.result)}
            >
              <i className="ion-plus-round"></i>
              &nbsp; {article.result.author.following
                ? "UnFollow"
                : "Follow"}{" "}
              {article.result.author.username}
            </button>
          )}
        />
        &nbsp;
        <button
          className={classNames("btn btn-sm", {
            "btn-outline-primary": !article.result.favorited,
            "btn-primary": article.result.favorited,
            disabled: favoriteRequestStatus === "loading",
          })}
          onClick={() => favorite(article.result)}
        >
          <i className="ion-heart"></i>
          &nbsp; Favorite Post{" "}
          <span className="counter">({article.result.favoritesCount})</span>
        </button>
      </>
    );
  }
  // 渲染删除文章、编辑文章按钮
  deleteAndEditButtons() {
    // 获取文章状态
    const { article } = this.props;
    // 渲染视图
    return (
      <>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() =>
            this.props.history.push(`/editor/${article.result.slug}`)
          }
        >
          <i className="ion-edit"></i>
          &nbsp; Edit Article
        </button>
        &nbsp;&nbsp;
        <DeleteArticleButton
          slug={article.result.slug}
          onArticleDeleted={this.onArticleDeleted}
        />
      </>
    );
  }
  // 文章删除成功后做的事情
  onArticleDeleted() {
    const { history, dispatch } = this.props;
    // 文章删除成功后跳转到首页
    history.replace("/");
    // 清空本地文章详情数据
    dispatch(resetArticleCreator());
  }
  // 渲染作者信息
  author() {
    // 获取文章信息
    const { article } = this.props;
    return (
      <>
        <a href="">
          <img src={article.result.author.image} alt="" />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.result.author.username}
          </a>
          <span className="date">
            {dateFormat(article.result.updatedAt, "yyyy-mm-dd")}
          </span>
        </div>
      </>
    );
  }
  // 渲染视图
  render() {
    // 获取文章对象
    const { article, user } = this.props;
    // 在文章详情数据没有获取成功之前不要渲染当前组件
    if (article.status !== "success") return null;
    // 渲染组件
    return (
      <div className="article-meta">
        {/* 渲染用户信息 */}
        {this.author()}
        {/* 检测当前文章是否由当前登录用户发布 */}
        {user.token && user.username === article.result.author.username
          ? this.deleteAndEditButtons()
          : this.followAndFavoriteButtons()}
      </div>
    );
  }
}

// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 获取文章状态
  article: state.articleReducer.article,
  // 获取用户信息
  user: state.userReducer.user,
});

export default withRouter(withFavorite(connect(mapStateToProps)(ArticleMeta)));
