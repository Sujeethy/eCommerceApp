import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='z-10 max-w-md w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-70 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-semibold mb-6 text-center text-white'>
					Reset Password
				</h2>
				<p className='text-center text-gray-400 mb-6'>
					Please enter your new password below.
				</p>
				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="mb-4"
					/>
					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					{message && <p className='text-green-500 font-semibold mt-2'>{message}</p>}

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading}
						className='w-full py-3 px-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-semibold rounded-md shadow-lg hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
					>
						{isLoading ? "Resetting..." : "Reset Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default ResetPasswordPage;
