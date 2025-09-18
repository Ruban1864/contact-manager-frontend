import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ Validation function
  const validate = () => {
    let errors = {}

    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required'
    } else if (formData.username.length > 10) {
      errors.username = 'Username must not exceed 10 characters'
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address'
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Run validation before sending to backend
    if (!validate()) return

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL
      const response = await axios.post(`${BASE_URL}/api/users/register`, formData)
      localStorage.setItem('userInfo', JSON.stringify({ token: response.data.accessToken }))
      navigate('/contacts')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {fieldErrors.username && (
            <p className="text-red-500 text-sm">{fieldErrors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
