
import { useState, useEffect } from "react";
import API from "../../api/Api";
import ProductCard from "../../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section style={{ padding: "40px 80px" }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: "#222" }}>
          Featured Products
        </h2>
        <p style={{ color: "#999", fontSize: 14, marginTop: 8 }}>
          Summer Collection New Modern Design
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: 20
        }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              width: 230, height: 320,
              backgroundColor: "#f0f0f0",
              borderRadius: 25,
              animation: "pulse 1.5s infinite"
            }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        // No products
        <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
          <p style={{ fontSize: 40 }}>👕</p>
          <p style={{ marginTop: 10 }}>No products yet</p>
          <p style={{ fontSize: 13, marginTop: 5 }}>
            Add products from admin panel first!
          </p>
        </div>
      ) 
      
      : (
        // Products Grid
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: 10
        }}>
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
             
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default Products;



// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../../api/Api";

// // Features Data
// const features = [
//   { id: 1, icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
//   { id: 2, icon: "🔄", title: "Easy Returns", desc: "30 day return policy" },
//   { id: 3, icon: "💰", title: "Save Money", desc: "Best prices guaranteed" },
//   { id: 4, icon: "🎁", title: "Promotions", desc: "Special offers daily" },
//   { id: 5, icon: "😊", title: "Happy Sell", desc: "Trusted by thousands" },
//   { id: 6, icon: "📞", title: "24/7 Support", desc: "Always here to help" },
// ];

// // Sale Banners
// const banners = [
//   {
//     id: 1,
//     title: "SEASONS SALE",
//     subtitle: "Winter Collection 50% OFF",
//     img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
//   },
//   {
//     id: 2,
//     title: "Unisex Jackets",
//     subtitle: "30% Off",
//     img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600"
//   },
//   {
//     id: 3,
//     title: "Flash Sale",
//     subtitle: "Upto 80% off",
//     img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
//   },
// ];

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cartMsg, setCartMsg] = useState("");

//   // fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get('/products');
//         // show only first 8 products on homepage
//         setProducts(res.data.slice(0, 8));
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // add to cart
//   const handleAddToCart = async (productId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login';
//       return;
//     }
//     try {
//       await API.post('/cart', { productId, quantity: 1 });
//       setCartMsg('Added to cart! ✅');
//       setTimeout(() => setCartMsg(""), 2000);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white">

//       {/* ── HERO SECTION ── */}
//       <section className="bg-gray-100">
//         <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
//           {/* Left */}
//           <div className="flex-1">
//             <p className="text-sm text-gray-500 mb-2">
//               Trade-in-offer
//             </p>
//             <h1 className="text-5xl font-bold text-gray-800 mb-2">
//               Super value deals
//             </h1>
//             <h2 className="text-4xl font-bold text-teal-600 mb-4">
//               On all products
//             </h2>
//             <p className="text-gray-500 mb-8">
//               Save more with coupons & up to 70% off!
//             </p>
//             <Link to="/shop"
//               className="bg-amber-200 text-teal-700 font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition">
//               Shop Now
//             </Link>
//           </div>
//           {/* Right */}
//           <div className="flex-1">
//             <img
//               src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
//               alt="hero"
//               className="w-full rounded-2xl object-cover h-80"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURES ── */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {features.map(feature => (
//             <div key={feature.id}
//               className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
//               <div className="text-4xl mb-3">{feature.icon}</div>
//               <h3 className="text-sm font-semibold text-gray-700">
//                 {feature.title}
//               </h3>
//               <p className="text-xs text-gray-400 mt-1">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── CART SUCCESS MESSAGE ── */}
//       {cartMsg && (
//         <div className="fixed bottom-6 right-6 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm">
//           {cartMsg}
//         </div>
//       )}

//       {/* ── FEATURED PRODUCTS ── */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
//           Featured Products
//         </h2>
//         <p className="text-center text-gray-400 mb-10">
//           Summer Collection New Modern Design
//         </p>

//         {/* Loading */}
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map(product => (
//               <div key={product._id}
//                 className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition group">

//                 {/* Image */}
//                 <Link to={`/product/${product._id}`}>
//                   <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-52">
//                     <img
//                       src={product.image !== 'no-image.jpg'
//                         ? `http://localhost:5000/uploads/${product.image}`
//                         : 'https://via.placeholder.com/300'}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                     />
//                   </div>
//                 </Link>

//                 {/* Details */}
//                 <p className="text-xs text-gray-400 uppercase tracking-wider">
//                   {product.category}
//                 </p>
//                 <Link to={`/product/${product._id}`}>
//                   <h3 className="text-sm font-semibold text-gray-800 mt-1 hover:text-teal-600">
//                     {product.name}
//                   </h3>
//                 </Link>

//                 {/* Stars */}
//                 <div className="flex items-center gap-1 mt-2">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} className="text-yellow-400 text-sm">★</span>
//                   ))}
//                 </div>

//                 {/* Price + Cart */}
//                 <div className="flex items-center justify-between mt-3">
//                   <span className="text-teal-600 font-bold">
//                     ${product.price}
//                   </span>
//                   <button
//                     onClick={() => handleAddToCart(product._id)}
//                     className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition text-sm">
//                     🛒
//                   </button>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//         {/* No Products */}
//         {!loading && products.length === 0 && (
//           <div className="text-center py-16 text-gray-400">
//             <p className="text-4xl mb-3">👕</p>
//             <p>No products yet</p>
//             <p className="text-sm mt-1">
//               Add products from the admin panel first!
//             </p>
//           </div>
//         )}

//         {/* View All */}
//         {products.length > 0 && (
//           <div className="text-center mt-10">
//             <Link to="/shop"
//               className="border border-teal-600 text-teal-600 px-8 py-3 rounded-full hover:bg-teal-600 hover:text-white transition">
//               View All Products
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* ── SALE BANNERS ── */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {banners.map(banner => (
//             <div key={banner.id}
//               className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
//               <img
//                 src={banner.img}
//                 alt={banner.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
//                 <h3 className="text-white font-bold text-xl">
//                   {banner.title}
//                 </h3>
//                 <p className="text-red-400 font-semibold">
//                   {banner.subtitle}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── NEWSLETTER ── */}
//       <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-6 border-t">
//         <div>
//           <h3 className="text-xl font-bold text-gray-800">
//             Sign Up For Newsletters
//           </h3>
//           <p className="text-gray-400 text-sm mt-1">
//             Get email updates about our latest shop and special offers.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="border border-gray-300 rounded-full px-6 py-2 text-sm outline-none focus:border-teal-600 w-72"
//           />
//           <button className="bg-teal-600 text-white px-6 py-2 rounded-full text-sm hover:bg-teal-700 transition">
//             Sign Up
//           </button>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default HomePage;