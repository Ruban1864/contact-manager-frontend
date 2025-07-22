import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import EditContact from './components/EditContact'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/contacts" replace />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ProtectedRoute>
                <AddContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <ProtectedRoute>
                <EditContact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App