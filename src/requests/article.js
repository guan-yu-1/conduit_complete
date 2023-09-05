import RequestManager from "@utils/request";

// 获取文章列表
export function articlesRequest(params = {}) {
  return RequestManager.instance.request({ url: "/articles", params });
}

// 获取当前用户关注的作者发布的文章列表
export function followAuthorArticlesRequest() {
  return RequestManager.instance.request({ url: "/articles/feed" });
}

// 文章点赞
export function favoriteRequest(slug) {
  return RequestManager.instance.request({
    url: `/articles/${slug}/favorite`,
    method: "post",
  });
}

// 取消文章点赞
export function unFavoriteRequest(slug) {
  return RequestManager.instance.request({
    url: `/articles/${slug}/favorite`,
    method: "delete",
  });
}

// 根据文章 slug 获取文章详情
export function articleBySlugRequest(slug) {
  return RequestManager.instance.request({ url: `/articles/${slug}` });
}

// 获取文章评论列表
export function commentsRequest(slug) {
  return RequestManager.instance.request({ url: `/articles/${slug}/comments` });
}

// 发表文章评论
export function publishCommentRequest(slug, body) {
  return RequestManager.instance.request({
    url: `/articles/${slug}/comments`,
    method: "post",
    data: {
      comment: { body },
    },
  });
}

// 删除评论
export function deleteCommentRequest(slug, id) {
  return RequestManager.instance.request({
    url: `/articles/${slug}/comments/${id}`,
    method: "delete",
  });
}

// 发布文章
export function publishArticleRequest(article) {
  return RequestManager.instance.request({
    url: "/articles",
    method: "post",
    data: { article },
  });
}

// 删除文章
export function deleteArticleRequest(slug) {
  return RequestManager.instance.request({
    url: `/articles/${slug}`,
    method: "delete",
  });
}

// 修改发布文章
export function updateArticleRequest(slug, article) {
  return RequestManager.instance.request({
    url: `/articles/${slug}`,
    method: "put",
    data: { article },
  });
}
