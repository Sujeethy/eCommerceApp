import { Navigate, Route, Routes } from "react-router-dom";
import GradientBackground from "./components/GradientBackground";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Sidebar from "./components/SideBar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};
const WrapperWithSideBar = ({ children }) => {
	
	return( <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
		<div className="fixed inset-0 z-0">
		  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
		  <div className="absolute inset-0 backdrop-blur-sm" />
		</div>
  
		<Sidebar />
		{children}
		
		</div> )
}
const WrapperWithGradient =({ children }) => {
	return(
	<div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
		<GradientBackground />
		
		{children  }
		
        
    </div>)
}
// Redirect authenticated users to the home page if they are already logged in
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};


function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<>
		    
			<Routes>
				{/* Dashboard Page doesn't need the wrapper */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<WrapperWithSideBar >
							<DashboardPage />
							</WrapperWithSideBar>
							
						</ProtectedRoute>
					}
				/>
				<Route
					path='/cart'
					element={
						<ProtectedRoute>
							<WrapperWithSideBar>
							<CartPage />
							</WrapperWithSideBar>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/orders'
					element={
						<ProtectedRoute>
							<WrapperWithSideBar>
                            <OrdersPage />
                            </WrapperWithSideBar>
						</ProtectedRoute>
					}
				/>

				{/* Routes that need the wrapper */}
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<WrapperWithGradient>
								<SignUpPage />
							</WrapperWithGradient>
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<WrapperWithGradient>
								<LoginPage />
							</WrapperWithGradient>
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={
					
					<WrapperWithGradient>
						
						
						<EmailVerificationPage />
						</ WrapperWithGradient>
					
					
					} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<WrapperWithGradient>
								<ForgotPasswordPage />
							</WrapperWithGradient>
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<WrapperWithGradient>
								<ResetPasswordPage />
							</WrapperWithGradient>
						</RedirectAuthenticatedUser>
					}
				/>
				{/* Catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

			{/* Toast notifications */}
			<Toaster />
		</>
	);
}

export default App;
