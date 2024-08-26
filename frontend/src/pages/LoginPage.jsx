import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		
		<motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className='z-10 max-w-md w-full bg-gray-900 bg-opacity-50  text-white rounded-xl shadow-md p-8'
>
  <h2 className='text-3xl font-bold mb-6 text-center text-white'>
    Welcome Back
  </h2>
  <form onSubmit={handleLogin}>
    <Input
      icon={Mail}
      type='email'
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='mb-4'
    />
    <Input
      icon={Lock}
      type='password'
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className='mb-4'
    />
    <div className='flex items-center justify-between mb-6'>
      <Link to='/forgot-password' className='text-sm text-blue-400'>
        Forgot password?
      </Link>
    </div>
    {error && <p className='text-red-500 mb-4'>{error}</p>}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md text-white font-semibold'
      type='submit'
      disabled={isLoading}
    >
      {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
    </motion.button>
  </form>
  <div className='mt-6 text-center'>
    <p className='text-gray-400'>
      Don't have an account?{" "}
      <Link to='/signup' className='text-blue-400 underline'>
        Sign up
      </Link>
    </p>
  </div>
</motion.div>

	);
};
export default LoginPage;
