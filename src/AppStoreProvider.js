import React from "react";
import { Provider } from "react-redux";
import store from "@store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// 调用该方法即可将 redux store 中的状态同步到目标位置
const persistor = persistStore(store);

export default class AppStoreProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* 该组件可以延迟组件加载, 直到所有数据已从本地同步回 store */}
        <PersistGate persistor={persistor}>{this.props.children}</PersistGate>
      </Provider>
    );
  }
}
