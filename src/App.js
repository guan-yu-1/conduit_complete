import React from "react";
import AppStoreProvider from "@src/AppStoreProvider";
import AppRouter from "@src/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  render() {
    return (
      <AppStoreProvider>
        <AppRouter />
        <ToastContainer />
      </AppStoreProvider>
    );
  }
}
