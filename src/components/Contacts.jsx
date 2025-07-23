import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://contact-manager-backend-p7la.onrender.com/api/contacts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setContacts(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch contacts')
      }
    }
    fetchContacts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://contact-manager-backend-p7la.onrender.com/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setContacts(contacts.filter(contact => contact._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete contact')
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Link
        to="/contacts/add"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 inline-block"
      >
        Add New Contact
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <div key={contact._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-gray-600">{contact.email}</p>
            <p className="text-gray-600">{contact.phone}</p>
            <div className="mt-2 flex gap-2">
              <Link
                to={`/contacts/edit/${contact._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contacts
