import React from "react";
import Article from "@shared/articles/article";

export default class Articles extends React.Component {
  render() {
    // 获取文章列表
    const { articles } = this.props;
    // 如果文章列表正在加载, 显示加载状态
    if (articles.status === "loading")
      return <div className="article-preview">loading...</div>;
    // 将文章字典转换为文章数组
    const articlesArray = Object.values(articles.result);
    // 如果没有文章列表数据, 显示用户提示信息
    if (articlesArray.length === 0)
      return (
        <div className="article-preview">No articles are here... yet.</div>
      );
    // 遍历文章列表 调用 Article 组件渲染文章列表
    return articlesArray.map((article) => (
      <Article article={article} key={article.slug} />
    ));
  }
}
