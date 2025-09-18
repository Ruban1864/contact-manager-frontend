import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

function AddContact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation function
  const validate = () => {
    let errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 30) {
      errors.name = 'Name must not exceed 30 characters';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Run validation
    if (!validate()) return;

    try {
      const apiurl = import.meta.env.VITE_API_BASE_URL;
      await axiosInstance.post(`${apiurl}/api/contacts`, formData);
      navigate('/contacts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add contact');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
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
          {fieldErrors.name && (
            <p className="text-red-500 text-sm">{fieldErrors.name}</p>
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

        {/* Phone */}
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
          {fieldErrors.phone && (
            <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default AddContact;
