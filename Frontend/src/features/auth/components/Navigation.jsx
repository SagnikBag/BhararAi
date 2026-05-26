import React from 'react'
import { useLocation } from 'react-router'

const Navigation = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#31b8c6]">BharatAI</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <a
              href="/login"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isLogin
                  ? 'bg-[#31b8c6] text-white'
                  : 'text-gray-300 hover:text-[#31b8c6] hover:bg-gray-700'
              }`}
            >
              Login
            </a>
            <a
              href="/register"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !isLogin
                  ? 'bg-[#31b8c6] text-white'
                  : 'text-gray-300 hover:text-[#31b8c6] hover:bg-gray-700'
              }`}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
