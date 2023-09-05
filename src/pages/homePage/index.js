import React from "react";
import Banner from "@pages/homePage/banner";
import MainView from "@pages/homePage/mainView";
import Sidebar from "@pages/homePage/sidebar";
import { Helmet } from "react-helmet";

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Helmet>
          <title>conduit - Home Page</title>
          <meta name="description" content="a place to share knowledge" />
        </Helmet>
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <MainView />
            </div>
            <div className="col-md-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
