import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('servora_user'))
    } catch {
      return null
    }
  })

  const login = (data) => {
    localStorage.setItem('servora_token', data.token)
    localStorage.setItem('servora_user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('servora_token')
    localStorage.removeItem('servora_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}