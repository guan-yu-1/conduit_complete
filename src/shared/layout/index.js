import React from "react";
import Header from "@shared/header";
import Footer from "@shared/footer";

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
