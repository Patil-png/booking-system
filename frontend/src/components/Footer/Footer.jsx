import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#05080e] text-white pt-11 pb-7 font-'Montserrat'">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl text-white font-bold mb-4">Gouri Inn</h2>
          <p className="text-sm font-semibold text-font_footer">
            A luxurious stay in the heart of the city. Experience elegance,
            comfort, and great service.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">Quick Links</h3>
          <ul
            className="space-y-2 text-sm font-semibold text-font_footer relative inline-block pb-1  text-gray-800
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:w-0 after:bg-primary after:transition-all after:duration-300
    hover:after:w-full hover:text-primary"
          >
            <li>
              <a
                className="text-font_footer relative inline-block pb-1 font-semibold 
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:w-0 after:bg-primary after:transition-all after:duration-300
    hover:after:w-full hover:text-primary"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-font_footer relative inline-block pb-1 font-semibold 
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:w-0 after:bg-primary after:transition-all after:duration-300
    hover:after:w-full hover:text-primary"
                href="/rooms"
              >
                Rooms
              </a>
            </li>
            <li>
              <a
                className="text-font_footer relative inline-block pb-1 font-semibold 
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:w-0 after:bg-primary after:transition-all after:duration-300
    hover:after:w-full hover:text-primary"
                href="/contact"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                className="text-font_footer  hover:text-primary "
                href="/gallery"
              >
                Images & Amenities
              </a>
            </li>
            <li>
              <a
                className="text-font_footer relative inline-block pb-1 font-semibold mt-1
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:w-0 after:bg-primary after:transition-all after:duration-300
    hover:after:w-full hover:text-primary"
                href="/book"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl  text-white font-semibold mb-4">
            Connect with us
          </h3>
          <p className="text-sm font-semibold text-font_footer mb-2">
            NH 6, New By-pass Nagpur Road, Rahatgaon, Amravati, 444602, India
          </p>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm font-semibold text-font_footer mb-2 hover:text-purple-300 transition-colors group"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <FiPhoneCall className="text-sm text-purple-300 group-hover:text-yellow-300 transition-colors" />
            </motion.span>
            <span>Phone: +91 98765 43210</span>
          </a>
          <a
            href="mailto:info@gouriinn.com"
            className="flex items-center gap-2 text-sm font-semibold text-font_footer mb-4 hover:text-purple-300 transition-colors group"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="inline-flex"
            >
              <MdEmail className="text-sm text-purple-300 group-hover:text-yellow-300 transition-colors" />
            </motion.span>
            <span>Email: info@gouriinn.com</span>
          </a>
          {/* Social Media Icons */}
          <div className="flex font-semibold  space-x-4 text-lg mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white p-2 shadow-md transition-colors duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-white text-pink-500 rounded-full hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-400 hover:text-white p-2 shadow-md transition-colors duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="bg-white text-blue-800 rounded-full hover:bg-blue-800 hover:text-white p-2 shadow-md transition-colors duration-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">
            Our Location
          </h3>
          <div className="w-full h-48 overflow-hidden rounded-xl border  border-gray-400">
            <iframe
    title="Hotel Location"
    width="100%"
    height="100%"
    frameBorder="0"
    style={{ border: 0 }}
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB1diwHUik-NSeUlgnXqhqOl_-i_2yJzoU&q=Gourii+Inn+Hotel+YourCity"
    allowFullScreen
  ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Gouri Inn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


// import React from "react";
// import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { FiPhoneCall } from "react-icons/fi";
// import { MdEmail } from "react-icons/md";

// const Footer = () => {
//   return (
//     <footer className="bg-[#05080e] text-white pt-11 pb-7 font-'Montserrat'">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Brand Info */}
//         <div>
//           <h2 className="text-2xl text-white font-bold mb-4">Gouri Inn</h2>
//           <p className="text-sm font-semibold text-font_footer">
//             A luxurious stay in the heart of the city. Experience elegance,
//             comfort, and great service.
//           </p>
//         </div>

//         {/* Navigation Links */}
//         <div>
//           <h3 className="text-xl text-white font-semibold mb-4">Quick Links</h3>
//           <ul
//             className="space-y-2 text-sm font-semibold text-font_footer relative inline-block pb-1  text-gray-800
//     after:absolute after:left-0 after:bottom-0 after:h-[2px]
//     after:w-0 after:bg-primary after:transition-all after:duration-300
//     hover:after:w-full hover:text-primary"
//           >
//             <li>
//               <a
//                 className="text-font_footer relative inline-block pb-1 font-semibold 
//     after:absolute after:left-0 after:bottom-0 after:h-[2px]
//     after:w-0 after:bg-primary after:transition-all after:duration-300
//     hover:after:w-full hover:text-primary"
//                 href="/"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 className="text-font_footer relative inline-block pb-1 font-semibold 
//     after:absolute after:left-0 after:bottom-0 after:h-[2px]
//     after:w-0 after:bg-primary after:transition-all after:duration-300
//     hover:after:w-full hover:text-primary"
//                 href="/rooms"
//               >
//                 Rooms
//               </a>
//             </li>
//             <li>
//               <a
//                 className="text-font_footer relative inline-block pb-1 font-semibold 
//     after:absolute after:left-0 after:bottom-0 after:h-[2px]
//     after:w-0 after:bg-primary after:transition-all after:duration-300
//     hover:after:w-full hover:text-primary"
//                 href="/contact"
//               >
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a
//                 className="text-font_footer  hover:text-primary "
//                 href="/gallery"
//               >
//                 Images & Amenities
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Contact & Social */}
//         <div>
//           <h3 className="text-xl  text-white font-semibold mb-4">
//             Connect with us
//           </h3>
//           <p className="text-sm font-semibold text-font_footer mb-2">
//             NH 6, New By-pass Nagpur Road, Rahatgaon, Amravati, 444602, India
//           </p>
//           <p className="text-sm font-semibold text-font_footer mb-2">
//             📞 Phone: +91 98765 43210
//           </p>
//           <div className="flex gap-1 ">
//             <MdEmail className="bg-font_footer" />
//             <p className="text-sm font-semibold text-font_footer mb-4">
//               Email: info@gouriinn.com
//             </p>
//           </div>
//           <div className="flex font-semibold  space-x-4 text-lg">
//             <a
//               href="https://facebook.com"
//               className=" bg-white text-black rounded-full hover:text-primary p-2"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="https://instagram.com"
//               className=" bg-white text-black rounded-full hover:text-font_footer p-2"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://linkedin.com"
//               className=" bg-white text-black rounded-full hover:text-font_footer p-2"
//             >
//               <FaLinkedinIn />
//             </a>
//           </div>
//         </div>

//         {/* Map */}
//         <div>
//           <h3 className="text-xl text-white font-semibold mb-4">
//             Our Location
//           </h3>
//           <div className="w-full h-48 overflow-hidden rounded-xl border  border-gray-400">
//             <iframe
//     title="Hotel Location"
//     width="100%"
//     height="100%"
//     frameBorder="0"
//     style={{ border: 0 }}
//     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB1diwHUik-NSeUlgnXqhqOl_-i_2yJzoU&q=Gourii+Inn+Hotel+YourCity"
//     allowFullScreen
//   ></iframe>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Line */}
//       <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
//         © {new Date().getFullYear()} Gouri Inn. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
