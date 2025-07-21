import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ClientForm from "../components/ClientForm";
import { Container, Alert } from "react-bootstrap";

const AddEditClient = () => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    status: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Load client data in edit mode
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/clients/${id}`)
        .then((res) => setClientData(res.data))
        .catch((err) => {
          console.error("Client not found:", err);
          setError("Client not found.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientData.name || !clientData.email || !clientData.phone || !clientData.status) {
      setError("All fields are required.");
      return;
    }

    try {
      if (id) {
        // Edit existing client
        await axios.put(`http://localhost:5000/clients/${id}`, clientData);
      } else {
        // Add new client
        await axios.post("http://localhost:5000/clients", clientData);
      }

      navigate("/"); // Redirect to Home
    } catch (err) {
      console.error("Error saving client:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>{id ? "Edit Client" : "Add Client"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ClientForm
        clientData={clientData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default AddEditClient;
