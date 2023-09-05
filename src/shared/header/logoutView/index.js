import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class LogoutView extends React.Component {
  render() {
    // 获取用户信息
    const { user } = this.props;
    // 如果用户登录渲染 null
    if (user.token) return null;
    // 否则渲染未登录导航视图
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Sign up
          </NavLink>
        </li>
      </ul>
    );
  }
}

// 从 store 中获取状态
const mapStateToProps = (state) => ({
  // 从 store 中获取用户信息
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(LogoutView);
