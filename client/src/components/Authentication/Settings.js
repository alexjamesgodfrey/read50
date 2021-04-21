import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Container, Form, Button, Alert, Modal } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext.js';
import Header from '../Header/Header.js';
import './Authentication.scss';
import app from '../../firebase.js';

export default function Settings() {
    const { currentUser, login, logout, updateEmail, updateDisplayName, updatePassword, updatePhotoURL, deleteUser, reauthenticate } = useAuth();
    const [verified, setVerified] = useState(currentUser.verified);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const uploadPicture = async (e) => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const file = e.target.files[0];
            const storageRef = app.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            await updatePhotoURL(url);
            const json = `{
                "picture_link": "${url}",
                "auth0_id": "${currentUser.uid}"
            }`
            const resp = await fetch(`/api/seturl`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: json
            });
            console.log(resp)
            setSuccess('profile picture successfully uploaded');
        } catch (error) {
            setError('profile picture upload failed')
        }
        
        setLoading(false);
    }

    //displayname handling
    const displayNameRef = useRef();
    const [displayNameEditText, setDisplayNameEditText] = useState('edit');
    const [editDisplayName, setEditDisplayName] = useState(false);
    const showDisplayName = () => {
        setError('');
        setSuccess('');
        if (editDisplayName === false) {
            setEditPassword(false);
            setEditEmail(false);
            setDisplayNameEditText('cancel');
            setEditDisplayName(true);
        } else {
            setEditDisplayName(false)
            setDisplayNameEditText('edit');
        }
    }
    const handleDisplayName = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (displayNameRef.current.value === currentUser.displayName) {
            return setError('that is already your username')
        }
        if (displayNameRef.current.value.length < 4) {
            return setError('username must be 4 or more characters');
        }
        try {
            setLoading(true);
            await updateDisplayName(displayNameRef.current.value);
            await fetch(`/api/setusername/${displayNameRef.current.value}/${currentUser.uid}`, {
                method: "PUT"
            });
            setSuccess('username successfully changed to ' + currentUser.displayName);
            setEditDisplayName(false);
            setDisplayNameEditText('edit');
        } catch (error) {
            setError('failed to update username. please try again.');
        }
        setLoading(false)
    }

    //email handling
    const emailRef = useRef();
    const [emailEditText, setEmailEditText] = useState('edit');
    const [editEmail, setEditEmail] = useState(false);
    const showEmail = () => {
        setError('');
        setSuccess('');
        if (currentUser.providerData[0].providerId !== 'password') {
            return setError('cannot change password for google sign in');
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
        setSuccess('');
        if (emailRef.current.value === currentUser.email) {
            return setError('that is already your email')
        }
        try {
            setLoading(true);
            await updateEmail(emailRef.current.value);
            await fetch(`/api/setemail/${emailRef.current.value}/${currentUser.uid}`, {
                method: "PUT"
            });
            setSuccess('email successfully changed to ' + currentUser.email);
            setEditEmail(false);
            setEmailEditText('edit');
        } catch (error) {
            setError('email change failed. log out and in and try again.');
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
        setSuccess('');
        if (currentUser.providerData[0].providerId !== 'password') {
            return setError('cannot change email for google sign in');
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
        setSuccess('');
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('passwords must match');
        }
        try {
            setLoading(true);
            await updatePassword(passwordRef.current.value);
            setSuccess('password successfully changed');
            setEditPassword(false);
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

    const [showDelete, setShowDelete] = useState(false)
    const [credentials, setCredentials] = useState('');
    const confirmRef = useRef();
    const reauth = async (e) => {
        e.preventDefault();

        if (confirmRef.current.value !== 'confirm') {
            setShowDelete(false)
            return setError('you must type confirm in the bottom box')
        }

        if (currentUser.providerData[0].providerId !== 'password') {
            try {
                await deleteUser();
                history.push('/')
            } catch (error) {
                return setError('please log out then in and try again');
            }
        }

        try {
            await login(emailRef.current.value, passwordRef.current.value);
            await fetch(`/api/deleteuser/${currentUser.uid}`, {
                method: "DELETE"
            });
            await deleteUser();
            history.push('/')
        } catch (error) {
            setShowDelete(false);
            return setError('incorrect email or password');
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
                    {success && <Alert variant="success">{success}</Alert>}
                    <div className="d-flex mx-auto">
                        <div className="picture-section">
                            <img className="profile-pic-settings" src={currentUser.photoURL} alt="upload profile picture" />
                            <Form.File id="file-upload" disabled={loading} type="file" accept="image/*" onChange={(e) => uploadPicture(e)} />
                        </div>
                        <div className="profile-info">
                            <p><strong>username: </strong>{currentUser.displayName ? currentUser.displayName : <span>none! add one</span>} <span onClick={showDisplayName} className="edit-button">{displayNameEditText}</span></p>
                            <p className="profile-test"><strong>email: </strong>{currentUser.email} <span onClick={showEmail} className="edit-button">{emailEditText}</span></p>
                            <p onClick={showPassword}><strong>change password</strong></p>
                            <Button onClick={() => setShowDelete(true)} variant="secondary">delete account</Button>
                        </div>
                        <Modal show={showDelete} onHide={() => setShowDelete(false)} dismissible>
                            <Modal.Header closeButton>
                                <h3 style={{ color: '#dc3545'}}>WARNING: THIS ACTION IS PERMANENT</h3>
                            </Modal.Header>
                                <Modal.Body>
                                    once you delete your account, all your credentials will be immediately deleted from our databases.
                                    there is no going back.
                                    <p></p>
                                <Form className="d-flex flex-column">
                                    {currentUser.providerData[0].providerId === 'password' ?
                                        <div>
                                        <Form.Group id="email">
                                            <Form.Label>email</Form.Label>
                                            <Form.Control type="email" ref={emailRef} required placeHolder='enter email here'></Form.Control>
                                        </Form.Group>
                                        <Form.Group id="password-confirm">
                                            <Form.Label>confirm password</Form.Label>
                                            <Form.Control type="password" ref={passwordRef} required placeHolder='enter password here'></Form.Control>
                                        </Form.Group>
                                        </div>
                                        :
                                        <span></span>
                                    }
                                    <Form.Group id="confirm">
                                        <Form.Label>final confirmation</Form.Label>
                                        <Form.Control type="text" ref={confirmRef} required placeHolder='type confirm into this box'></Form.Control>
                                    </Form.Group>
                                    <Button onClick={(e) => reauth(e)} variant="secondary">delete account</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                    {editDisplayName ?
                        <Form onSubmit={handleDisplayName} className="d-flex flex-column" >
                            <Form.Group id="username">
                                <Form.Label>new username</Form.Label>
                                <Form.Control type="username" ref={displayNameRef} required placeHolder='enter new username here'></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">update username</Button>
                        </Form>
                        :
                        <span></span>
                    }
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
