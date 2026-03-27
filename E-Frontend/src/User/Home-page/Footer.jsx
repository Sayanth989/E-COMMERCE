import React from "react";
import pay from "../../img/pay.png";
import app from "../../img/app.jpg";
import Play from "../../img/play.jpg"
import logo from "../../img/logo.png"




import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between  p-8 text-sm text-gray-800 mt-20">

      {/* Column 1 */}
      <div className="flex flex-col mb-6">
        <img src={logo} alt="logo" className="mb-6 w-28" />

        <h4 className="font-semibold mb-4">Contact</h4>
        <p><strong>Address:</strong> 567 Willy Road, Street 78, New York</p>
        <p><strong>Phone:</strong> +08 22223 369 / +92-999933 369</p>
        <p><strong>Open:</strong> 10:00 - 11:00, Mon - Friday</p>

        <div className="mt-5">
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-3 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-teal-600" />
            <FaTwitter className="cursor-pointer hover:text-teal-600" />
            <FaInstagram className="cursor-pointer hover:text-teal-600" />
            <FaPinterest className="cursor-pointer hover:text-teal-600" />
            <FaYoutube className="cursor-pointer hover:text-teal-600" />
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col mb-6">
        <h4 className="font-semibold mb-4">About</h4>
        <a href="#" className="mb-2 hover:text-teal-600">About Us</a>
        <a href="#" className="mb-2 hover:text-teal-600">Delivery Information</a>
        <a href="#" className="mb-2 hover:text-teal-600">Privacy Policy</a>
        <a href="#" className="mb-2 hover:text-teal-600">Terms & Conditions</a>
        <a href="#" className="mb-2 hover:text-teal-600">Contact Us</a>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col mb-6">
        <h4 className="font-semibold mb-4">My Account</h4>
        <a href="#" className="mb-2 hover:text-teal-600" path='/signup'>Sign In</a>
        <a href="#" className="mb-2 hover:text-teal-600">View Cart</a>
        <a href="#" className="mb-2 hover:text-teal-600">My Wishlist</a>
        <a href="#" className="mb-2 hover:text-teal-600">Track My Order</a>
        <a href="#" className="mb-2 hover:text-teal-600">Help</a>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col mb-6">
        <h4 className="font-semibold mb-4">Install App</h4>
        <p className="mb-3">From App Store or Google Play</p>

        <div className="flex gap-3 mb-3">
          <img src={app} alt="app" className="w-24 border rounded-md cursor-pointer" />
          <img src={Play} alt="play" className="w-24 border rounded-md cursor-pointer" />
        </div>

        <p>Secured Payment Gateways</p>
        <img src={pay} alt="payment" className="mt-3 w-32" />
      </div>

    </footer>
  );
};

export default Footer;