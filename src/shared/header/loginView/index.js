import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class LoginView extends React.Component {
  render() {
    // 获取用户信息
    const { user } = this.props;
    // 如果 token 不存在渲染 null
    if (!user.token) return null;
    // 否则渲染登录导航视图
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/editor">
            <i className="ion-compose"></i>&nbsp;New Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/settings">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/@${user.username}`}>
            <img src={user.image} className="user-pic" alt="" />
            {user.username}
          </NavLink>
        </li>
      </ul>
    );
  }
}

// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 从 store 对象中获取用户状态
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(LoginView);
