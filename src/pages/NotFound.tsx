import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden">
      {/* تأثير خطوط متحركة */}
      <div className="absolute inset-0">
        <div className="animate-ping-slow absolute bg-white opacity-10 rounded-full w-96 h-96 top-[-10%] left-[-10%]" />
        <div className="animate-ping-slow absolute bg-white opacity-10 rounded-full w-72 h-72 top-[20%] left-[70%]" />
        <div className="animate-ping-slow absolute bg-white opacity-10 rounded-full w-80 h-80 top-[60%] left-[30%]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-[10rem] md:text-[15rem] font-extrabold text-white drop-shadow-2xl animate-bounce">
          404
        </h1>
        <p className="text-2xl md:text-4xl text-white mb-8 animate-fade-in">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          Return Home
        </a>
      </div>

      {/* إضافات جمالية */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
    </div>
  );
};

export default NotFound;
