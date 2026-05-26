import React, { useState } from 'react'
import Navigation from '../components/Navigation'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login Data:', formData)
    // Add your login API call here
  }

  return (
    <>
      <Navigation />
      <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-[#31b8c6] mb-2 text-center">
            Login
          </h1>
          <p className="text-gray-400 text-center mb-8">Welcome back</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6] focus:ring-opacity-50 transition"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6] focus:ring-opacity-50 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#31b8c6] hover:bg-[#29a3af] text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 duration-200"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <a href="/register" className="text-[#31b8c6] hover:text-[#29a3af] font-medium transition">
              Register here
            </a>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Login
