import { combineReducers } from "redux";
import userReducer from "@reducers/userReducer";
import metaReducer from "@reducers/metaReducer";
import articlesReducer from "@reducers/articlesReducer";
import articleReducer from "@reducers/articleReducer";
import tagsReducer from "@reducers/tagsReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userReducer: persistReducer({ key: "userReducer", storage }, userReducer),
  metaReducer,
  articlesReducer,
  tagsReducer,
  articleReducer,
});

export default rootReducer;
