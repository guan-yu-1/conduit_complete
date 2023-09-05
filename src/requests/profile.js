import RequestManager from "@utils/request";

export function followRequest(username) {
  return RequestManager.instance.request({
    url: `/profiles/${username}/follow`,
    method: "post",
  });
}
// 取消关注用户
export function unFollowRequest(username) {
  return RequestManager.instance.request({
    url: `/profiles/${username}/follow`,
    method: "delete",
  });
}
