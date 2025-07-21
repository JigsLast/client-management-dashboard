import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Spinner,
  Form,
  Row,
  Col,
  Badge,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to load client data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`http://localhost:5000/clients/${id}`);
        fetchClients();
      } catch (err) {
        console.error("Delete failed:", err);
        setError("Failed to delete client.");
      }
    }
  };

  const filteredClients = clients.filter((client) => {
    const nameMatch = client.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "All" || client.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <Container className="mt-4">
      <h2>Client List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : filteredClients.length === 0 ? (
        <Alert variant="info">No clients found.</Alert>
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
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <Badge bg={client.status === "Active" ? "success" : "secondary"}>
                    {client.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/edit/${client.id}`)}
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
