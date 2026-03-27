import { useState } from "react";
import API from "../api/Api";
import { Link,} from "react-router-dom";


function ProductCard({ product }) {
   

  const { _id, name, description, price, stock, category, image } = product;
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleAddToCart = async (e) => {
    e.preventDefault();
      e.stopPropagation()

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
   return;
    }
    setLoading(true);
    try {
      await API.post('/cart', { productId: _id, quantity: 1 });
      setMsg("Added! ✅");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/products/${_id}`}>
    <div

    
      className={`w-[230px] min-w-[230px] p-[10px_12px] border border-[#cce7d0] rounded-[25px] cursor-pointer m-[15px_0] relative bg-white transition duration-200
      ${hovered ? "shadow-[20px_20px_30px_rgba(84,83,83,0.5)]" : "shadow-[20px_20px_30px_rgba(0,0,0,0.2)]"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
 
      {image && image !== 'no-image.jpg' ? (
        <img
          src={`http://localhost:5000/uploads/${image}`}
       
          alt={name}
          className="w-full h-[180px] object-cover rounded-[20px]"
        />

      ) : (
        <div className="w-full h-[180px] rounded-[20px] bg-[#f0f0f0] flex items-center justify-center text-[#bbb] text-[13px] flex-col gap-2">
          <svg width="40" height="40" fill="none" stroke="#ccc" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          No Image
        </div>
      )}
      {console.log(image)}

 
      <div className="text-left py-[10px]">
        <span className="text-[#606063] text-[12px] capitalize">
          {category}
        </span>
        <h5 className="pt-[7px] text-[#1a1a1a] text-[14px] font-semibold">
          {name}
        </h5>
        <p className="text-[12px] text-gray-500 line-clamp-2">
          {description}
        </p>
        <h6 className="pt-[7px] text-[15px] font-bold text-[#74cdc7]">
          ${price}
        </h6>

        {/* Stock Status */}
        <span className={`text-[10px] font-medium
          ${stock > 10 ? "text-green-500"
            : stock > 0 ? "text-yellow-500"
            : "text-red-500"}`}>
          {stock > 10 ? "In Stock"
            : stock > 0 ? `Only ${stock} left!`
            : "Out of Stock"}
        </span>

        {/* Cart Message */}
        {msg && (
          <p className="text-[11px] text-teal-600 font-medium mt-1">{msg}</p>
        )}
      </div>

      {/* Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading || stock === 0}
        className="w-[40px] h-[40px] rounded-full bg-[#ceddd0] text-[#088178] border border-[#cce7d0]
        absolute bottom-5 right-[10px] flex items-center justify-center hover:bg-[#bcd3c0]
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? <span className="text-[10px]">...</span>
          : <i className="fa-solid fa-cart-shopping text-[14px]" />
        }
      </button>
    </div>
    </Link>
  );
}

export default ProductCard;