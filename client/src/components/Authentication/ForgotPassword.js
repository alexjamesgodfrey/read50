import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Form, Container, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext.js';
import './Authentication.scss';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('check your inbox for further instructions')
        } catch (error) {
            setError('email not found');
        }

        setLoading(false)
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
                    <h2 id="primary-color" className="text-center mb-4">reset password</h2>
                    {loading ?
                        <div className="auth-spinner"><Spinner id="auth-spin" variant="warning" animation="border" /></div>
                        :
                        <div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit} className="d-flex flex-column" >
                                <Form.Group id="email">
                                    <Form.Label>email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>
                                <Button disabled={loading} id="loginbutton" className="w-100 mx-auto" variant="warning" type="submit">reset</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link id="forgot-link" to="/login">log in</Link>
                            </div>
                        </div>
                        }
                </Card.Body>
            </Card>
            <div className="text-center">
                <p>don't have an account? <Link id="signup-link" to="/signup">sign up</Link></p>
            </div>
            </div>
        </Container>
        </div>
    )
}
