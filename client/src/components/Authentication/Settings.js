import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext.js';
import Header from '../Header/Header.js';
import './Authentication.scss';

export default function Settings() {
    const { currentUser, logout, updateEmail, updateDisplayName, updatePassword } = useAuth();
    const [verified, setVerified] = useState(currentUser.verified);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState('');
    const [editDisplayName, setEditDisplayName] = useState(false);

    const history = useHistory();

    //email handling
    const emailRef = useRef();
    const [emailEditText, setEmailEditText] = useState('edit');
    const [editEmail, setEditEmail] = useState(false);
    const showEmail = () => {
        setError('');
        if (currentUser.providerData[0].providerId !== 'password') {
            return setError('you must have signed up with email to edit your password');
        }
        if (editEmail === false) {
            setEditPassword(false);
            setEditDisplayName(false);
            setEmailEditText('cancel');
            setEditEmail(true);
        } else {
            setEditEmail(false)
            setEmailEditText('edit');
        }
    }
    const handleEmail = async e => {
        e.preventDefault();
        setError('');

        if (emailRef.current.value === currentUser.email) {
            return setError('that is already your email')
        }

        try {
            setLoading(true);
            await updateEmail(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError('invalid email');
        }

        setLoading(false)
    }

    //password handling 
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [editPassword, setEditPassword] = useState(false);
    const [passwordEditText, setPasswordEditText] = useState('edit');
    const showPassword = () => {
        setError('');
        if (currentUser.providerData[0].providerId !== 'password') {
            return setError('you must have signed up with email to edit your password');
        }
        if (editPassword === false) {
            setEditEmail(false);
            setEditDisplayName(false);
            setEditPassword(true);
            setPasswordEditText('cancel');
        } else {
            setEditPassword(false);
            setPasswordEditText('edit');
        }
    }
    const handlePassword = async e => {
        e.preventDefault();
        setError('');

        if (passwordRef.current.value === passwordConfirmRef.current.value) {
            return setError('passwords must match');
        }
        try {
            setLoading(true);
            await updatePassword(passwordRef.current.value);
        } catch (error) {
            setError('password change failed. try again');
        }

        setLoading(false);
    }

    const handleLogout = async () => {
        setError('');

        try {
            await logout();
            history.push('/login');
        } catch (error) {
            setError('failed to log out. please try again')
        }
    }

    return (
        <div className="settings">
        <Header />
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
        >
            <div className="w-100" style={{ maxWidth: '500px'}}>
            <Card>
                <Card.Body>
                    <h2 id="primary-color" className="text-center mb-4">settings</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="d-flex mx-auto">
                        <div className="picture-section">
                            <img className="profile-pic-settings" src={currentUser.photoURL} alt="user profile picture in settings" />
                            <Button variant="light" size="sm">upload</Button>
                        </div>
                        <div className="profile-info">
                            <p><strong>username: </strong>{currentUser.displayName ? currentUser.displayName : <span>none! add one</span>} <span className="edit-button">edit</span></p>
                            <p className="profile-test"><strong>email: </strong>{currentUser.email} <span onClick={showEmail} className="edit-button">{emailEditText}</span></p>
                            <p onClick={showPassword}><strong>change password</strong></p>
                        </div>
                    </div>
                    {editEmail ?
                        <Form onSubmit={handleEmail} className="d-flex flex-column" >
                            <Form.Group id="email">
                                <Form.Label>new email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required placeHolder='enter new email here'></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">update email</Button>
                        </Form>
                        :
                        <span></span>
                    }
                    {editPassword ?
                        <Form onSubmit={handlePassword} className="d-flex flex-column" >
                            <Form.Group id="password">
                                <Form.Label>new password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required placeHolder='enter new password here'></Form.Control>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>confirm password</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required placeHolder='please confirm password'></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">change password</Button>
                        </Form>
                        :
                        <span></span>
                    }
                </Card.Body>
            </Card>
            <div className="text-center">
                <h3 onClick={handleLogout} id="signup-link">log out</h3>
            </div>
            </div>
        </Container>
        </div>
    )
}
