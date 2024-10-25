import React, { useEffect, useState } from 'react';
import '../pages/AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const users = JSON.parse(localStorage.getItem('loggedInUser')) || [];
    const name = users.firstname;

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  return (
    <div>
      <h2>Messages from Students</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboardPage;