import { Button } from "bootstrap";
import React from "react";
import {Navbar, container, nav} from "react-bootstrap";

const ClientForm = ({handleChange, clientData, handleSubmir}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className= "mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={clientData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={clientData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={clientData.phone}
                    onChange={handleChange}
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                    name="status"
                    value={clientData.Status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}; 

export default ClientForm;