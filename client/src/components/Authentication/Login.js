import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { GoogleLoginButton, FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons";
import { Form, Container, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext.js';
import './Authentication.scss';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, googleSignup, facebookSignup, githubSignup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/search')
        } catch (error) {
            setError('invalid email/password combination');
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
                    <h2 id="primary-color" className="text-center mb-4">log in</h2>
                    {loading ?
                        <div className="auth-spinner"><Spinner id="auth-spin" variant="warning" animation="border" /></div>
                        :
                        <div>
                            {error && <Alert variant="danger">{error}</Alert>}    
                            <div className="auth-buttons">
                                <GoogleLoginButton onClick={google} className="google-auth-button" variant="primary"><span className="auth-button">log in with google</span></GoogleLoginButton>
                                <FacebookLoginButton onClick={facebook} className="auth-button" variant="primary"><span className="auth-button">log in</span></FacebookLoginButton>
                                <GithubLoginButton onClick={github} className="auth-button" variant="primary"><span className="auth-button">log in</span></GithubLoginButton>
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
                                <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">log in</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link id="forgot-link" to="/forgot-password">forgot password?</Link>
                            </div>
                        </div>
                        }
                </Card.Body>
            </Card>
            <div className="text-center">
                <p>don't have an account? <Link id="signup-link" to="/signup">sign up.</Link></p>
            </div>
            </div>
        </Container>
        </div>
    )
}