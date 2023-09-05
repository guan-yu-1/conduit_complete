import * as articleTypes from "@types/articleTypes";
import * as profileTypes from "@types/profileTypes";
import mapArrayToDictionary from "@utils/mapArrayToDictionary";

// 初始状态
const initialState = {
  // 文章详情
  article: {
    // 文章详情数据
    result: {},
    // 记录请求加载状态
    status: "idle",
    // 记录请求加载错误信息
    error: null,
  },
  // 文章评论列表
  comments: {
    result: {},
    status: "idle",
    error: null,
  },
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    // 获取文章详情
    case articleTypes.REQUEST_ARTICLE_BY_SLUG:
      return {
        ...state,
        article: {
          ...state.article,
          result: {},
          status: "loading",
          error: null,
        },
      };
    // 获取文章详情成功
    case articleTypes.REQUEST_ARTICLE_BY_SLUG_SUCCESS:
      return {
        ...state,
        article: {
          ...state.article,
          status: "success",
          error: null,
          result: action.payload.article,
        },
      };
    // 获取文章详情失败
    case articleTypes.REQUEST_ARTICLE_BY_SLUG_ERROR:
      return {
        ...state,
        article: {
          ...state.article,
          status: "error",
          error: action.error,
          result: {},
        },
      };
    // 更新文章
    case articleTypes.UPDATE_ARTICLE:
      if (state.article.result.slug !== action.payload.article.slug)
        return state;
      return {
        ...state,
        article: {
          ...state.article,
          result: {
            ...action.payload.article,
          },
        },
      };
    // 更新文章作者
    case profileTypes.UPDATE_PROFILE:
      return {
        ...state,
        article: {
          ...state.article,
          result: {
            ...state.article.result,
            author: action.payload.profile,
          },
        },
      };
    // 获取文章评论列表
    case articleTypes.REQUEST_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          result: {},
          status: "loading",
          error: null,
        },
      };
    // 获取文章评论列表成功
    case articleTypes.REQUEST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          status: "success",
          error: null,
          result: mapArrayToDictionary(action.payload.comments),
        },
      };
    // 获取文章评论列表失败
    case articleTypes.REQUEST_COMMENTS_ERROR:
      return {
        ...state,
        comments: {
          ...state.comments,
          status: "error",
          error: action.error,
          result: {},
        },
      };
    // 更新评论列表
    case articleTypes.UPDATE_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          result: {
            ...state.comments.result,
            [action.payload.comment.id]: action.payload.comment,
          },
        },
      };
    // 删除评论
    case articleTypes.DELETE_COMMENT:
      const result = {
        ...state.comments.result,
      };
      delete result[action.payload.id];
      return {
        ...state,
        comments: {
          ...state.comments,
          result,
        },
      };
    // 重置文章详情
    case articleTypes.RESET_ARTICLE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
