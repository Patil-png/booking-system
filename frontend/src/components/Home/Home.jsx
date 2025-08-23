import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaUserFriends, FaAward, FaMapPin, FaUtensils, FaSpa, FaWifi, FaParking, FaBed, FaCoffee, FaSearchPlus, FaQuoteRight, FaPlay, FaPause } from "react-icons/fa";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import "./Home.css";

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Data for the new sections
  const sections = [
    {
      title: "⚡ Fast & Modern",
      desc: "Experience blazing-fast load times and seamless animations powered by React & Tailwind.",
    },
    {
      title: "🎨 Beautiful Design",
      desc: "Crafted with smooth scroll-triggered animations that bring your UI to life.",
    },
    {
      title: "🚀 AI Powered",
      desc: "Integrate AI-driven development tools that make your workflow 5x faster.",
    },
  ];

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const scale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  // Demo data for stats
  const heroStats = [
    { icon: <FaStar className="text-transparent bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-2xl xs:text-3xl md:text-4xl drop-shadow-lg" />, value: "4.9", label: "Guest Rating" },
    { icon: <FaUserFriends className="text-transparent bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-2xl xs:text-3xl md:text-4xl drop-shadow-lg" />, value: "10K+", label: "Happy Guests" },
    { icon: <FaAward className="text-transparent bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-2xl xs:text-3xl md:text-4xl drop-shadow-lg" />, value: "25+", label: "Awards Won" },
    { icon: <FaMapPin className="text-transparent bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-2xl xs:text-3xl md:text-4xl drop-shadow-lg" />, value: "Prime", label: "Location" },
  ];

  // Customer journey steps
  const journeySteps = [
    {
      title: "Discover",
      description: "Browse our luxurious rooms and find your perfect stay",
      icon: <FaSearchPlus className="text-4xl text-[#1a1611]" />,
      videoTime: 0
    },
    {
      title: "Book",
      description: "Seamless booking process with instant confirmation",
      icon: <FaBed className="text-4xl text-[#1a1611]" />,
      videoTime: 3
    },
    {
      title: "Arrive",
      description: "Welcome to unparalleled luxury and comfort",
      icon: <FaAward className="text-4xl text-[#1a1611]" />,
      videoTime: 6
    },
    {
      title: "Enjoy",
      description: "Experience world-class amenities and service",
      icon: <FaStar className="text-4xl text-[#1a1611]" />,
      videoTime: 9
    }
  ];

  // Add testimonials array
  const testimonials = [
    {
      text: "Absolutely exceptional service! The attention to detail and luxury amenities exceeded all my expectations. The spa was divine and the staff went above and beyond to make my stay memorable.",
      author: "Sarah Mitchell",
      role: "Business Executive",
      location: "New York, USA",
    },
    {
      text: "I've stayed at luxury hotels worldwide, but StayLuxe sets a new standard. The Presidential Suite was breathtaking, and the concierge service was impeccable. Truly a five-star experience.",
      author: "James Rodriguez",
      role: "Travel Blogger",
      location: "Barcelona, Spain",
    },
    {
      text: "Our wedding celebration at StayLuxe was magical. The event coordination was flawless, the venue was stunning, and every guest was thoroughly impressed. Highly recommend for special occasions.",
      author: "Emily Chen",
      role: "Wedding Planner",
      location: "Singapore",
    },
  ];

  // New data for more amenities
  const moreAmenities = [
    { icon: <FaUtensils />, title: "Entertainment Center", desc: "Gaming lounge and entertainment facilities" },
    { icon: <FaBed />, title: "Kids Club", desc: "Safe and fun activities for children" },
    { icon: <FaCoffee />, title: "Business Center", desc: "Fully equipped workspace and meeting rooms" },
    { icon: <FaStar />, title: "VIP Services", desc: "Personalized concierge and luxury services" },
    { icon: <FaMapPin />, title: "Express Check-in", desc: "Skip the lines with priority service" },
  ];

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Floating elements animation
  const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  // Scroll-triggered animation hook
  const useScrollAnimation = () => {
    return {
      initial: { opacity: 0, y: 60 },
      whileInView: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99]
        }
      },
      viewport: { once: true, margin: "-100px" }
    };
  };

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    if (fadeElements.length > 0) {
      gsap.fromTo(
        fadeElements,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: fadeElements,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="font-sans min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e0] overflow-x-hidden">
      {/* HERO SECTION WITH PARALLAX */}
      <motion.section
        className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden font-sans bg-gradient-to-br from-[#1a1611] via-[#2d2419] to-[#3d2c1e]"
        style={{ y: y1 }}
      >
        {/* Background with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale, opacity }}
        >
          <img 
            src="/RoomImages/hero.png" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover" 
            style={{objectPosition: 'center'}} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1611]/70 via-[#2d2419]/85 to-[#0f0d0a]/95"></div>
          {/* Dynamic Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 70%)",
              mixBlendMode: "overlay"
            }}
          />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#d4af37]/30 to-[#ffd700]/20 rounded-full shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 w-full flex flex-col items-center justify-center pt-16 pb-8 px-4 sm:pt-24 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <h1 className="font-serif font-extrabold uppercase tracking-tight leading-tight text-white drop-shadow-lg text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2" style={{textShadow: '0 4px 24px #000, 0 2px 0 #b88a2b'}}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#f4e4bc] bg-clip-text text-transparent" style={{textShadow: '0 2px 8px #d4af37'}}
              >
                Luxury Redefined
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="font-sans text-base xs:text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mt-2 mb-8 font-light tracking-wide text-[#ede6dd] leading-relaxed drop-shadow" 
            style={{textShadow: '0 2px 12px rgba(0,0,0,0.8)'}}
          >
            Indulge in unparalleled comfort and sophistication at our award-winning hotel, where every moment becomes a cherished memory.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col w-full max-w-xs gap-3 sm:flex-row sm:max-w-none sm:w-auto sm:gap-6 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px rgba(212, 175, 55, 0.6)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1611] px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-base xs:text-lg sm:text-xl shadow-2xl hover:from-[#ffd700] hover:to-[#f4e4bc] border-2 border-[#d4af37] hover:border-[#f4e4bc] transition-all duration-500"
              onClick={() => window.location.href = '/room-booking'}
            >
              Book Your Stay
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px rgba(244, 228, 188, 0.5)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#f4e4bc]/90 to-[#faf8f5] text-[#2d2419] px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-base xs:text-lg sm:text-xl shadow-2xl border-2 border-[#d4af37]/50 hover:bg-gradient-to-r hover:from-[#faf8f5] hover:to-[#f4e4bc] hover:text-[#1a1611] transition-all duration-500"
              onClick={() => window.location.href = '/Rooms'}
            >
              Explore Rooms
            </motion.button>
          </motion.div>
        </div>

        {/* ENHANCED STATS CARDS */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-20 w-full flex justify-center pb-8 px-2"
        >
          <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-8 w-full max-w-xs sm:max-w-5xl sm:grid-cols-4">
            {[0,1,3,'best'].map((idx, i) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-[#1a1611]/90 via-[#2d2419]/85 to-[#0f0d0a]/90 backdrop-blur-md rounded-2xl p-3 xs:p-4 sm:p-6 flex flex-col items-center shadow-2xl border border-[#d4af37]/40 min-w-0"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 30px 60px rgba(212, 175, 55, 0.3)"
                }}
              >
                <FloatingElement delay={i * 0.5}>
                  {idx === 'best' ? (
                    <>
                      <FaStar className="text-transparent bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-2xl xs:text-3xl md:text-4xl drop-shadow-lg" />
                      <div className="text-base xs:text-lg sm:text-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent mt-1 xs:mt-2">Best Rooms</div>
                      <div className="text-xs xs:text-sm sm:text-base text-[#f4e4bc] mt-0.5 xs:mt-1">Top-rated luxury suites</div>
                    </>
                  ) : (
                    <>
                      <div>{heroStats[idx].icon}</div>
                      <div className="text-base xs:text-lg sm:text-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent mt-1 xs:mt-2">{heroStats[idx].value}</div>
                      <div className="text-xs xs:text-sm sm:text-base text-[#f4e4bc] mt-0.5 xs:mt-1">{heroStats[idx].label}</div>
                    </>
                  )}
                </FloatingElement>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#d4af37]/70 rounded-full flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-[#d4af37] to-[#ffd700] rounded-full mt-2 shadow-lg"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CUSTOMER JOURNEY VIDEO SECTION */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-[#0a0806] via-[#1a1611] to-[#0f0d0a] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-gradient-to-r from-[#d4af37]/20 to-[#ffd700]/20 text-[#d4af37] text-sm font-semibold px-4 py-1 rounded-full mb-4 border border-[#d4af37]/30">Customer Journey</span>
            <h2 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              From Booking to <span className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent">Bliss</span>
            </h2>
            <p className="text-[#c4b59a] max-w-2xl mx-auto text-lg">
              Watch how our guests transform from travelers to cherished memories
            </p>
          </motion.div>

          {/* Video Container with Custom Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#1a1611] via-[#2d2419] to-[#0f0d0a] rounded-3xl overflow-hidden shadow-2xl border border-[#d4af37]/20"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-3xl"
                poster="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                style={{ height: '60vh', minHeight: '400px' }}
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/80 via-transparent to-[#1a1611]/40 rounded-3xl" />
              
              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleVideoPlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#d4af37]/95 to-[#ffd700]/90 hover:from-[#ffd700] hover:to-[#f4e4bc] text-[#1a1611] p-6 rounded-full shadow-2xl backdrop-blur-sm border border-[#d4af37]/50"
              >
                {isVideoPlaying ? <FaPause className="text-3xl" /> : <FaPlay className="text-3xl ml-1" />}
              </motion.button>

              {/* Video Title Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">The StayLuxe Experience</h3>
                <p className="text-[#c4b59a]">A journey of comfort, luxury, and unforgettable moments</p>
              </div>
            </div>
          </motion.div>

          {/* Journey Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[#d4af37] via-[#ffd700] to-[#f4e4bc] rounded-full flex items-center justify-center shadow-2xl border border-[#d4af37]/30"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#c4b59a] text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURES GRID WITH ENHANCED ANIMATIONS */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e0] px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#d4af37] to-[#ffd700] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-[#8b6914] to-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-gradient-to-r from-[#f4e4bc]/80 to-[#faf8f5] text-[#8b6914] text-sm font-semibold px-4 py-1 rounded-full mb-4 border border-[#d4af37]/30 shadow-lg">Premium Services</span>
            <h2 className="font-extrabold text-[#222] text-3xl sm:text-4xl md:text-5xl leading-tight text-center mb-4">
              Why Choose <span className="bg-gradient-to-r from-[#8b6914] to-[#d4af37] bg-clip-text text-transparent">StayLuxe</span>
            </h2>
            <p className="text-[#5a4f3a] mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
              Discover the exceptional features and services that make us the premier choice for discerning travelers seeking luxury and comfort.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaUtensils />, title: "Fine Dining", desc: "Award-winning restaurants with world-class cuisine.", badge: "Michelin Star", color: "from-red-500 to-orange-500" },
              { icon: <FaSpa />, title: "Spa & Wellness", desc: "Rejuvenating treatments and wellness programs.", badge: "Premium", color: "from-emerald-600 to-teal-600" },
              { icon: <FaCoffee />, title: "Fitness Center", desc: "State-of-the-art equipment and personal trainers.", badge: "24/7", color: "from-blue-600 to-cyan-600" },
              { icon: <FaWifi />, title: "High-Speed WiFi", desc: "Complimentary ultra-fast internet throughout.", badge: "Free", color: "from-purple-600 to-pink-600" },
              { icon: <FaParking />, title: "Valet Parking", desc: "Complimentary valet service for all guests.", badge: "Included", color: "from-amber-600 to-orange-600" },
              { icon: <FaBed />, title: "24/7 Security", desc: "Round-the-clock security for your peace of mind.", badge: "Secure", color: "from-slate-600 to-gray-700" },
              { icon: <FaUtensils />, title: "Room Service", desc: "Gourmet dining delivered to your door anytime.", badge: "24/7", color: "from-indigo-600 to-purple-600" },
              { icon: <FaCoffee />, title: "Housekeeping", desc: "Daily housekeeping with luxury amenities.", badge: "Daily", color: "from-rose-600 to-pink-600" },
            ].map((f, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 30px 60px rgba(139, 105, 20, 0.2)"
                }}
                className="bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] rounded-2xl border border-[#d4af37]/20 shadow-xl p-6 flex flex-col items-center relative min-h-[280px] group overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="absolute top-4 right-4 z-10">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1611] text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-[#d4af37]/30"
                  >
                    {f.badge}
                  </motion.span>
                </div>
                
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#8b6914] via-[#d4af37] to-[#ffd700] mb-6 shadow-xl relative z-10 border border-[#d4af37]/30"
                >
                  {React.cloneElement(f.icon, { className: "text-white text-3xl" })}
                </motion.div>
                
                <h3 className="font-bold text-[#222] text-xl mb-3 text-center relative z-10">{f.title}</h3>
                <p className="text-[#5a4f3a] text-center leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HIGHLIGHTS SECTION WITH PARALLAX */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <motion.div 
          style={{ y: y2 }}
          className="absolute inset-0 opacity-5"
        >
          <img src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg" alt="Background" className="w-full h-full object-cover" />
        </motion.div>

        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-gradient-to-r from-[#f4e4bc]/80 to-[#faf8f5] text-[#8b6914] text-sm font-semibold px-4 py-1 rounded-full mb-4 border border-[#d4af37]/30 shadow-lg">Premium Amenities</span>
            <h2 className="font-extrabold text-[#222] text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              Unparalleled <span className="bg-gradient-to-r from-[#8b6914] to-[#d4af37] bg-clip-text text-transparent">Luxury</span>
            </h2>
            <p className="text-[#5a4f3a] max-w-3xl mx-auto text-lg leading-relaxed">
              Immerse yourself in a world of sophistication with our carefully curated amenities designed to exceed your every expectation.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {[
            {
              image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
              title: "Presidential Suite",
              description: "Ultimate luxury with panoramic city views.",
              badge: "Exclusive",
              tags: ["3000 sq ft", "Private Terrace", "Butler Service"]
            },
            {
              image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
              title: "Gourmet Dining",
              description: "World-class cuisine by renowned chefs.",
              badge: "Award Winning",
              tags: ["Michelin Star", "Wine Cellar", "Private Dining"]
            },
            {
              image: "https://images.pexels.com/photos/3757441/pexels-photo-3757441.jpeg",
              title: "Luxury Spa",
              description: "Rejuvenating treatments and wellness programs.",
              badge: "Premium",
              tags: ["Healing Therapies", "Infinity Pool", "Meditation Garden"]
            }
          ].map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 35px 70px rgba(139, 105, 20, 0.25)"
              }}
              className="bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] rounded-2xl shadow-xl border border-[#d4af37]/20 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={highlight.image} 
                  alt={highlight.title} 
                  className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1611]/60 to-transparent group-hover:from-[#1a1611]/80 transition-all duration-500" />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/10"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1611] text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-[#d4af37]/30">
                    {highlight.badge}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#8b6914] to-[#d4af37] bg-clip-text text-transparent">{highlight.title}</h3>
                <p className="text-[#2d2419]/80 mb-4 leading-relaxed">{highlight.description}</p>
                <div className="flex flex-wrap gap-2">
                  {highlight.tags.map((tag, tagIdx) => (
                    <motion.span
                      key={tagIdx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-[#f4e4bc]/80 to-[#ede8e0] text-[#2d2419] text-xs px-3 py-1 rounded-full font-medium border border-[#d4af37]/20"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* MORE AMENITIES SECTION WITH STAGGER ANIMATION */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e0] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] rounded-3xl p-8 md:p-16 shadow-2xl border border-[#d4af37]/20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-extrabold text-[#222] text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              And Much More...
            </h2>
            <p className="text-[#5a4f3a] max-w-2xl mx-auto text-lg">
              Discover additional services and facilities that make your stay extraordinary
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {moreAmenities.map((a, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03, 
                  x: 10,
                  boxShadow: "0 15px 40px rgba(139, 105, 20, 0.2)"
                }}
                className="bg-gradient-to-r from-white to-[#fefdfb] rounded-xl p-6 flex items-center gap-4 shadow-lg border border-[#d4af37]/20 group"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#8b6914] to-[#d4af37] group-hover:from-[#d4af37] group-hover:to-[#ffd700] transition-all duration-300 shadow-lg"
                >
                  {React.cloneElement(a.icon, { className: "text-white group-hover:text-[#1a1611] text-xl transition-colors duration-300" })}
                </motion.div>
                <div>
                  <div className="font-bold text-[#222] text-lg mb-1">{a.title}</div>
                  <div className="text-sm text-[#5a4f3a]">{a.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 25px 50px rgba(139, 105, 20, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#8b6914] via-[#d4af37] to-[#ffd700] text-[#1a1611] font-bold px-8 py-4 rounded-full shadow-xl hover:from-[#d4af37] hover:to-[#f4e4bc] transition-all duration-500 text-lg border border-[#d4af37]/30"
              onClick={() => window.location.href = '/gallery'}
            >
              View Complete Amenities List
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS WITH FLOATING CARDS */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-[#faf8f5] via-white to-[#f5f2ed] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-gradient-to-r from-[#f4e4bc]/80 to-[#faf8f5] text-[#8b6914] text-sm font-semibold px-4 py-1 rounded-full mb-4 border border-[#d4af37]/30 shadow-lg">Guest Reviews</span>
            <h2 className="font-extrabold text-[#222] text-3xl sm:text-4xl md:text-5xl leading-tight">
              What Our Guests<br />
              <span className="bg-gradient-to-r from-[#8b6914] to-[#d4af37] bg-clip-text text-transparent">Say</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <FloatingElement key={idx} delay={idx * 0.25} duration={6 + idx}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 30px 60px rgba(139, 105, 20, 0.2)"
                }}
                className="bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] rounded-2xl border border-[#d4af37]/20 shadow-xl p-6 flex flex-col justify-between h-full relative overflow-hidden group"
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-bl-full" />
                
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <FaQuoteRight className="text-[#d4af37] text-2xl" />
                  </motion.div>
                  <div className="flex gap-1 text-[#d4af37] text-lg">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.05 }}
                      >
                        <FaStar />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <p className="italic text-[#2d2419] mb-6 leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-r from-[#8b6914] to-[#d4af37] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg border border-[#d4af37]/30"
                  >
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#222]">{testimonial.author}</span>
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1611] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#d4af37]/30">Verified</span>
                    </div>
                    <div className="text-xs text-[#5a4f3a] mt-0.5">
                      {testimonial.role}<br />{testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FloatingElement>
          ))}
        </div>
      </motion.section>

      {/* CTA SECTION WITH MAGNETIC EFFECT */}
      <motion.section
        {...useScrollAnimation()}
        className="py-20 bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center rounded-3xl shadow-2xl border border-[#d4af37]/20 p-8 sm:p-16 bg-gradient-to-br from-white via-[#fefdfb] to-[#faf8f5] relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#d4af37] to-[#ffd700] rounded-full shadow-lg"
            />
            <motion.div
              animate={{ 
                x: [0, -100, 0],
                y: [0, -50, 0],
                rotate: [360, 180, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-[#8b6914] to-[#d4af37] rounded-full shadow-lg"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#2d2419]">
              Ready to Create Your Own <span className="bg-gradient-to-r from-[#8b6914] to-[#d4af37] bg-clip-text text-transparent">Story?</span>
            </h2>
            <p className="mb-8 text-[#5a4f3a] text-lg leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied guests and experience the luxury that has earned us countless five-star reviews and recommendations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 w-full max-w-xs mx-auto sm:flex-row sm:max-w-none sm:w-auto sm:gap-6 justify-center relative z-10"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px rgba(139, 105, 20, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#8b6914] via-[#d4af37] to-[#ffd700] text-[#1a1611] font-bold px-8 py-4 rounded-full shadow-xl hover:from-[#d4af37] hover:to-[#f4e4bc] transition-all duration-500 text-lg border border-[#d4af37]/30"
              onClick={() => window.location.href = '/room-booking'}
            >
              Book Your Stay Now
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 fade-in">About Us</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Founded in 2000, our hotel has been a beacon of luxury and comfort for travelers worldwide. We pride ourselves on delivering exceptional service and creating unforgettable experiences for every guest.
            </p>
            <p className="text-gray-700">
              Our commitment to excellence is reflected in every detail, from our meticulously designed rooms to our world-class amenities and personalized services. We believe in creating a home away from home, where every stay is a journey of relaxation and indulgence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="About Us"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-100">
        © {new Date().getFullYear()} Your Brand. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
