import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <Header />

      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 && (
        <p className="empty-cart">Your cart is empty</p>
      )}

      <div className="cart-container">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-details">
              <h4>{item.title}</h4>
              <p>₹ {(item.price * 80).toFixed(0)}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;
