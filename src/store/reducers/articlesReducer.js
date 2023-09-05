import * as articleTypes from "@types/articleTypes";
import mapArrayToDictionary from "@utils/mapArrayToDictionary";

// 初始状态
const initialState = {
  // 高亮选项卡名称
  activeTabName: "",
  // 文章列表
  articles: {
    result: {},
    status: "idle",
    error: null,
  },
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    // 设置高亮选项卡名称
    case articleTypes.SETUP_ACTIVE_TAB_NAME:
      return {
        ...state,
        activeTabName: action.payload.activeTabName,
      };
    // 获取文章列表
    case articleTypes.REQUEST_ARTICLES:
      return {
        ...state,
        articles: {
          ...state.articles,
          result: {},
          status: "loading",
          error: null,
        },
      };
    // 获取文章列表成功
    case articleTypes.REQUEST_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: {
          ...state.articles,
          result: mapArrayToDictionary(action.payload.articles, "slug"),
          status: "success",
          error: null,
        },
      };
    // 获取文章列表失败
    case articleTypes.REQUEST_ARTICLES_ERROR:
      return {
        ...state,
        articles: {
          ...state.articles,
          status: "error",
          error: action.error,
        },
      };
    // 更新文章
    case articleTypes.UPDATE_ARTICLE:
      // 判断要更新的文章是否在列表中
      if (
        typeof state.articles.result[action.payload.article.slug] ===
        "undefined"
      )
        return state;
      // 更新状态
      return {
        ...state,
        articles: {
          ...state.articles,
          result: {
            ...state.articles.result,
            [action.payload.article.slug]: action.payload.article,
          },
        },
      };
    default:
      return state;
  }
}
