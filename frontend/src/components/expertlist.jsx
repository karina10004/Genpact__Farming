import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  // const [callDate, setCallDate] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/expert/all"
        );
        setExperts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(loggedUser);
    fetchExperts();
  }, []);

  const openModal = (expert) => {
    setSelectedExpert(expert);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedExpert(null);
    // setCallDate("");
  };

  const handleScheduleCall = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/call/", {
        expert_id: selectedExpert._id,
        // call_date: callDate,
        farmer_id: loggedUser._id,
        status: "Pending",
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Experts List</h1>
      <ul>
        {experts.map((expert) => (
          <li key={expert._id}>
            {expert.name} - {expert.specialization}
            <button onClick={() => openModal(expert)}>Schedule Call</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Schedule Call"
      >
        <h2>Schedule Call with {selectedExpert && selectedExpert.name}</h2>
        <form onSubmit={handleScheduleCall}>
          <button type="submit">Schedule</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ExpertList;
