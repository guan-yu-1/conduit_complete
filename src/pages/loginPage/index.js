import React from "react";
import { Link, Redirect } from "react-router-dom";
import { loginRequest } from "@requests/auth";
import { connect } from "react-redux";
import { saveUserCreator } from "@creators/userCreators";
import { toast } from "react-toastify";
import classNames from "classnames";

class LoginPage extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 使用组件状态管理表单值
    this.state = {
      // 记录用户在表单中输入的邮件地址和密码
      user: {
        email: "",
        password: "",
      },
      // 记录登录功能的请求状态
      loginRequestStatus: "idle",
      // 记录登录功能的请求错误信息
      loginRequestError: null,
    };
    // 将函数内部的 this 设置当前类的实例对象
    this.onLogin = this.onLogin.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
  }
  // 用户提交登录表单时执行
  async onLogin(event) {
    // 阻止表单默认提交的行为
    event.preventDefault();
    // 防止用户重复点击登录按钮
    if (this.state.loginRequestStatus === "loading") return;
    // 更新登录功能的请求状态
    this.setState({ loginRequestStatus: "loading", loginRequestError: null });
    // 捕获错误
    try {
      // 发送登录请求
      const response = await loginRequest(this.state.user);
      // 更新登录功能的请求状态
      this.setState({ loginRequestStatus: "success", loginRequestError: null });
      // 保存用户信息
      this.props.dispatch(saveUserCreator(response.user));
      // 用户提示
      toast.success("登录成功", { position: "top-center", autoClose: 1000 });
    } catch (error) {
      // 更新登录功能的请求状态
      this.setState({
        loginRequestStatus: "error",
        loginRequestError: error.response?.data.errors,
      });
    }
  }
  // 表单项的值更改时执行
  updateFormState(event) {
    // 将表单值同步到组件状态
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  }
  // 登录表单
  loginForm() {
    // 获取登录请求状态
    const { loginRequestStatus } = this.state;
    // 渲染登录表单
    return (
      <form onSubmit={this.onLogin}>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.user.email}
            onChange={this.updateFormState}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.user.password}
            onChange={this.updateFormState}
          />
        </fieldset>
        <button
          className={classNames("btn btn-lg btn-primary pull-xs-right", {
            disabled: loginRequestStatus === "loading",
          })}
        >
          {loginRequestStatus === "loading" ? "Signing" : "Sign in"}
        </button>
      </form>
    );
  }
  // 渲染登录请求错误信息
  errorMessage() {
    // 获取登录请求状态和登录请求错误信息
    const { loginRequestStatus, loginRequestError } = this.state;
    // 如果没有发生错误阻止程序继续运行
    if (loginRequestStatus !== "error") return;
    // 渲染错误信息
    return (
      <ul className="error-messages">
        {Object.keys(loginRequestError).map((key) => (
          <li key={key}>
            {key} error：
            {loginRequestError[key].map((errorMessage) => (
              <span key={errorMessage}>{errorMessage}</span>
            ))}
          </li>
        ))}
      </ul>
    );
  }
  // 渲染视图的方法
  render() {
    // 获取用户信息
    const { user } = this.props;
    // 用户登录成功后、用户已经处于登录状态, 跳转到首页
    if (user.token)
      return (
        <Redirect to={this.props.history.location.redirectURL || "/"} replace />
      );
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              {this.errorMessage()}
              {this.loginForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// 从 store 对象中获取状态
const mapStateToProps = (state) => ({
  // 从 store 对象中获取用户信息
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(LoginPage);
