import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      <h2 className="products-title">Our Products</h2>

      {/* ✅ Loading */}
      {loading && <p className="status-text">Loading products...</p>}

      {/* ✅ Error */}
      {error && <p className="status-text error-text">{error}</p>}

      {/* ✅ Products */}
      {!loading && !error && (
        <div className="products-container">
          {products.length === 0 ? (
            <p className="status-text">No products available</p>
          ) : (
            products.map((product) => (
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
                  <button
                    className="buy-btn"
                    onClick={() => alert("Buy Now feature coming soon")}
                  >
                    Buy Now
                  </button>

                  <button
                    className="cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Products;
