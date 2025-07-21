import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/clients");
      setClients(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await axios.delete(`http://localhost:5000/clients/${id}`);
      fetchClients();
    }
  };

  return (
    <Container className="mt-4">
      <h2>Client List</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <span className={`badge bg-${client.status === "Active" ? "success" : "secondary"}`}>
                    {client.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/edit/${client.id}`)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Home;
