import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RequireAuth() {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    return (
        auth.token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
