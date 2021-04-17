import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Tilt from "react-parallax-tilt";
import { connect } from "react-redux";
import {fetchProducts} from "../actions/productActions"
import {addToCart} from "../actions/cartActions"
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  };
  componentDidMount(){
    this.props.fetchProducts()
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {
            !this.props.products ? (
            <div>Loading...</div>
             ) : ( 
            <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                </div>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => this.props.addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          )
            
          }
          
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <Tilt>
                  <img src={product.image} alt={product.title} />
                </Tilt>

                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>

                  <ul className="showing-product">
                    <li>{product.description1}</li>
                    <li>{product.description2}</li>
                    <li>{product.description3}</li>
                    <li>{product.description4}</li>
                    <li>{product.description5}</li>
                  </ul>
                  <p>
                    Avalible Size{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-showing">
                    <span>{formatCurrency(product.price)}</span>
                    <span
                      className="button-add-to-cart"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </span>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state)=>({products:state.products.filteredItems}),{fetchProducts,addToCart})(Products)
