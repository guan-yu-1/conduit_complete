import * as tagTypes from "@types/tagTypes";

// 获取标签列表
export const requestTagsCreator = (http) => async (dispatch) => {
  // 更新请求状态
  dispatch({ type: tagTypes.REQUEST_TAGS });
  // 捕获错误
  try {
    // 发送请求 获取标签列表
    const response = await http();
    // 更新请求状态 保存标签列表
    return dispatch({
      type: tagTypes.REQUEST_TAGS_SUCCESS,
      payload: { tags: response.tags },
    });
  } catch (error) {
    // 更新请求桩体 保存错误信息
    return Promise.reject(
      dispatch({
        type: tagTypes.REQUEST_TAGS_ERROR,
        error: error.response?.data.errors,
      })
    );
  }
};

// 设置选中标签名称
export const setupActiveTagNameCreator = (activeTagName) => ({
  type: tagTypes.SETUP_ACTIVE_TAG_NAME,
  payload: { activeTagName },
});
