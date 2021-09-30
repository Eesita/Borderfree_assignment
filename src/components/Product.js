import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Button, Input, Radio, Rate } from "antd";
import { PlusCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header";
import Footer from "./Footer";
import Bag from "./Bag";
import Example from "./Carousel";
// import ControlledCarousel from "./Carousel";
import "./Product.css";
import { fetchData, putData } from "./AWSFunctions";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [], //#1
      addProductToBagIsCalled: false,
      product_id: "",
      product_name: "",
      product_images: [],
      product_sizes: [],
      product_brand: "",
      product_price: 0,
      product_description: "",
      product_rating: 0
    };
    this.BagRef = React.createRef();
    // this.items = [];
  }

  componentDidMount() {
    // console.log("componentDidMount() executed - product");
    this.callFetchData();
  }
  callFetchData = async () => {
    // console.log("callFetchData executed - product");
    var product = await fetchData("product");
    this.setState((previousState) => {
      return {
        product: [...product]
      };
    });
    this.fetchImage(product);
    this.fetchInfos(product);
  };
  fetchImage = (product) => {
    var field_images = [];
    for (let field of product) {
      field_images = [...field.images];
    }
    this.setState(function (previousState) {
      return {
        product_images: [...field_images]
      };
    });
  };

  callFun = () => {
    const items = this.state.product_images;
    return items;
  };

  fetchInfos = (product) => {
    var field_id = 0,
      field_name = "",
      field_sizes = [],
      field_price = 0,
      field_brand = "",
      field_description = "",
      field_rating = 0;
    for (let field of product) {
      field_id = field.id;
      field_name = field.name;
      field_sizes = [...field.sizes];
      field_price = field.price;
      field_brand = field.brand;
      field_description = field.description;
      field_rating = field.rating;
    }
    this.setState(function (previousState) {
      return {
        product_id: field_id,
        product_name: field_name,
        product_price: field_price,
        product_brand: field_brand,
        product_sizes: [...field_sizes],
        product_description: field_description,
        product_rating: field_rating
      };
    });
  };
  addProductToBag = async () => {
    const data = {
      id: "_" + Math.random().toString(36).substr(2, 9),
      name: this.state.product_name,
      images: [...this.state.product_images],
      price: this.state.product_price,
      sizes: [...this.state.product_sizes],
      brand: this.state.product_brand,
      description: this.state.product_description,
      quantity: 1
    };
    await putData("bag", data);
    await this.BagRef.current.pushToBag();
  };

  render() {
    return (
      <>
        <div className="content-container">
          {/* {ControlledCarousel()} */}
          <Header history={this.props.history}>
            <Input.Search placeholder="search your favourites..." />
          </Header>
          {this.state.product.length ? (
            <div>
              <Row className="main-row">
                <Col xs={24} lg={12}>
                  <Example images={this.callFun()} />
                </Col>
                <Col xs={24} lg={12} className="product-info">
                  <Row className="product-name">
                    <h2> {this.state.product_name} </h2>
                  </Row>
                  <Row className="product-brand">
                    {this.state.product_brand}
                  </Row>
                  <br />
                  <Row className="product-price">
                    ₹{this.state.product_price}
                  </Row>
                  <br />
                  {/* Put Size */}
                  <Row className="product-Size">
                    <br />
                    <Row>
                      <Radio.Group value={1}>
                        <Radio value={1}>One Size</Radio>
                      </Radio.Group>
                    </Row>
                  </Row>
                  <br />
                  <Row className="product-rating">
                    <Rate disabled defaultValue={4} />
                  </Row>
                  <br />
                  <Row className="product-description">
                    <div> Description </div>
                    <div className="product-description-para">
                      {this.state.product_description}
                    </div>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <Button
                      className="add-to-bag-button"
                      shape="round"
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      onClick={() => this.addProductToBag()}
                    >
                      Add to Bag
                    </Button>
                  </Row>
                </Col>
              </Row>
              <Row>
                <br />
                <Col xs={24} className="class-bag">
                  <div>
                    <div className="shoppingCartOutlined">
                      <ShoppingCartOutlined style={{ fontSize: "300%" }} />
                    </div>
                    <br />
                    <Bag
                      history={this.props.history}
                      summary={false}
                      ref={this.BagRef}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div>Loading product...</div>
          )}
        </div>
        <footer className="footer--pin">
          <Footer></Footer>
        </footer>
      </>
    );
  }
}

export default withRouter(Product);
