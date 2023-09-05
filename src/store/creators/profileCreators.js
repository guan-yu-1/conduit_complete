import * as profileTypes from "@types/profileTypes";

export const updateProfileCreator = (profile) => ({
  type: profileTypes.UPDATE_PROFILE,
  payload: { profile },
});
