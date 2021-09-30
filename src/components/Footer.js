import React from "react";
import { Footer as AntdFooter } from "antd/lib/layout/layout";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <AntdFooter className="footer">
        <p>Made with &hearts;</p>
        <p>by Eesita</p>
      </AntdFooter>
    );
  }
}
