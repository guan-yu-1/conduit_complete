import RequestManager from "@utils/request";

export function tagsRequest() {
  return RequestManager.instance.request({ url: "/tags" });
}
