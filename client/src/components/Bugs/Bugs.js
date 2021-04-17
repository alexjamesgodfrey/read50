import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header.js';
import './Bugs.scss';

const Bugs = () => {
    const [from, setFrom] = useState("");
    const [type, setType] = useState("bug report");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const d = new Date();
    const [date, setDate] = useState(d.toLocaleDateString())
    const [text, setText] = useState('send')

    const send = async () => {
        setText('submitting...');
        const json = `{
            "from": "${from}",
            "type": "${type}",
            "title": "${title}",
            "body": "${body}",
            "date": "${date}"
        }`;
        const send = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json
        })
        setText('thank you!');
        setFrom("");
        setType("bug report")
        setTitle("");
        setBody("");
    }

    return (
        <div className="about">
            <Header />
            <h3>contact (bugs, faq, ideas, anything really)</h3>
            <Form className="bugs-form">
                <Form.Group>
                    <Form.Label id="bugs-color">email address</Form.Label>
                    <Form.Control onChange={e => setFrom(e.target.value)} type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="bugs-color">title</Form.Label>
                    <Form.Control onChange={e => setTitle(e.target.value)} type="email" placeholder="bug report leaderboards page" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="bugs-color">type</Form.Label>
                    <Form.Control onChange={e => setType(e.target.value)} as="select">
                        <option>bug</option>
                        <option>faq</option>
                        <option>feature/suggested change</option>
                        <option>other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label id="bugs-color">details</Form.Label>
                    <Form.Control onChange={e => setBody(e.target.value)} as="textarea" rows={5} placeholder="on the leaderboards page, when i click on user alex's (rank 1) name ... (being descriptive as possible)" />
                </Form.Group>
                <Button variant="danger" size="xl" onClick={() => send()}>{text}</Button>
                </Form>
        </div>
    )
}

export default Bugs;