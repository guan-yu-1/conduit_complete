import * as articleTypes from "@types/articleTypes";

// 设置高亮选项卡名称
export const setupActiveTabNameCreator = (activeTabName) => ({
  type: articleTypes.SETUP_ACTIVE_TAB_NAME,
  payload: { activeTabName },
});

// 获取文章列表
export const requestArticlesCreator = (http) => async (dispatch) => {
  // 更新请求状态
  dispatch({ type: articleTypes.REQUEST_ARTICLES });
  // 捕获错误
  try {
    // 发送请求获取文章列表
    const response = await http();
    // 更新请求状态、存储文章列表
    return dispatch({
      type: articleTypes.REQUEST_ARTICLES_SUCCESS,
      payload: { articles: response.articles },
    });
  } catch (error) {
    // 更新请求状态、存储错误信息
    return Promise.reject(
      dispatch({
        type: articleTypes.REQUEST_ARTICLES_ERROR,
        error: error.response?.data.errors,
      })
    );
  }
};

// 更新文章
export const updateArticleCreator = (article) => {
  return {
    type: articleTypes.UPDATE_ARTICLE,
    payload: {
      article,
    },
  };
};

// 根据 slug 获取文章详情
export const requestArticleBySlugCreator = (http) => async (dispatch) => {
  // 更新加载状态
  dispatch({ type: articleTypes.REQUEST_ARTICLE_BY_SLUG });
  // 捕获错误
  try {
    // 发送请求获取文章详情
    const response = await http();
    // 更新加载状态 保存文章详情
    return dispatch({
      type: articleTypes.REQUEST_ARTICLE_BY_SLUG_SUCCESS,
      payload: { article: response.article },
    });
  } catch (error) {
    // 更新加载状态 保存错误信息
    return Promise.reject(
      dispatch({
        type: articleTypes.REQUEST_ARTICLE_BY_SLUG_ERROR,
        error: error.response?.data.errors,
      })
    );
  }
};

// 获取评论列表
export const requestCommentsCreator = (http) => async (dispatch) => {
  // 更新请求状态
  dispatch({ type: articleTypes.REQUEST_COMMENTS });
  // 捕获错误
  try {
    // 发送请求获取评论列表
    const response = await http();
    // 更新请求状态保存评论列表
    return dispatch({
      type: articleTypes.REQUEST_COMMENTS_SUCCESS,
      payload: { comments: response.comments },
    });
  } catch (error) {
    // 更新请求状态保存错误信息
    return Promise.reject(
      dispatch({
        type: articleTypes.REQUEST_COMMENTS_ERROR,
        error: error.response?.data.errors,
      })
    );
  }
};

// 更新评论列表
export const updateCommentsCreator = (comment) => ({
  type: articleTypes.UPDATE_COMMENTS,
  payload: { comment },
});

// 删除评论
export const deleteCommentCreator = (id) => ({
  type: articleTypes.DELETE_COMMENT,
  payload: { id },
});

// 重置文章详情
export const resetArticleCreator = () => ({
  type: articleTypes.RESET_ARTICLE,
});
