import React from "react";
import { connect } from "react-redux";

class ArticleContent extends React.Component {
  render() {
    // 获取文章详情数据
    const { article } = this.props;
    // 在文章详情数据没有获取成功之前不要渲染当前组件
    if (article.status !== "success") return null;
    // 渲染组件
    return (
      <div className="row article-content">
        <div className="col-md-12">
          <div style={{ marginBottom: 25 }}>{article.result.body}</div>
          <ul className="tag-list">
            {article.result.tagList.map((tag) => (
              <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            ))}
          </ul>
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

export default connect(mapStateToProps)(ArticleContent);
