import { useEffect,useState } from "react";
import API from "../../api/Api";
import ProductCard from "../../components/ProductCard";


function ShopPage(){
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [search, setSearch] = useState("");
      const [category, setCategory] = useState("All");

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
      const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
     
       const filtered = products.filter(p => {
         const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
         const matchCat = category === "All" || p.category === category;
         return matchSearch && matchCat;
       });
     
       return (
         <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem" }}>
           <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-1px" }}>
             All Products
           </h1>
           <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 2rem" }}>
             {loading ? "Loading..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
           </p>
     
           {/* Search + Filter bar */}
           <div style={{ display: "flex", gap: 12, marginBottom: "2rem", flexWrap: "wrap" }}>
             <input
               type="text"
               placeholder="Search products..."
               value={search}
               onChange={e => setSearch(e.target.value)}
               style={{
                 flex: 1, minWidth: 200, padding: "10px 16px",
                 border: "1.5px solid #e0e0e0", borderRadius: 12,
                 fontSize: 14, outline: "none", fontFamily: "inherit",
                 background: "#fff",
               }}
               onFocus={e => e.target.style.borderColor = "#5a8a5a"}
               onBlur={e => e.target.style.borderColor = "#e0e0e0"}
             />
             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setCategory(cat)}
                   style={{
                     padding: "10px 18px",
                     borderRadius: 12, fontSize: 13, fontWeight: 500,
                     border: `1.5px solid ${category === cat ? "#5a8a5a" : "#e0e0e0"}`,
                     background: category === cat ? "#5a8a5a" : "#fff",
                     color: category === cat ? "#fff" : "#555",
                     cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
                   }}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>
     
           {/* Error */}
           {error && (
             <div style={{ textAlign: "center", padding: "4rem 0", color: "#c0392b" }}>
               <p>⚠ {error}</p>
             </div>
           )}
     
           {/* Loading skeleton */}
           {loading && (
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
               {Array.from({ length: 8 }).map((_, i) => (
                 <div key={i} style={{ borderRadius: 18, overflow: "hidden", background: "#f4f4f4" }}>
                   <div style={{ height: 200, background: "#ebebeb" }} />
                   <div style={{ padding: "1rem" }}>
                     <div style={{ height: 10, background: "#ebebeb", borderRadius: 6, marginBottom: 8, width: "60%" }} />
                     <div style={{ height: 14, background: "#ebebeb", borderRadius: 6 }} />
                   </div>
                 </div>
               ))}
             </div>
           )}
     
           {/* Products grid */}
           {!loading && !error && (
             filtered.length === 0
               ? <p style={{ textAlign: "center", color: "#aaa", padding: "4rem 0", fontSize: 15 }}>No products match your search.</p>
               : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
                   {filtered.map(p => <ProductCard key={p._id} product={p} />)}
                 </div>
           )}
         </main>
       );
     }
     export default ShopPage;