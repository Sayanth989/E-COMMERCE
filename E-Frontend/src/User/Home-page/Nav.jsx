import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <section className="flex items-center justify-between px-[80px] py-[20px] bg-[#f3f3f3] shadow-[5px_-6px_15px_rgba(0,0,0,0.06)] sticky top-0 left-0 z-[999]">
        
        {/* Logo */}
        <a href="#">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="h-[40px]"
            onError={(e) => (e.target.style.display = "none")}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex items-center list-none m-0 p-0">
            {["home", "shop", "blog", "about", "contact"].map((item, i) => (
              <li key={item} className="px-[20px] relative">
                <a
                  href="#"
                  className={`text-[16px] font-semibold text-[#4a4c4c] transition duration-300 ${
                    i === 0 ? "text-[#4d7947]" : ""
                  } hover:text-[#4d7947]`}
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Cart */}
            <li className="px-[20px]">
              <a href="#" className="text-[#4a4c4c]">
                <i className="fa-solid fa-cart-shopping" />
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center">
          <a href="#" className="text-[#1a1a1a]">
            <i className="fa-solid fa-cart-shopping" />
          </a>

          <i
            className="fa-solid fa-square-caret-down text-[24px] pl-[10px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </section>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[80px] right-0 h-screen w-[300px] bg-[#E6E3F3] shadow-[0_40px_60px_rgba(0,0,0,0.1)] p-[80px_0_0_10px] z-[998] flex flex-col gap-[22px]">
          {["Home", "Shop", "Cart", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[16px] font-semibold text-[#4a4c4c] hover:text-[#4d7947]"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Header;