import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../axios'

// Use environment-aware base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://contact-manager-backend-1-vz2e.onrender.com'

function EditContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch contact data on load
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/api/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone
        })
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch contact')
      }
    }
    fetchContact()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${BASE_URL}/api/contacts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      navigate('/contacts')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update contact')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Contact
        </button>
      </form>
    </div>
  )
}

export default EditContact
