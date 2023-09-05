import React from "react";
import { Link } from "react-router-dom";
import { registerRequest } from "@requests/auth";
import classNames from "classnames";
import { toast } from "react-toastify";
import { saveUserCreator } from "@creators/userCreators";
import { connect } from "react-redux";

class RegisterPage extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 通过组件状态管理注册表单
    this.state = {
      // 用户在表单中填写的注册信息
      user: {
        username: "",
        email: "",
        password: "",
      },
      // 记录注册请求状态
      registerRequestStatus: "idle",
      // 记录注册请求错误信息
      registerRequestError: null,
    };
    // 更正函数内部 this 指向
    this.updateFormState = this.updateFormState.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }
  // 注册表单提交
  async onRegister(event) {
    // 阻止表单默认提交的行为
    event.preventDefault();
    // 防止请求重复发送
    if (this.state.registerRequestStatus === "loading") return;
    // 更新请求状态
    this.setState({
      registerRequestStatus: "loading",
      registerRequestError: null,
    });
    // 捕获错误
    try {
      // 发送注册请求
      const response = await registerRequest(this.state.user);
      // 更新请求状态
      this.setState({
        registerRequestStatus: "success",
        registerRequestError: null,
      });
      // 保存用户信息
      this.props.dispatch(saveUserCreator(response.user));
      // 消息提示
      toast.success("注册成功", {
        // 自定关闭事件
        autoClose: 600,
        // 位置
        position: toast.POSITION.TOP_CENTER,
      });
      // 注册成功之后跳转到首页
      this.props.history.replace("/");
    } catch (error) {
      // 更新请求状态
      this.setState({
        registerRequestStatus: "error",
        registerRequestError: error.response?.data.errors,
      });
    }
  }
  // 更新表单状态
  updateFormState(event) {
    // 将表单状态更新为用户在表单项中输入的内容
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  }
  // 注册表单
  registerForm() {
    // 获取注册请求状态
    const { registerRequestStatus } = this.state;
    // 渲染注册表单
    return (
      <>
        <form onSubmit={this.onRegister}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              name="username"
              value={this.state.user.username}
              onChange={this.updateFormState}
            />
          </fieldset>
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
          {/* 根据注册状态请求状态显示信息, 注册中显示正在注册、其他情况显示注册 */}
          <button
            className={classNames("btn btn-lg btn-primary pull-xs-right", {
              disabled: registerRequestStatus === "loading",
            })}
          >
            {registerRequestStatus === "loading" ? "Submitting" : " Sign up"}
          </button>
        </form>
      </>
    );
  }
  // 渲染注册错误信息
  errorMessage() {
    // 获取注册请求状态、注册错误信息
    const { registerRequestStatus, registerRequestError } = this.state;
    // 如果没有发生错误的话 什么也不渲染
    if (registerRequestStatus !== "error") return null;
    // 渲染错误提示信息
    return (
      <ul className="error-messages">
        {Object.keys(registerRequestError).map((key) => (
          <li key={key}>
            {key} error：
            {registerRequestError[key].map((errorMessage) => (
              <span key={errorMessage}>{errorMessage}</span>
            ))}
          </li>
        ))}
      </ul>
    );
  }
  // 渲染视图
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>
              {this.errorMessage()}
              {this.registerForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(RegisterPage);
