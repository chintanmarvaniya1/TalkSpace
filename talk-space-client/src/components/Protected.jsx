import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ children, userAuthenticated, redirect }) {

    if (!userAuthenticated) {
        return <Navigate to={redirect} />
    }
    return (
        children
    )
}

export default Protected