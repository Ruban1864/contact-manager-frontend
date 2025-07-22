import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Contact Manager</Link>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row gap-4">
            {token ? (
              <>
                <Link to="/contacts" className="text-white hover:text-blue-200">Contacts</Link>
                <Link to="/contacts/add" className="text-white hover:text-blue-200">Add Contact</Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
                <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar