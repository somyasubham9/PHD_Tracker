import React, { useState } from 'react';
// Assuming your image is located at `src/assets/login-bg.jpg`
import backgroundImage from '../../../assets/login.jpg';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex min-h-screen">
            {/* Image Container */}
            <div className="w-1/2">
                <img src={backgroundImage} alt="Login" className="object-cover w-full h-full" />
            </div>
            {/* Form Container */}
            <div className="flex items-center justify-center w-1/2 p-12 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                    
                    {/* Email Field */}
                    <div className="mt-6">
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border rounded" required />
                    </div>
                    
                    {/* Password Field */}
                    <div className="mt-4">
                        <input type="password" placeholder="Enter your password" className="w-full px-4 py-3 border rounded" required />
                    </div>
                    
                    {!isLogin && (
                        <div className="mt-4">
                            <input type="password" placeholder="Confirm password" className="w-full px-4 py-3 border rounded" required />
                        </div>
                    )}
                    
                    {isLogin ? (
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 form-checkbox" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
                        </div>
                    ) : null}

                    {/* Submit Button */}
                    <button className="w-full py-3 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                    
                    <p className="mt-6 text-sm text-center">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={switchForm} className="text-blue-500 underline">{isLogin ? ' Sign up' : ' Login'}</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
