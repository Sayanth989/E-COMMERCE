import { useState } from "react";

// ─── EXACT PRODUCT DATA (same as your HTML) ───────────────────────────────────

const FEATURED_PRODUCTS = [
  { id: 1,  brand: "Adidas",  name: "Cartoon Astro T-Shirts", price: 50, stars: 5, img: "img/products/f1.jpg" },
  { id: 2,  brand: "Kelvin",  name: "Liverone T-Shirts",       price: 77, stars: 5, img: "img/products/f2.jpg" },
  { id: 3,  brand: "ZOZO",    name: "Zip zo T-Shirts",         price: 88, stars: 5, img: "img/products/f3.jpg" },
  { id: 4,  brand: "COC",     name: "Coppas T-Shirts",         price: 60, stars: 5, img: "img/products/f4.jpg" },
  { id: 5,  brand: "Eco",     name: "Eco lub T-Shirts",        price: 80, stars: 5, img: "img/products/f5.jpg" },
  { id: 6,  brand: "VP",      name: "VP Zip T-Shirts",         price: 89, stars: 5, img: "img/products/f6.jpg" },
  { id: 7,  brand: "Latro",   name: "LM tro Pants",            price: 70, stars: 5, img: "img/products/f7.jpg" },
  { id: 8,  brand: "MC",      name: "MC doc Top",              price: 76, stars: 5, img: "img/products/f8.jpg" },
];

const NEW_ARRIVALS = [
  { id: 9,  brand: "LOOP",     name: "LMO Shirt",   price: 44, stars: 4, img: "img/products/n1.jpg" },
  { id: 10, brand: "US POLO",  name: "Mazo Shirt",  price: 99, stars: 5, img: "img/products/n2.jpg" },
  { id: 11, brand: "MARKZO",   name: "lizy shirt",  price: 67, stars: 5, img: "img/products/n3.jpg" },
  { id: 12, brand: "LAMPO",    name: "Latho shirt", price: 77, stars: 5, img: "img/products/n4.jpg" },
  { id: 13, brand: "PIZO",     name: "Ieo Shirt",   price: 57, stars: 5, img: "img/products/n5.jpg" },
  { id: 14, brand: "Chottu",   name: "Che Shorts",  price: 47, stars: 5, img: "img/products/n6.jpg" },
  { id: 15, brand: "ESSA",     name: "Es Shirt",    price: 77, stars: 5, img: "img/products/n7.jpg" },
  { id: 16, brand: "LACKTOSE", name: "LC Shirt",    price: 57, stars: 5, img: "img/products/n8.jpg" },
];

const featureBoxBg = ["#fddde4", "#dde7e7", "#a6c4bb", "#d7dfe8", "#d1c3d5", "#dad6c6"];

