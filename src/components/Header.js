import React from "react";
import { Header as AntdHeader } from "antd/lib/layout/layout";
import "./Header.css";

export default class Header extends React.Component {
  root = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <AntdHeader className="header">
        <div className="header">
          <div className="header-title" onClick={this.root}>
            MyKart
          </div>
          <div className="search-bar">{this.props.children}</div>
        </div>
      </AntdHeader>
    );
  }
}
