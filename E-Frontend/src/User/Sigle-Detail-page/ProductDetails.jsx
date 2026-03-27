import { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";
import API from "../../api/Api";
import Nav from "../Home-page/Nav";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [msg, setMsg] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const sizeOf = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        console.log(res);
        
        setProduct(res.data);
        setMainImage(res.data.image);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   navigate('/login');
    //   return;
    // }
    setCartLoading(true);
    try {
      await API.post('/cart', {
        productId: product._id,
        quantity
      });
      setMsg("Added to cart! ✅");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, padding: "40px 80px", maxWidth: 1100, margin: "0 auto"
        }}>
          <div style={{ backgroundColor: "#f0f0f0", borderRadius: 8, height: 400 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                backgroundColor: "#f0f0f0", borderRadius: 8,
                height: 20, width: i === 1 ? "40%" : "100%"
              }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Nav />
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: 60 }}>😕</p>
          <p style={{ color: "#999" }}>Product not found</p>
        </div>
      </>
    );
  }

  const imageUrl = product.image && product.image !== 'no-image.jpg'
    ? `http://localhost:5000/uploads/${product.image}`
    : 'https://via.placeholder.com/400';

  return (
    <>
      <Nav />

      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "40px 80px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "start"
        }}>

          {/* ── LEFT — Images ── */}
          <div>
            {/* Main Image */}
            <div style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 8, overflow: "hidden",
              height: 400, position: "relative",
              marginBottom: 12
            }}>
              <img
                src={imageUrl}
                alt={product.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "contain", padding: 20
                }}
              />
              {/* Zoom Icon */}
              {/* <div style={{
                position: "absolute", top: 12, right: 12,
                backgroundColor: "white", borderRadius: "50%",
                width: 32, height: 32, display: "flex",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                🔍
              </div> */}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(product.image)}
                  style={{
                    width: 70, height: 70,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6, overflow: "hidden",
                    cursor: "pointer",
                    border: "2px solid #ddd",
                    padding: 4
                  }}>
                  <img
                    src={imageUrl}
                    alt={`thumb-${i}`}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Details ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Name */}
            <h1 style={{
              fontSize: 28, fontWeight: 400,
              color: "#1a1a1a", margin: 0
            }}>
              {product.name}
            </h1>

            {/* Price */}
            <p style={{
              fontSize: 22, color: "#555",
              margin: 0, fontWeight: 400
            }}>
              ${product.price}.00
            </p>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "#eee" }} />

            {/* Description */}
            {product.description && (
              <p style={{
                fontSize: 14, color: "#666",
                lineHeight: 1.8, margin: 0
              }}>
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "#eee" }} />

            {/* Color Selector */}
            <div style={{
              border: "1px solid #ddd",
              borderRadius: 4, padding: 16
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 10
              }}>
                <label style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>
                  Size
                </label>
                <button
                  onClick={() => setSize("M")}
                  style={{
                    background: "none", border: "none",
                    color: "#9b59b6", fontSize: 13,
                    cursor: "pointer", display: "flex",
                    alignItems: "center", gap: 4
                  }}>
                  🔄 Clear
                </button>
              </div>
              <select
                value={setSize}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  width: "60%", padding: "8px 12px",
                  border: "1px solid #ccc", borderRadius: 4,
                  fontSize: 14, color: "#333",
                  backgroundColor: "white", cursor: "pointer"
                }}>
                {sizeOf.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Stock Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                backgroundColor: product.stock > 0 ? "#27ae60" : "#e74c3c"
              }} />
              <span style={{ fontSize: 14, color: "#27ae60" }}>
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "#eee" }} />

            {/* Quantity + Add to Cart */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

              {/* Quantity Input */}
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  width: 60, padding: "10px 12px",
                  border: "1px solid #ddd", borderRadius: 4,
                  fontSize: 16, textAlign: "center",
                  color: "#333"
                }}
              />

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || product.stock === 0}
                style={{
                  flex: 1, padding: "12px 24px",
                  backgroundColor: "#5a8a5a", color: "white",
                  border: "none", borderRadius: 4,
                  fontSize: 15, fontWeight: 600,
                  cursor: "pointer",
                  opacity: cartLoading || product.stock === 0 ? 0.5 : 1
                }}>
                {cartLoading ? "Adding..." : "Add to basket"}
              </button>

            </div>

            {/* Cart Message */}
            {msg && (
              <p style={{
                fontSize: 14, color: "#27ae60",
                fontWeight: 600
              }}>
                {msg}
              </p>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;