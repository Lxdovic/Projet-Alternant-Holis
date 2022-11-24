import React, { useEffect } from 'react'
import { delProfile } from '../actions'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    localStorage.removeItem('session')
    dispatch(delProfile())
    navigate('/login')
  }, [])

  return (
    <>
    </>
  )
}

export default Logout