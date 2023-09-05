import * as userTypes from "@types/userTypes";

const initialState = {
  // 用户信息
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // 保存用户信息
    case userTypes.SAVE_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
