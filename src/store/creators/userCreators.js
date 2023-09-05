import * as userTypes from "@types/userTypes";

export const saveUserCreator = (user) => ({
  type: userTypes.SAVE_USER,
  payload: { user },
});
