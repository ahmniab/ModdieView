import { useState } from "react";
import type { ChangeEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const SignUpPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border-l-4 border-purple-300">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create your account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
  <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

  <input
    type="text"
    placeholder="Your name"
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

        {/* Email */}
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

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>

          <div className="relative">
  <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

  <input
    type="password"
    placeholder="Password"
    className="
      w-full pl-10 pr-4 py-3 rounded-lg
      bg-gray-800 text-white
      border border-gray-700
      focus:outline-none
      focus:ring-2 focus:ring-purple-600
      focus:border-transparent
    "
  />

            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-purple-500
                  transition
                "
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>

          <div className="relative">
  <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

  <input
    type="password"
    placeholder="Confirm Password"
    className="
      w-full pl-10 pr-4 py-3 rounded-lg
      bg-gray-800 text-white
      border border-gray-700
      focus:outline-none
      focus:ring-2 focus:ring-purple-600
      focus:border-transparent
    "
  />

            {confirmPassword && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-purple-500
                  transition
                "
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          className="w-full py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-600 transition mb-4 cursor-pointer"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-gray-300 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-purple-500 cursor-pointer hover:underline">
                Sign in
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;