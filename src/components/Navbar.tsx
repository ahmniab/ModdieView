import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoSignIn } from "react-icons/go";

const Navbar: React.FC = () => {
  return (
    <div className="h-16 w-full flex items-center justify-between bg-gradient-to-r from-gray-900 to-purple-800 sticky top-0 shadow-lg px-10 py-12">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="h-11 w-auto cursor-pointer"
        />
      </Link>

     <Link
        to="/login"
        className="
          flex items-center gap-2
          text-white font-semibold
          hover:text-yellow-400
          transition
          text-2xl
        "
      >
        <GoSignIn className="text-2xl" />
        <span>Login</span>
    </Link>

    </div>
  );
};

export default Navbar;