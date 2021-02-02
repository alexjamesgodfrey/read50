import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div></div>
    }

    return (
        isAuthenticated && (
            <button className="logoutbutton" onClick={() => logout()}>
                Log Out
            </button>
        )
        
    );
}

export default LogoutButton;