// ─── STAR COMPONENT ───────────────────────────────────────────────────────────

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 1, margin: "4px 0" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className="fas fa-star"
          style={{ fontSize: 12, color: i <= count ? "#ffff00" : "#ccc" }}
        />
      ))}
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product }) {
  const { brand, name, price, stars, img } = product;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: 230,
        minWidth: 230,
        padding: "10px 12px",
        border: "1px solid #cce7d0",
        borderRadius: 25,
        cursor: "pointer",
        boxShadow: hovered
          ? "20px 20px 30px rgba(84,83,83,0.5)"
          : "20px 20px 30px rgba(0,0,0,0.2)",
        margin: "15px 0",
        transition: "0.2s ease",
        position: "relative",
        background: "#fff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {img ? (
        <img src={img} alt={name} style={{ width: "100%", borderRadius: 20 }} />
      ) : (
        /* Placeholder — backend will supply the img URL */
        <div style={{
          width: "100%", height: 180, borderRadius: 20,
          background: "#f0f0f0", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#bbb", fontSize: 13,
          flexDirection: "column", gap: 8,
        }}>
          <svg width="40" height="40" fill="none" stroke="#ccc" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          No Image
        </div>
      )}

      <div style={{ textAlign: "left", padding: "10px 0" }}>
        <span style={{ color: "#606063", fontSize: 12 }}>{brand}</span>
        <h5 style={{ paddingTop: 7, color: "#1a1a1a", fontSize: 14, fontWeight: 600 }}>{name}</h5>
        <Stars count={stars} />
        <h6 style={{ paddingTop: 7, fontSize: 15, fontWeight: 700, color: "#74cdc7" }}>${price}</h6>
      </div>

      <a href="#" style={{
        width: 40, height: 40, lineHeight: "40px", borderRadius: 30,
        backgroundColor: "#ceddd0", color: "#088178", border: "1px solid #cce7d0",
        position: "absolute", bottom: 20, right: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
      }}>
        <i className="fa-solid fa-cart-shopping" style={{ fontSize: 14 }} />
      </a>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        #header-nav li a:hover, #header-nav li a.active { color: #4d7947 !important; }
        #header-nav li a.active::after, #header-nav li a:hover::after {
          content: ""; width: 30px; height: 2px; background: #4d7947;
          position: absolute; bottom: -4px; left: 20px; display: block;
        }
        @media (max-width: 799px) {
          #header-desktop { display: none !important; }
          #header-mobile  { display: flex !important; }
        }
      `}</style>

      <section style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 80px", backgroundColor: "#f3f3f3",
        boxShadow: "5px -6px 15px rgba(0,0,0,0.06)",
        zIndex: 999, position: "sticky", top: 0, left: 0,
      }}>
        <a href="#">
          <img src="img/logo.png" alt="Logo" style={{ height: 40 }}
            onError={e => { e.target.style.display="none"; }}
          />
        </a>

        {/* Desktop nav */}
        <div id="header-desktop">
          <ul id="header-nav" style={{ display:"flex", alignItems:"center", listStyle:"none", margin:0, padding:0 }}>
            {[["home","index.html"],["shop","shop.html"],["blog","blog.html"],["about","about.html"],["contact","contact.html"]].map(([label, href], i) => (
              <li key={label} style={{ padding: "0 20px", position: "relative" }}>
                <a href={href} className={i === 0 ? "active" : ""} style={{
                  textDecoration: "none", fontSize: 16, fontWeight: 600,
                  color: "#4a4c4c", transition: "0.3s ease",
                }}>
                  {label}
                </a>
              </li>
            ))}
            <li id="ig" style={{ padding: "0 20px" }}>
              <a href="cart.html" style={{ color: "#4a4c4c", textDecoration: "none" }}>
                <i className="fa-solid fa-cart-shopping" />
              </a>
            </li>
            <a href="#" style={{ display: "none" }}>
              <i className="fa-solid fa-door-open" />
            </a>
          </ul>
        </div>

        {/* Mobile */}
        <div id="header-mobile" style={{ display: "none", alignItems: "center" }}>
          <a href="cart.html" style={{ color: "#1a1a1a", textDecoration: "none" }}>
            <i className="fa-solid fa-cart-shopping" />
          </a>
          <i
            className="fa-solid fa-square-caret-down"
            style={{ color: "#1a1a1a", fontSize: 24, paddingLeft: 10, cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </section>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 80, right: 0, height: "100vh",
          width: 300, backgroundColor: "#E6E3F3",
          boxShadow: "0 40px 60px rgba(0,0,0,0.1)",
          padding: "80px 0 0 10px", zIndex: 998,
          display: "flex", flexDirection: "column", gap: 22,
        }}>
          {["home","shop","blog","about","contact"].map(item => (
            <a key={item} href="#" style={{ textDecoration:"none", fontWeight:600, fontSize:16, color:"#4a4c4c" }}>
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{
      backgroundImage: 'url("img/hero4.png")',
      height: "90vh", width: "100%",
      backgroundSize: "cover", backgroundPosition: "top 25% right 0%",
      padding: "0 80px",
      display: "flex", flexDirection: "column",
      alignItems: "flex-start", justifyContent: "center",
    }}>
      <h4 style={{ fontSize: 30, color: "#222", paddingBottom: 15 }}>Trade-in-offer</h4>
      <h2 style={{ fontSize: 50, lineHeight: "64px", color: "#222" }}>Super value deals</h2>
      <h1 style={{ fontSize: 50, lineHeight: "64px", color: "#088178" }}>On all produts</h1>
      <p style={{ fontSize: 16, color: "#465652", margin: "15px 0 20px 0" }}>
        Save more with coupons & up to 70% off !
      </p>
      <button style={{
        backgroundImage: 'url("img/button.png")',
        backgroundColor: "transparent", color: "#088178",
        border: 0, paddingTop: 10, paddingLeft: 80, paddingBottom: 15, paddingRight: 80,
        backgroundRepeat: "no-repeat", cursor: "pointer", fontWeight: 700, fontSize: 15,
      }}>
        Shop Now
      </button>
    </section>
  );
   }

// ─── FEATURES ─────────────────────────────────────────────────────────────────

function Features() {
  const items = [
    { img: "img/f1.png", label: "Free shipping" },
    { img: "img/f2.png", label: "Online Order" },
    { img: "img/f3.png", label: "save Money" },
    { img: "img/f4.png", label: "Promotions" },
    { img: "img/f5.png", label: " Happy Sell" },
    { img: "img/f6.png", label: "24/7 Support" },
  ];

  return (
    <section style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", padding: "40px 80px",
    }}>
      {items.map(({ img, label }, i) => (
        <FeatureBox key={label} img={img} label={label} bg={featureBoxBg[i]} />
      ))}
    </section>
  );
 }

 function FeatureBox({ img, label, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        width: 180, textAlign: "center", padding: "25px 15px",
        boxShadow: hovered
          ? "10px 10px 54px rgba(20,62,221,0.1)"
          : "20px 20px 34px rgba(0,0,0,0.05)",
        border: "1px solid #cce7d0", borderRadius: 4,
        margin: "15px 0", transition: "0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={img} alt={label} style={{ width: "100%", marginBottom: 10 }} />
      <h6 style={{
        padding: "9px 8px 6px 8px", display: "inline-block",
        lineHeight: 1, borderRadius: 4, color: "#088178",
        backgroundColor: bg, fontWeight: 700, fontSize: 12,
      }}>
        {label}
      </h6>
    </div>
  );
}

// ─── PRODUCT SECTION ──────────────────────────────────────────────────────────

function ProductSection({ title, subtitle, products, loading = false }) {
  return (
    <section style={{ textAlign: "center", padding: "40px 80px" }}>
      <h2 style={{ fontSize: 46, lineHeight: "64px", color: "#222" }}>{title}</h2>
      <p style={{ fontSize: 16, color: "#465652", margin: "15px 0 20px 0" }}>{subtitle}</p>

      <div style={{
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20, padding: 20,
      }}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                width: 230, minWidth: 230, height: 320,
                borderRadius: 25, background: "#f0f0f0",
              }} className="skeleton" />
            ))
          : products.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>

      <style>{`
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .skeleton { animation: shimmer 1.5s infinite; }
      `}</style>
    </section>
  );
}

// ─── BANNER ───────────────────────────────────────────────────────────────────

function Banner() {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      backgroundImage: 'url("img/banner/b2.jpg")',
      height: "40vh", backgroundSize: "cover", backgroundPosition: "center",
      margin: "40px 0",
    }}>
      <h4 style={{ color: "white", fontSize: 15 }}>Repair Services </h4>
      <h2 style={{ color: "white", fontSize: 35, padding: "11px 0" }}>
        Up to <span style={{ color: "red" }}>70% Off</span> t-shirts & Accessories
      </h2>
      <button
        style={{
          fontSize: 15, fontWeight: 600, padding: "15px 30px",
          backgroundColor: hovered ? "#68c4bd" : "white",
          color: hovered ? "white" : "black",
          borderRadius: 27, cursor: "pointer", outline: "none",
          border: "none", transition: "0.2s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Explore More
      </button>
    </section>
  );
}

// ─── SM BANNER ────────────────────────────────────────────────────────────────

function SmBanner() {
  const banners = [
    { img: "img/banner/b17.jpg", tag: "Crazy deals",   title: "Buy 1 get 1 Free",   sub: "The best classic dress is on sale at cara", btn: "Leran More" },
    { img: "img/banner/b10.jpg", tag: "Spring/Summer", title: "Upcoming seasons",    sub: "The best classic dress is on sale at cara", btn: "Collection"  },
  ];

  return (
    <section style={{
      display: "flex", justifyContent: "space-between",
      flexWrap: "wrap", padding: "40px 80px",
    }}>
      {banners.map(({ img, tag, title, sub, btn }) => (
        <SmBannerBox key={title} img={img} tag={tag} title={title} sub={sub} btn={btn} />
      ))}
    </section>
  );
}

function SmBannerBox({ img, tag, title, sub, btn }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      backgroundImage: `url("${img}")`,
      minWidth: 580, height: "50vh",
      backgroundSize: "cover", backgroundPosition: "center",
      padding: 40,
    }}>
      <h4 style={{ color: "white", fontSize: 20, fontWeight: 300 }}>{tag}</h4>
      <h2 style={{ color: "white", fontSize: 30, fontWeight: 800 }}>{title}</h2>
      <span style={{ color: "white", fontSize: 14, fontWeight: 500, paddingBottom: 15, display: "block" }}>{sub}</span>
      <button
        style={{
          fontSize: 13, fontWeight: 500, padding: "11px 18px",
          backgroundColor: hovered ? "#088178" : "transparent",
          color: "white", border: "2px solid white",
          cursor: "pointer", outline: "none", transition: "0.3s", borderRadius: 2,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {btn}
      </button>
    </div>
  );
}

// ─── BANNER 3 ─────────────────────────────────────────────────────────────────

function Banner3() {
  const items = [
    { img: "img/banner/b7.jpg",  title: "SEASONS SALE",   sub: "Winter Collection -50% OFF" },
    { img: "img/banner/b4.jpg",  title: "Unisex Jackets", sub: "30% Off" },
    { img: "img/banner/b18.jpg", title: "Flash sale ",    sub: "Upto 50% off" },
  ];

  return (
    <section style={{
      display: "flex", justifyContent: "space-between",
      flexWrap: "wrap", padding: "0 80px",
    }}>
      {items.map(({ img, title, sub }) => (
        <div key={title} style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          backgroundImage: `url("${img}")`,
          minWidth: "30%", height: "40vh",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: 30, flex: 1,
        }}>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: 25 }}>{title}</h2>
          <h3 style={{ color: "red", fontSize: 16, fontWeight: 900 }}>{sub}</h3>
        </div>
      ))}
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────

function Newsletter() {
  return (
    <section style={{
      display: "flex", justifyContent: "space-between",
      flexWrap: "wrap", alignItems: "center",
      padding: "40px 80px", margin: "40px 0",
      backgroundImage: 'url("img/banner/b14.png")',
      backgroundRepeat: "no-repeat", backgroundPosition: "20% 30%",
      color: "#041e42",
    }}>
      <div>
        <h4 style={{ fontSize: 30, color: "#041e42" }}>sign Up For newsletters</h4>
        <p style={{ fontSize: 16, color: "#465652", margin: "15px 0 20px 0" }}>
          Get E-mail updates about our letest shop and <span style={{ color: "#088178" }}>special offers.</span>
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Your email adderss"
          style={{ padding: "12px 20px", border: "1px solid #ccc", fontSize: 14, outline: "none" }}
        />
        <button style={{
          backgroundColor: "#088178", color: "white",
          padding: "12px 20px", border: "none", cursor: "pointer",
          fontWeight: 600, whiteSpace: "nowrap",
        }}>
          Sign up
        </button>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "40px 80px" }}>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 20 }}>
        <img src="img/logo.png" alt="Logo" style={{ marginBottom: 30, height: 40 }}
          onError={e => e.target.style.display = "none"} />
        <h4 style={{ fontSize: 14, paddingBottom: 20, color: "#222" }}>Contact</h4>
        <p style={{ fontSize: 13, marginBottom: 8 }}><strong>address: </strong>567 willy road,street 78,us newyork</p>
        <p style={{ fontSize: 13, marginBottom: 8 }}><strong>phone: </strong>+08 22223 369 /+92-999933 369</p>
        <p style={{ fontSize: 13, marginBottom: 8 }}><strong>Site Open: </strong>10:00-11-00. Mon-friday</p>
        <div style={{ marginTop: 20 }}>
          <h4 style={{ fontSize: 14, paddingBottom: 20, color: "#222" }}>Follw Us</h4>
          <div style={{ display: "flex", gap: 8 }}>
            {["fa-facebook-f","fa-twitter","fa-instagram","fa-pinterest","fa-youtube"].map(icon => (
              <FooterIcon key={icon} icon={icon} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 20 }}>
        <h4 style={{ fontSize: 14, paddingBottom: 20, color: "#222" }}>About</h4>
        {["abut us","Devilery Information","Privacy policy","Terms $ Conditions","Contact Us"].map(link => (
          <FooterLink key={link} label={link} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 20 }}>
        <h4 style={{ fontSize: 14, paddingBottom: 20, color: "#222" }}>My Account</h4>
        {["sign ln","View Cart","My Wishlist","Track My Order","Help Us"].map(link => (
          <FooterLink key={link} label={link} />
        ))}
      </div>

      <div className="col-instal" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 20 }}>
        <h4 style={{ fontSize: 14, paddingBottom: 20, color: "#222" }}>Instal App</h4>
        <p style={{ fontSize: 13 }}>Form App Store or Google PlayStore</p>
        <div style={{ display: "flex", gap: 8, margin: "10px 0 15px 0" }}>
          <img src="img/pay/app.jpg" alt="App Store"
            style={{ border: "1px solid #088178", borderRadius: 6, cursor: "pointer", height: 36 }}
            onError={e => e.target.style.display="none"} />
          <img src="img/pay/play.jpg" alt="Google Play"
            style={{ border: "1px solid #088178", borderRadius: 6, cursor: "pointer", height: 36 }}
            onError={e => e.target.style.display="none"} />
        </div>
        <p style={{ fontSize: 13 }}>Secured payment Gateways</p>
        <img src="img/pay/play.jpg" alt="Payment"
          style={{ margin: "10px 0 15px 0", height: 30 }}
          onError={e => e.target.style.display="none"} />
      </div>

    </footer>
  );
}

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" style={{
      fontSize: 13, textDecoration: "none",
      color: hovered ? "#186964" : "#222",
      marginBottom: 10, transition: "0.2s",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

function FooterIcon({ icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <i className={`fa-brands ${icon}`}
      style={{ color: hovered ? "#088178" : "#111f1e", cursor: "pointer", fontSize: 16, paddingRight: 4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  // ── Connect your backend here ─────────────────────────────────────────────
  //
  // Step 1: Replace the static arrays at the top of this file with state:
  //   const [featuredProducts, setFeaturedProducts] = useState([]);
  //   const [newArrivals, setNewArrivals]           = useState([]);
  //   const [loadingFeatured, setLoadingFeatured]   = useState(true);
  //   const [loadingNew, setLoadingNew]             = useState(true);
  //
  // Step 2: Fetch on mount:
  //   useEffect(() => {
  //     fetch("/api/products?type=featured")
  //       .then(r => r.json())
  //       .then(data => { setFeaturedProducts(data); setLoadingFeatured(false); });
  //
  //     fetch("/api/products?type=new-arrivals")
  //       .then(r => r.json())
  //       .then(data => { setNewArrivals(data); setLoadingNew(false); });
  //   }, []);
  //
  // Step 3: Pass them as props to ProductSection below (loading=true shows skeletons)
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'spartan', sans-serif; }
        body { width: 100%; }
      `}</style>

      <Header />
      <Hero />
      <Features />

      <ProductSection
        title="Featured Products"
        subtitle="Summer Collection New Modern Design"
        products={FEATURED_PRODUCTS}   /* ← swap with API state */
        loading={false}                /* ← set true while fetching */
      />

      <Banner />

      <ProductSection
        title="New Arrivals"
        subtitle="Summer Collection New Modern Design"
        products={NEW_ARRIVALS}        /* ← swap with API state */
        loading={false}                /* ← set true while fetching */
      />

      <SmBanner />
      <Banner3 />
      <Newsletter />
      <Footer />
    </>
  );
}
