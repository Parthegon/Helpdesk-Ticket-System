import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTickets = useCallback(async () => {
    try {
      let url = 'http://localhost:5000/api/tickets';

      const params = [];
      if (filterStatus) params.push(`status=${filterStatus}`);
      if (filterPriority) params.push(`priority=${filterPriority}`);

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const res = await axios.get(url);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [filterStatus, filterPriority]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const createTicket = async () => {
    if (!title || !description) return alert('Fill all fields');

    await axios.post('http://localhost:5000/api/tickets', {
      title,
      description
    });

    setTitle('');
    setDescription('');
    fetchTickets();
  };

  const deleteTicket = async (id) => {
    await axios.delete(`http://localhost:5000/api/tickets/${id}`);
    fetchTickets();
  };

  const updateStatus = async (id) => {
    await axios.put(`http://localhost:5000/api/tickets/${id}`, {
      status: 'Closed'
    });
    fetchTickets();
  };

  const startEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5000/api/tickets/${id}`, {
      title: editTitle,
      description: editDescription
    });

    setEditingId(null);
    fetchTickets();
  };

  return (
    <div className="container">
      <h1 className="header">Helpdesk Ticket System</h1>

      {/* CREATE */}
      <div className="card">
        <h2>Create Ticket</h2>

        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-create" onClick={createTicket}>
          Create
        </button>
      </div>

      {/* FILTERS */}
      <div className="card">
        <h2>Filter Tickets</h2>

        <div className="filters">
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <select onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* TICKETS */}
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            {editingId === ticket.id ? (
              <>
                <input
                  className="input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="input"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button className="btn btn-create" onClick={() => saveEdit(ticket.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
              </>
            )}

            <div className="meta">
              <span className={ticket.status === 'Closed' ? 'status-closed' : 'status-open'}>
                {ticket.status}
              </span>
              <span>{ticket.priority}</span>
              <span>{ticket.assignee || 'Unassigned'}</span>
            </div>

            <div className="button-group">
              <button className="btn btn-delete" onClick={() => deleteTicket(ticket.id)}>
                Delete
              </button>

              <button className="btn btn-close" onClick={() => updateStatus(ticket.id)}>
                Close
              </button>

              <button className="btn btn-edit" onClick={() => startEdit(ticket)}>
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;