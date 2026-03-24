import FeatureBox from "./FeaturedBox";


import f1 from '../../img/f1.png';
import f2 from '../../img/f2.png';
import f3 from '../../img/f3.png';
import f5 from '../../img/f5.png';




function Features() {
  const items = [
    { img: f1, label: "Free shipping" },
    { img: f2, label: "Online Order" },
    { img: f3, label: "save Money" },
    { img: f5, label: "24/7 Support" },
  ];

  return (
    <section style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", padding: "40px 80px",
    }}>
      {items.map(({ img, label }, i) => (
        <FeatureBox key={label} img={img} label={label} bg={FeatureBox[i]} />
      ))}
    </section>
  );
 }

 export default Features