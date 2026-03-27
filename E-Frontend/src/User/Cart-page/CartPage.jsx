import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/Api";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState({
    street: "", city: "", state: "", zipCode: ""
  });
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await API.put(`/cart/${itemId}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      alert('first you fill the form');
      return;
    }
    setOrderLoading(true);
    try {
      await API.post('/orders', { shippingAddress: address });
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.msg || 'Order failed');
    } finally {
      setOrderLoading(false);
    }
  };

  // loading
  if (loading) {
    return (
      <div style={{ padding: "40px 80px" }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            backgroundColor: "#f0f0f0", borderRadius: 16,
            height: 80, marginBottom: 12
          }} />
        ))}
      </div>
    );
  }

  // empty cart
  if (!cart || cart.items?.length === 0) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex",
        flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 16
      }}>
        <p style={{ fontSize: 60 }}>🛒</p>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a" }}>
          Your cart is empty
        </h2>
        <p style={{ color: "#999" }}>
          Add some products first!
        </p>
        <Link to="/shop" style={{
          backgroundColor: "#088178", color: "white",
          padding: "12px 32px", borderRadius: 12,
          textDecoration: "none", fontWeight: 600
        }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 80px" }}>

      {/* Header */}
      <h1 style={{
        fontSize: 32, fontWeight: 700,
        color: "#1a1a1a", marginBottom: 30
      }}>
        My Cart ({cart.items.length} items)
      </h1>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* Cart Items */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.items.map(item => (
            <div key={item._id} style={{
              backgroundColor: "#f9f9f9", borderRadius: 16,
              padding: 16, display: "flex",
              alignItems: "center", gap: 16
            }}>

              {/* Image */}
              <img
                src={item.product.image !== 'no-image.jpg'
                  ? `http://localhost:5000/uploads/${item.product.image}`
                  : 'https://via.placeholder.com/80'}
                alt={item.product.name}
                style={{
                  width: 70, height: 70,
                  borderRadius: 12, objectFit: "cover"
                }}
              />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: 15, fontWeight: 600, color: "#1a1a1a"
                }}>
                  {item.product.name}
                </h3>
                <p style={{
                  fontSize: 12, color: "#999",
                  textTransform: "capitalize", marginTop: 2
                }}>
                  {item.product.category}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  style={{
                    fontSize: 12, color: "#e53935",
                    background: "none", border: "none",
                    cursor: "pointer", marginTop: 4, padding: 0
                  }}>
                  Remove
                </button>
              </div>

              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: "1px solid #ddd", backgroundColor: "white",
                    cursor: "pointer", fontSize: 16
                  }}>
                  −
                </button>
                <span style={{ fontWeight: 600, fontSize: 15 }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: "1px solid #ddd", backgroundColor: "white",
                    cursor: "pointer", fontSize: 16
                  }}>
                  +
                </button>
              </div>

              {/* Price */}
              <span style={{
                fontSize: 16, fontWeight: 700,
                color: "#088178", minWidth: 60, textAlign: "right"
              }}>
                ${item.product.price * item.quantity}
              </span>

            </div>
          ))}

          <Link to="/shop" style={{
            fontSize: 13, color: "#088178",
            textDecoration: "none", marginTop: 8
          }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Summary Box */}
          <div style={{
            backgroundColor: "#f9f9f9",
            borderRadius: 16, padding: 24
          }}>
            <h2 style={{
              fontSize: 18, fontWeight: 700,
              color: "#1a1a1a", marginBottom: 20
            }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#666" }}>
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#666" }}>
                <span>Shipping</span>
                <span style={{ color: "#088178" }}>
                  {calculateTotal() > 50 ? "Free" : "$5"}
                </span>
              </div>
              <div style={{ height: 1, backgroundColor: "#eee" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>
                <span>Total</span>
                <span style={{ color: "#088178" }}>
                  ${calculateTotal() > 50 ? calculateTotal() : calculateTotal() + 5}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowAddress(!showAddress)}
              style={{
                width: "100%", padding: "14px 0",
                backgroundColor: "#088178", color: "white",
                border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 600,
                cursor: "pointer", marginTop: 20
              }}>
              {showAddress ? "Hide Address" : "Proceed to Checkout"}
            </button>
          </div>

          {/* Address Form */}
          {showAddress && (
            <div style={{
              backgroundColor: "#f9f9f9",
              borderRadius: 16, padding: 24
            }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700,
                color: "#1a1a1a", marginBottom: 16
              }}>
                Shipping Address
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["street", "Street address"],
                  ["city", "City"],
                  ["state", "State"],
                  ["zipCode", "Zip Code"]
                ].map(([field, placeholder]) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={placeholder}
                    value={address[field]}
                    onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      border: "1px solid #ddd", borderRadius: 10,
                      fontSize: 13, outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                ))}

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                  style={{
                    width: "100%", padding: "14px 0",
                    backgroundColor: "#1a1a1a", color: "white",
                    border: "none", borderRadius: 12,
                    fontSize: 15, fontWeight: 600,
                    cursor: "pointer", marginTop: 8,
                    opacity: orderLoading ? 0.5 : 1
                  }}>
                  {orderLoading ? "Placing Order..." : "Place Order 🎉"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartPage;