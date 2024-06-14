import React, { useContext } from 'react'
import AuthContext from '../components/context/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth;
