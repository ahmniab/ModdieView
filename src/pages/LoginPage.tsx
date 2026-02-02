import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border-l-4 border-purple-300">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Sign in to your account
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <MdOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="
                w-full pl-10 pr-4 py-3 rounded-lg
                bg-gray-800 text-white
                border border-gray-700
                focus:outline-none
                focus:ring-2 focus:ring-purple-600
                focus:border-transparent
              "
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          
          <div className="relative">
            <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full pl-10 pr-4 py-3 rounded-lg
                bg-gray-800 text-white
                border border-gray-700
                focus:outline-none
                focus:ring-2 focus:ring-purple-600
                focus:border-transparent
              "
            />

            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-purple-500
                  transition
                "
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} /> }
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-0 mb-7 text-sm">
          
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              className="
                w-4 h-4
                rounded
                bg-gray-800
                border border-gray-600
                accent-purple-600
                cursor-pointer
              "
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-purple-400 hover:text-purple-300 hover:underline transition"
          >
            Forgot password?
          </button>

        </div>


        <button
          className="w-full py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-600 transition mb-4 cursor-pointer"
        >
          Sign In
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <button
          className="w-full py-3 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition mb-3 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5"
          />
          Sign in with Google
        </button>

        <button
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-3 hover:bg-blue-500 transition cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="h-5"
          />
          Sign in with Facebook
        </button>

        <p className="text-gray-300 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-purple-500 cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;