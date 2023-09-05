import React from "react";
import { connect } from "react-redux";
import {
  requestTagsCreator,
  setupActiveTagNameCreator,
} from "@creators/tagCreators";
import { tagsRequest } from "@requests/tag";
import {
  requestArticlesCreator,
  setupActiveTabNameCreator,
} from "@creators/articleCreators";
import { articlesRequest } from "@requests/article";

class Sidebar extends React.Component {
  // 组件挂载完成后执行
  componentDidMount() {
    // 获取标签列表
    this.props.dispatch(requestTagsCreator(tagsRequest));
  }
  // 点击标签名称时执行
  onTagClick(tag) {
    // 获取 dispatch 方法
    const { dispatch } = this.props;
    // 设置选中标签名称
    dispatch(setupActiveTagNameCreator(tag));
    // 设置高亮选项卡名称
    dispatch(setupActiveTabNameCreator("Tag Feed"));
    // 获取文章列表
    dispatch(requestArticlesCreator(() => articlesRequest({ tag })));
  }
  // 渲染标签列表
  tags() {
    // 获取标签列表
    const { tags } = this.props;
    // 标签列表加载中
    if (tags.status === "loading") return <div>Loading Tags...</div>;
    // 标签列表为空
    if (tags.result.length === 0) return <div>暂无标签</div>;
    // 渲染标签列表
    return (
      <div className="tag-list">
        {tags.result.map((tag) => (
          <a
            key={tag}
            className="tag-pill tag-default"
            onClick={() => this.onTagClick(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    );
  }
  render() {
    return (
      <div className="sidebar">
        <p>Popular Tags</p>
        {this.tags()}
      </div>
    );
  }
}

// 从 store 中获取状态
const mapStateToProps = (state) => ({
  // 获取标签列表
  tags: state.tagsReducer.tags,
});

export default connect(mapStateToProps)(Sidebar);
