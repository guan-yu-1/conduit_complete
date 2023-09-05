import axios from "axios";
import store from "@store/index";
import { history } from "../AppRouter";

export default class RequestManager {
  // 单例对象
  static _singleton = undefined;
  // 构造函数
  constructor() {
    // 创建新的 axios 实例
    this._instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
    // 添加请求拦截器
    this._instance.interceptors.request.use(this._setupTokenToRequestHeader);
    // 添加响应拦截器
    this._instance.interceptors.response.use(
      this._peelOffAxiosResponse,
      this._unauthorized
    );
  }
  // 用于获取单例对象的静态方法
  static get instance() {
    // 判断单例对象是否存在
    if (typeof RequestManager._singleton === "undefined") {
      // 创建单例对象
      RequestManager._singleton = new RequestManager();
    }
    // 返回单例对象
    return RequestManager._singleton;
  }
  // 请求拦截器 -> 用于将 token 添加到请求头中
  _setupTokenToRequestHeader(config) {
    // 获取状态对象
    const state = store.getState();
    // 获取用户登录凭证
    const token = state.userReducer.user.token;
    // 如果用户登录凭证存在, 将其添加到请求头中
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    // 返回请求配置对象
    return config;
  }
  // 响应拦截器 -> 去除 axios 响应对象, 直接返回服务端数据
  _peelOffAxiosResponse(response) {
    return response.data;
  }
  // 处理未授权
  _unauthorized(error) {
    if (error.response?.status === 401) {
      // 从 location 对象中获取请求路径、查询参数、Hash地址
      // 目的是使用它们拼接完整的回跳地址, 在用户登录成功后使用
      const { pathname, search, hash } = history.location;
      // 跳转到登录页面
      history.push({
        pathname: "/login",
        redirectURL: pathname + search + hash,
      });
    }
    // 将错误传递下去
    return Promise.reject(error);
  }
  // 向外部开放的请求方法
  request(config) {
    return this._instance.request(config);
  }
}
