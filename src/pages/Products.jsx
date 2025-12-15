import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />

      <h2 className="products-title">Our Products</h2>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />

            <h3 className="product-name">{product.title}</h3>

            <p className="product-description">
              {product.description.substring(0, 100)}...
            </p>

            <p className="product-price">
              ₹ {(product.price * 80).toFixed(0)}
            </p>

            <div className="product-buttons">
              <button className="buy-btn">Buy Now</button>
              <button
                className="cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
