import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GoogleLoginButton, FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons";
import { Form, Container, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext.js';
import './Authentication.scss';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, googleSignup, facebookSignup, githubSignup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/search");
        } catch (error) {
            setError('failed to create an account. please try again.')
        }

        setLoading(false)
    }

    const google = async () => {
        setLoading(true);
        try {
            await googleSignup();
            history.push("/search");
        } catch (error) {
            setError('failed to sign in with google. please try again.')
        }
        setLoading(true);
    }

    const facebook = async () => {
        await facebookSignup();
    }

    const github = async () => {
        await githubSignup();
    }

    return (
        <div className="signup">
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                        <h2 id="primary-color" className="text-center mb-4">sign up</h2>
                        {loading ?
                            <div className="auth-spinner"><Spinner id="auth-spin" variant="warning" animation="border" /></div>
                            :
                            <div>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                <div className="auth-buttons">
                                    <GoogleLoginButton onClick={google} className="google-auth-button" variant="primary"><span className="auth-button">sign up with google</span></GoogleLoginButton>
                                    <FacebookLoginButton onClick={facebook} className="auth-button" variant="primary"><span className="auth-button">sign up</span></FacebookLoginButton>
                                    <GithubLoginButton onClick={github} className="auth-button" variant="primary"><span className="auth-button">sign up</span></GithubLoginButton>
                                </div>
                                <Form onSubmit={handleSubmit} className="d-flex flex-column" >
                                    <Form.Group id="email">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group id="password-confirm">
                                        <Form.Label>confirm password</Form.Label>
                                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                                    </Form.Group>
                                    <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">sign up</Button>
                                </Form>
                            </div>
                        }
                </Card.Body>
            </Card>
            <div className="text-center">
                <p>already have an account? <Link id="signup-link" to="/login">log in.</Link></p>
            </div>
            </div>
        </Container>
        </div>
    )
}
