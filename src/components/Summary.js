import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Button, Input, Form, Radio } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Header from "./Header";
import Footer from "./Footer";
import Bag from "./Bag";
import "./Summary.css";
import { fetchData } from "./AWSFunctions";

export default class Summary extends React.Component {
  componentDidMount() {
    console.log("componentDidMount() of Summary.js executed");
    this.callFetchData();
  }
  callFetchData = async () => {
    console.log("callFetchData of Summary.js executed");
    var bag = await fetchData("bag");
    console.log(bag, "bag from callFetchData - summary");
  };
  render() {
    return (
      <>
        <div className="content-container">
          <Header history={this.props.history}></Header>
          <h1 className="h1">Order Summary</h1>
          <ShoppingTwoTone style={{ fontSize: "300%" }} />
          <hr></hr>
          <br></br>
          <br />
          <div className="center">
            <Bag summary={true} />
          </div>
        </div>
        <footer className="footer--pin">
          <Footer></Footer>
        </footer>
        {/* <Row>
          <Col
            xs={24}
            md={10}
            // lg={12}
          ></Col>
          <Col
            xs={24}
            md={14}
            // lg={12}
          >
            <Row>
              <Form name="basic" autoComplete="off">
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please add your address!"
                    }
                  ]}
                >
                  <Input />
                  <br />
                </Form.Item>
                <Form.Item label="Payment Method">
                  <Radio.Group value={1}>
                    <br />
                    <Radio value={1}>COD</Radio>
                  </Radio.Group>
                </Form.Item>
                <br />
                <br />
              </Form>
            </Row>
            <br />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>
          <Button
            className="ant-btn-success"
            type="primary"
            onClick={() => {
              <Thanks />;
              // if bag is empty display message - bag is empty
              // add product to bag then only you can go to the summary page
            }}
          >
            <strong>Place Order</strong>
          </Button>
        </Row> */}
      </>
    );
  }
}
