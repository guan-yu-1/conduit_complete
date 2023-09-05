import React from "react";
import { connect } from "react-redux";

class Banner extends React.Component {
  render() {
    // 获取用户登录凭证以及应用名称
    const { appName, token } = this.props;
    // 如果用户已经登录, 渲染 null, 即不渲染当前组件
    if (token) return null;
    // 渲染 Banner 视图
    return (
      <div className="banner">
        <div className="container">
          {/* 渲染应用名称 */}
          <h1 className="logo-font">{appName.toLowerCase()}</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    );
  }
}

// 从 redux store 中获取用户登录凭证和应用名称
const mapStateToProps = (state) => ({
  token: state.userReducer.user.token,
  appName: state.metaReducer.appName,
});

export default connect(mapStateToProps)(Banner);
