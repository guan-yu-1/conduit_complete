import React from "react";
import { Tabs, TabsItem } from "@shared/tabs";
import Articles from "@shared/articles";
import { connect } from "react-redux";
import {
  requestArticlesCreator,
  setupActiveTabNameCreator,
} from "@creators/articleCreators";
import {
  articlesRequest,
  followAuthorArticlesRequest,
} from "@requests/article";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    // 使以下方法中的 this 关键字指向当前类的实例对象
    this.requestArticles = this.requestArticles.bind(this);
    this.requestFollowAuthorArticles =
      this.requestFollowAuthorArticles.bind(this);
  }
  // 组件挂载完成后执行
  componentDidMount() {
    // 如果处于登录状态获取当前用户关注的作者发布的文章列表, 否则获取文章列表
    this.props.token
      ? this.requestFollowAuthorArticles()
      : this.requestArticles();
  }

  // 获取文章列表
  requestArticles() {
    // 获取 dispatch 方法
    const { dispatch } = this.props;
    // 设置高亮选项卡标识
    dispatch(setupActiveTabNameCreator("Global Feed"));
    // 获取文章列表
    dispatch(requestArticlesCreator(articlesRequest));
  }
  // 获取关注者发布的文章列表
  requestFollowAuthorArticles() {
    // 获取 dispatch 方法
    const { dispatch } = this.props;
    // 设置高亮选项卡标识
    dispatch(setupActiveTabNameCreator("Your Feed"));
    // 获取关注者发布的文章列表
    dispatch(requestArticlesCreator(followAuthorArticlesRequest));
  }
  // 渲染视图
  render() {
    // 获取高亮选项卡标识及用户登录凭证
    const { activeTabName, token, articles, activeTagName } = this.props;
    return (
      <>
        <div className="feed-toggle">
          <Tabs>
            {token && (
              <TabsItem
                onClick={this.requestFollowAuthorArticles}
                active={activeTabName === "Your Feed"}
              >
                Your Feed
              </TabsItem>
            )}
            <TabsItem
              onClick={this.requestArticles}
              active={activeTabName === "Global Feed"}
            >
              Global Feed
            </TabsItem>
            {activeTabName === "Tag Feed" && (
              <TabsItem active={true}>{activeTagName}</TabsItem>
            )}
          </Tabs>
        </div>
        <Articles articles={articles} />
      </>
    );
  }
}

// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 从 store 对象中获取选项卡高亮标识
  activeTabName: state.articlesReducer.activeTabName,
  // 获取用户登录标识
  token: state.userReducer.user.token,
  // 获取文章列表
  articles: state.articlesReducer.articles,
  // 获取选中的标签名称
  activeTagName: state.tagsReducer.activeTagName,
});

export default connect(mapStateToProps)(MainView);
