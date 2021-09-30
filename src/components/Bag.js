import React from "react";
import { Button, Card } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchData, deleteData } from "./AWSFunctions";
import "./Bag.css";

export default class Bag extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      bag_product_quantity: 0
    };
  }

  componentDidMount() {
    // console.log("componentDidMount() xecuted - bag");
    this.callFetchData();
  }

  callFetchData = async () => {
    // console.log("callFetchData xecuted - bag");
    var bag = await fetchData("bag");
    // if (bag) {
    //   this.setState({
    //     items: [...bag]
    //   });
    // }
    this.setState({
      items: [...bag]
    });
  };

  pushToBag = () => {
    this.callFetchData();
  };

  calculateTotal = () => {
    let total = this.state.items.length * 2000;
    return total;
  };

  deleteBagItem = async (id) => {
    await deleteData("bag", id);
    await this.pushToBag();
  };

  render() {
    return (
      <div className="cart">
        {this.state.items.length ? (
          <>
            {this.state.items.map((item) => (
              <Card className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  alt={item.name}
                  src={item.images[0]}
                />
                <div className="cart-parent">
                  <div className="cart-item-info">
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                    </div>
                    <div className="cart-item-cost">₹{item.price}</div>
                  </div>
                </div>
                <Button
                  className="ant-btn-warning"
                  type="primary"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    this.deleteBagItem(item.id);
                  }}
                ></Button>
              </Card>
            ))}
            <div className="total">
              <h2>Total</h2>
              <div className="total-item">
                <div>Quantity</div>
                <div>{this.state.items.length}</div>
              </div>
              <div className="total-item">
                <div>Sub Total</div>
                <div>₹{this.calculateTotal()}</div>
              </div>
              <div className="total-item">
                <div>Shipping</div>
                <div>N/A</div>
              </div>
              <hr></hr>
              <div className="total-item">
                <div>Total</div>
                <div>₹{this.calculateTotal()}</div>
              </div>
            </div>
            {!this.props.summary && (
              <Button
                className="ant-btn-warning proceed-to-bag-button"
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  this.props.history.push("/summary");
                }}
              >
                <strong>Proceed To Bag</strong>
              </Button>
            )}
          </>
        ) : (
          <div className="loading-text">
            Add an item to cart and it will show up here
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}
