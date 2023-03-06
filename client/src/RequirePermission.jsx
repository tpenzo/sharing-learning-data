import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RequirePermission({ roles }) {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    return (
        auth.token && roles?.includes(auth.user?.role)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
