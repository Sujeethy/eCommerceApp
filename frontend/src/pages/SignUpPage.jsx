import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.4, ease: "easeInOut" }}
			className='z-10 max-w-md w-full bg-gray-900 text-white rounded-xl shadow-md p-8'
		>
			<h2 className='text-3xl font-bold mb-6 text-center text-white'>
				Create Account
			</h2>
			<form onSubmit={handleSignUp}>
				<Input
					icon={User}
					type='text'
					placeholder='Full Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='mb-4'
				/>
				<Input
					icon={Mail}
					type='email'
					placeholder='Email Address'
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
				<PasswordStrengthMeter password={password} />
				{error && <p className='text-red-500 mb-4'>{error}</p>}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md text-white font-semibold mt-6'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader className='w-6 h-6 animate-spin mx-auto' />
					) : (
						"Sign Up"
					)}
				</motion.button>
			</form>
			<div className='mt-6 text-center'>
				<p className='text-gray-400'>
					Already have an account?{" "}
					<Link to='/login' className='text-blue-400 underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default SignUpPage;
