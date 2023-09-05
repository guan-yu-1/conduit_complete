import React from "react";

export default class Tabs extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills outline-active">{this.props.children}</ul>
    );
  }
}
