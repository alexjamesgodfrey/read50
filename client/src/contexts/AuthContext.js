import React, { useContext, useState, useEffect } from 'react'
import { auth, googleProvider, facebookProvider, githubProvider } from '../firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function googleSignup() {
        return auth.signInWithPopup(googleProvider);
    }

    function facebookSignup() {
        return auth.signInWithRedirect(facebookProvider)
    }

    function githubSignup() {
        return auth.signInWithPopup(githubProvider);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updateDisplayName(newDisplayName) {
        return currentUser.updateProfile({
            displayName: newDisplayName
        });
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updatePhotoURL(url) {
        return currentUser.updateProfile({
            photoURL: url
        });
    }

    function deleteUser() {
        return currentUser.delete();
    }

    function reauthenticate(credential) {
        return currentUser.reauthenticateWithCredential(credential);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        googleSignup,
        facebookSignup,
        githubSignup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updateDisplayName,
        updatePassword,
        updatePhotoURL,
        deleteUser,
        reauthenticate
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
