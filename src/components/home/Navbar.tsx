import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { GoSignIn } from "react-icons/go";

const Navbar: React.FC = () => {
  return (
    <div className="min-h-12 w-full flex items-center justify-between bg-gradient-to-r from-gray-900 to-purple-800 sticky top-0 shadow-lg z-50 py-4 px-4 sm:px-6 sm:py-6
  md:px-9 md:py-7">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-auto cursor-pointer sm:h-10 md:h-12 lg:h-12"
        />
      </Link>

     {/* <Link
        to="/login"
        className="
          flex items-center 
          gap-1 sm:gap-2
          text-white font-semibold
          hover:text-yellow-400
          transition
          text-xl sm:text-2xl md:text-3xl lg:text-3xl
        "
      >
        <GoSignIn className="text-lg sm:text-xl md:text-2xl" />
        <span>Login</span>
    </Link> */}

    </div>
  );
};

export default Navbar;