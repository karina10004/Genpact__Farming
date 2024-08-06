// src/components/FarmerCalls.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const fetchCalls = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/call/farmer/${user._id}`
      );
      setCalls(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchCalls();
  }, []);

  const handleCall = (id) => {
    navigate(`/join-call/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Scheduled Calls for Farmer</h1>
      <ul>
        {calls.map((call) => (
          <li key={call._id}>
            <div>
              <p>Expert: {call.expert_id.name}</p>
              <p>Call Date: {new Date(call.call_date).toLocaleString()}</p>
              <p>Status: {call.status}</p>
              <button onClick={() => handleCall(call._id)}>Join Call</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerCalls;
