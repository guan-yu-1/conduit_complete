import React from "react";
import { deleteArticleRequest } from "@requests/article";
import classNames from "classnames";

export default class DeleteArticleButton extends React.Component {
  constructor() {
    super();
    // 组件状态
    this.state = {
      // 记录删除文章的请求状态
      deleteArticleRequestStatus: "idle",
      // 记录删除文章的失败信息
      deleteArticleRequestError: null,
    };
    // 使以下方法中的 this 关键字指向当前类的实例
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  // 删除文章
  async deleteArticle() {
    // 获取要删除的文章 slug 标识
    const { slug, onArticleDeleted } = this.props;
    // 防止请求重复发送
    if (this.state.deleteArticleRequestStatus === "loading") return;
    // 更新请求状态
    this.setState({
      deleteArticleRequestStatus: "loading",
      deleteArticleRequestError: null,
    });
    // 捕获错误
    try {
      // 发送请求删除文章
      await deleteArticleRequest(slug);
      // 更新请求状态
      this.setState({
        deleteArticleRequestStatus: "success",
        deleteArticleRequestError: null,
      });
      // 文章删除后要做的事情
      onArticleDeleted();
    } catch (error) {
      // 更新请求状态
      this.setState({
        deleteArticleRequestStatus: "error",
        deleteArticleRequestError: null,
      });
    }
  }

  render() {
    // 获取删除按钮请求的请求状态
    const { deleteArticleRequestStatus } = this.state;
    return (
      <button
        onClick={this.deleteArticle}
        className={classNames("btn btn-sm btn-outline-primary", {
          disabled: deleteArticleRequestStatus === "loading",
        })}
      >
        <i className="ion-trash-a"></i>
        &nbsp;{" "}
        {deleteArticleRequestStatus === "Delete Article"
          ? "deleting"
          : "Delete Article"}
      </button>
    );
  }
}
