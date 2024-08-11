import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const expert = JSON.parse(localStorage.getItem("expertInfo")).expert;
  console.log(expert._id);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `https://genpact-farming.onrender.com/api/call/pending/${expert._id}`
        );
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://genpact-farming.onrender.com/api/call/${id}/status`,
        {
          status,
        }
      );
      setRequests(
        requests.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Call Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <div>
              <p>Farmer: {request.farmer_id.name}</p>
              <p>Call Date: {new Date(request.call_date).toLocaleString()}</p>
              <p>Status: {request.status}</p>
              {request.status === "Pending" && (
                <div>
                  <button
                    onClick={() => handleUpdateStatus(request._id, "Approved")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(request._id, "Cancelled")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertRequests;
