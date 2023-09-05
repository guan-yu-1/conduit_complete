import React from "react";
import { connect } from "react-redux";
import {
  articleBySlugRequest,
  publishArticleRequest,
  updateArticleRequest,
} from "@requests/article";
import classNames from "classnames";

class ArticleEditorPage extends React.Component {
  // 组件挂载完成后执行
  componentDidMount() {
    // 获取文章 slug 标识
    const slug = this.props.match.params.slug;
    // 如果文章 slug 标识存在说明当前为修改操作
    if (typeof slug !== "undefined") {
      // 根据 slug 获取文章详情数据
      articleBySlugRequest(slug).then((response) => {
        // 获取文章详情
        const { title, description, body, tagList } = response.article;
        // 更新组件状态
        this.setState({
          article: {
            title,
            description,
            body,
            tagList: tagList.join(","),
          },
        });
      });
    }
  }
  // 构造函数
  constructor(props) {
    super(props);
    // 组件状态
    this.state = {
      // 文章
      article: {
        // 文章标题
        title: "",
        // 文章描述
        description: "",
        // 文章内容
        body: "",
        // 标签列表
        tagList: "",
      },
      // 记录发布文章请求的请求状态
      publishArticleRequestStatus: "idle",
      // 记录发布文章请求的错误信息
      publishArticleRequestError: null,
    };
    // 使以下方法中的 this 关键字指向当前类的实例
    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // 记录用户在表单中输入的文章信息
  updateFormState(event) {
    this.setState({
      article: {
        ...this.state.article,
        [event.target.name]: event.target.value,
      },
    });
  }
  // 表单提交
  async onSubmit(event) {
    // 阻止表单默认提交行文
    event.preventDefault();
    // 防止重复请求
    if (this.state.publishArticleRequestStatus === "loading") return;
    // 更新请求状态
    this.setState({
      publishArticleRequestStatus: "loading",
      publishArticleRequestError: null,
    });
    // 在路由中获取文章 slug 标识
    const slug = this.props.match.params.slug;
    // 用于存储服务端的响应数据
    let response = null;
    // 即将传递到服务端的 article 请求参数
    const article = {
      ...this.state.article,
      tagList: this.state.article.tagList.split(","),
    };
    // 捕获错误
    try {
      // 通过 slug 判断当前是修改发布文章还是发布文章
      if (typeof slug !== "undefined") {
        // 修改发布文章
        response = await updateArticleRequest(slug, article);
      } else {
        // 发布新文章
        response = await publishArticleRequest(article);
      }
      // 更新请求状态
      this.setState({
        publishArticleRequestStatus: "success",
        publishArticleRequestError: null,
      });
      // 文章发布成功跳转到文章详情页面
      this.props.history.push(`/article/${response.article.slug}`);
    } catch (error) {
      // 更新请求状态
      this.setState({
        publishArticleRequestStatus: "error",
        publishArticleRequestError: error.response?.data.errors,
      });
    }
  }
  // 渲染错误信息
  errorMessage() {
    // 获取发布文章请求的请求状态及错误信息
    const { publishArticleRequestStatus, publishArticleRequestError } =
      this.state;
    // 如果没有错误发生 渲染null
    if (publishArticleRequestStatus !== "error") return;
    // 渲染错误信息
    return (
      <ul className="error-messages">
        {Object.keys(publishArticleRequestError).map((key) => (
          <li key={key}>
            {publishArticleRequestError[key].map((msg) => (
              <span key={msg}>{msg}</span>
            ))}
          </li>
        ))}
      </ul>
    );
  }
  // 渲染发布文章表单
  publishArticleForm() {
    // 获取文章标题、文章描述、文章内容、标签列表, 用于和表单进行绑定
    const { title, description, body, tagList } = this.state.article;
    // 获取发布文章请求的请求状态
    const { publishArticleRequestStatus } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              value={title}
              onChange={this.updateFormState}
              name="title"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              onChange={this.updateFormState}
              value={description}
              name="description"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows="8"
              placeholder="Write your article (in markdown)"
              onChange={this.updateFormState}
              value={body}
              name="body"
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
              onChange={this.updateFormState}
              value={tagList}
              name="tagList"
            />
            <div className="tag-list"></div>
          </fieldset>
          <button
            className={classNames("btn btn-lg pull-xs-right btn-primary", {
              disabled: publishArticleRequestStatus === "loading",
            })}
            type="submit"
          >
            {publishArticleRequestStatus === "loading"
              ? "publishing..."
              : "publish"}
          </button>
        </fieldset>
      </form>
    );
  }
  // 渲染视图
  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {/* 渲染错误信息 */}
              {this.errorMessage()}
              {/* 渲染用于发布文章的表单 */}
              {this.publishArticleForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ArticleEditorPage);
