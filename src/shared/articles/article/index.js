import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withFavorite from "@src/common/withFavorite";

class Article extends React.Component {
  render() {
    // 获取文章对象
    const { article, favoriteRequestStatus, favorite } = this.props;
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a>
            <img src={article.author.image} alt="" />
          </a>
          <div className="info">
            <a className="author">{article.author.username}</a>
            <span className="date">{article.createdAt}</span>
          </div>
          <button
            onClick={() => favorite(article)}
            className={classNames("btn  btn-sm pull-xs-right", {
              "btn-outline-primary": !article.favorited,
              "btn-primary": article.favorited,
              disabled: favoriteRequestStatus === "loading",
            })}
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
        <Link className="preview-link" to={`/article/${article.slug}`}>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
          <span>Read more...</span>
        </Link>
      </div>
    );
  }
}

export default withFavorite(connect()(Article));
