import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <header className="header">
      <h2 className="logo">Ecom Store</h2>

      <div className="header-right">
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒
          {cart.length > 0 && (
            <span className="cart-count">{cart.length}</span>
          )}
        </div>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
