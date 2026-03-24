import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, qty = 1, selectedSize } = location.state || {};

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "cod" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!product) { navigate("/shop"); return null; }

  const subtotal = product.price * qty;
  const delivery = subtotal >= 50 ? 0 : 5;
  const total = subtotal + delivery;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.pincode.trim()) e.pincode = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    // TODO: call your order API here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 520, margin: "6rem auto", padding: "0 1.5rem", textAlign: "center", fontFamily: "inherit" }}>
        <div style={{ width: 72, height: 72, background: "#e8f5e9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: 30 }}>✓</div>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px" }}>Order Placed!</h2>
        <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: "0 0 2rem" }}>
          Thank you, <strong>{form.name.split(" ")[0]}</strong>! Your order for <strong>{product.name}</strong> {selectedSize && `(Size: ${selectedSize})`} has been confirmed. We'll reach you at {form.phone}.
        </p>
        <button
          onClick={() => navigate("/shop")}
          style={{ background: "#5a8a5a", color: "#fff", border: "none", borderRadius: 14, padding: "13px 36px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "inherit" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "2rem", fontSize: 13, color: "#888" }}>
        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#5a8a5a" }}>Home</span>
        <span>/</span>
        <span onClick={() => navigate("/shop")} style={{ cursor: "pointer", color: "#5a8a5a" }}>Shop</span>
        <span>/</span>
        <span onClick={() => navigate(-1)} style={{ cursor: "pointer", color: "#5a8a5a" }}>{product.name}</span>
        <span>/</span>
        <span style={{ color: "#333" }}>Checkout</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 2rem", color: "#1a1a1a" }}>Checkout</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "start" }}>

        {/* Left: Delivery Form */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #eee", padding: "2rem" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: "0 0 1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #f0f0f0" }}>
            Delivery Information
          </h3>

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Full Name" value={form.name} error={errors.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              <Field label="Email" value={form.email} error={errors.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" />
            </div>
            <Field label="Phone Number" value={form.phone} error={errors.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+91 XXXXX XXXXX" />
            <Field label="Address" value={form.address} error={errors.address} onChange={v => setForm(f => ({ ...f, address: v }))} placeholder="Street, House no." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="City" value={form.city} error={errors.city} onChange={v => setForm(f => ({ ...f, city: v }))} />
              <Field label="Pincode" value={form.pincode} error={errors.pincode} onChange={v => setForm(f => ({ ...f, pincode: v }))} />
            </div>
          </div>

          {/* Payment Method */}
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: "2rem 0 1rem", paddingTop: "1.5rem", borderTop: "1px solid #f0f0f0" }}>
            Payment Method
          </h3>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ id: "cod", label: "Cash on Delivery" }, { id: "online", label: "Online Payment" }].map(opt => (
              <div
                key={opt.id}
                onClick={() => setForm(f => ({ ...f, payment: opt.id }))}
                style={{
                  flex: 1, padding: "12px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${form.payment === opt.id ? "#5a8a5a" : "#ddd"}`,
                  background: form.payment === opt.id ? "#f0f7f0" : "#fff",
                  cursor: "pointer",
                  fontSize: 13, fontWeight: 500,
                  color: form.payment === opt.id ? "#3a6a3a" : "#666",
                  textAlign: "center",
                  transition: "all 0.15s"
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #eee", padding: "1.5rem", marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: "0 0 1.25rem" }}>Order Summary</h3>

            {/* Product row */}
            <div style={{ display: "flex", gap: 14, marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ width: 70, height: 70, borderRadius: 12, overflow: "hidden", background: "#f4f4f4", flexShrink: 0 }}>
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px", color: "#1a1a1a" }}>{product.name}</p>
                <p style={{ fontSize: 12, color: "#999", margin: "0 0 4px" }}>{product.category} · {product.gender}</p>
                {selectedSize && <span style={{ fontSize: 11, background: "#f0f0f0", padding: "2px 8px", borderRadius: 6, color: "#666" }}>Size: {selectedSize}</span>}
              </div>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#5a8a5a", margin: 0 }}>${product.price}</p>
            </div>

            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
                <span>Subtotal ({qty} item{qty > 1 ? "s" : ""})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#2e7d32" : "#333" }}>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, paddingTop: 12, borderTop: "1px solid #f0f0f0", color: "#1a1a1a" }}>
                <span>Total</span>
                <span style={{ color: "#5a8a5a" }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%", padding: "15px 0",
              background: "#5a8a5a", color: "#fff",
              border: "none", borderRadius: 14,
              fontSize: 15, fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#4a7a4a"}
            onMouseLeave={e => e.target.style.background = "#5a8a5a"}
          >
            Confirm Order →
          </button>
          <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 10 }}>
            Secure checkout · Free returns
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || label}
        style={{
          width: "100%", padding: "11px 14px",
          border: `1.5px solid ${error ? "#e57373" : "#e0e0e0"}`,
          borderRadius: 10, fontSize: 14,
          outline: "none", background: "#fafafa",
          fontFamily: "inherit",
          boxSizing: "border-box",
          color: "#1a1a1a",
          transition: "border 0.15s"
        }}
        onFocus={e => e.target.style.borderColor = "#5a8a5a"}
        onBlur={e => e.target.style.borderColor = error ? "#e57373" : "#e0e0e0"}
      />
      {error && <p style={{ color: "#e57373", fontSize: 11, margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}
