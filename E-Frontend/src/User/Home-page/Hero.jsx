import heroImg from "../../img/hero4.png";
import buttonImg from "../../img/button.png";

function Hero() {
  return (
    <section style={{
   backgroundImage: `url(${heroImg})`,
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
       backgroundImage: `url(${buttonImg})`,
        backgroundColor: "transparent", color: "#088178",
        border: 0, paddingTop: 10, paddingLeft: 80, paddingBottom: 15, paddingRight: 80,
        backgroundRepeat: "no-repeat", cursor: "pointer", fontWeight: 700, fontSize: 15,
      }}>
        Shop Now
      </button>
    </section>
  );
   }

   export default Hero;