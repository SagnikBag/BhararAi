import React, { useState } from 'react'
import Navigation from '../components/Navigation'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    console.log('Register Data:', formData)
    // Add your register API call here
  }

  return (
    <>
      <Navigation />
      <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-[#31b8c6] mb-2 text-center">
            Register
          </h1>
          <p className="text-gray-400 text-center mb-8">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6] focus:ring-opacity-50 transition"
                required
              />
            </div>

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
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6] focus:ring-opacity-50 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#31b8c6] hover:bg-[#29a3af] text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 duration-200"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-[#31b8c6] hover:text-[#29a3af] font-medium transition">
              Login here
            </a>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Register
