import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ClientSocket from './ClientSocket'

export default function RequireAuth() {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    return (
        auth.token
            ? 
            <>
                <Outlet />
                <ClientSocket />
            </>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
