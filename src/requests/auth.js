import RequestManager from "@utils/request";

// 用户注册
export function registerRequest(user) {
  return RequestManager.instance.request({
    url: "/users",
    method: "post",
    data: { user },
  });
}

// 用户登录
export function loginRequest(user) {
  return RequestManager.instance.request({
    url: "/users/login",
    method: "post",
    data: { user },
  });
}
