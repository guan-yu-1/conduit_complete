import * as tagTypes from "@types/tagTypes";

const initialState = {
  // 标签列表
  tags: {
    result: [],
    status: "idle",
    error: null,
  },
  // 选中的标签名称
  activeTagName: "",
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    // 获取标签列表
    case tagTypes.REQUEST_TAGS:
      return {
        ...state,
        tags: {
          ...state.tags,
          result: [],
          status: "loading",
          error: null,
        },
      };
    // 获取标签列表成功
    case tagTypes.REQUEST_TAGS_SUCCESS:
      return {
        ...state,
        tags: {
          ...state.tags,
          result: action.payload.tags,
          status: "success",
          error: null,
        },
      };
    // 获取标签列表失败
    case tagTypes.REQUEST_TAGS_ERROR:
      return {
        ...state,
        tags: {
          ...state.tags,
          result: [],
          status: "error",
          error: action.error,
        },
      };
    // 设置选中的标签名称
    case tagTypes.SETUP_ACTIVE_TAG_NAME:
      return {
        ...state,
        activeTagName: action.payload.activeTagName,
      };
    default:
      return state;
  }
}
