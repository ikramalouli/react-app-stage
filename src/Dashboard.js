// src/Dashboard.js
import React, { useState, useRef } from 'react';
import './Dashboard.css';
import DropDown from './components/DropDown';

function Dashboard() {
  const [tickets, setTickets] = useState([
    {
      id: '1',
      description: "Corriger bug affichage page",
      statut: "done",
      environnement: "prod"
    },
    {
      id: '2',
      description: "Ajouter bouton +",
      statut: "ongoing",
      environnement: "dev"
    },
    {
      id: '3',
      description: "Créer composant formulaire",
      statut: "not_started",
      environnement: "preprod"
    }
  ]);

  const [newDescription, setNewDescription] = useState('');
  const [newStatut, setNewStatut] = useState('');
  const [newEnv, setNewEnv] = useState('dev');
  const [filtreStatut, setFiltreStatut] = useState('');
  const [filtreEnv, setFiltreEnv] = useState('');
  const draggedItem = useRef(null);

  const handleDragStart = (index) => {
    draggedItem.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const items = [...tickets];
    const draggedTicket = items[draggedItem.current];
    items.splice(draggedItem.current, 1);
    items.splice(index, 0, draggedTicket);
    draggedItem.current = null;
    setTickets(items);
  };

  const getStatutColor = (statut) => {
    if (statut === "done") return "green";
    if (statut === "ongoing") return "orange";
    return "gray";
  };

  const getEnvColor = (env) => {
    if (env === "prod") return "green";
    if (env === "dev") return "yellow";
    if (env === "preprod") return "orange";
    return "white";
  };

  const handleAddTicket = () => {
    const newTicket = {
      id: (tickets.length + 1).toString(),
      description: newDescription,
      statut: newStatut,
      environnement: newEnv
    };
    setTickets([...tickets, newTicket]);
    setNewDescription('');
    setNewStatut('');
    setNewEnv('dev');
  };

  const handleDeleteTicket = (id) => {
    const filteredTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(filteredTickets);
  };

  const ticketsFiltres = tickets.filter(ticket => {
    const matchStatut = filtreStatut ? ticket.statut === filtreStatut : true;
    const matchEnv = filtreEnv ? ticket.environnement === filtreEnv : true;
    return matchStatut && matchEnv;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">🚀 MON LOGO</div>
        <div className="menu">
          <button>Historique</button>
          <button>+ Ticket</button>
        </div>
      </div>

      {/* Bloc horizontal pour ajout + filtre */}
      <div className="top-section">
        <div className="form-ajout">
          <h3>Ajouter un ticket</h3>
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          {/* <select
            value={newStatut}
            onChange={(e) => setNewStatut(e.target.value)}
          >
            <option value="" disabled hidden>Pas commencé</option>
            <option value="ongoing">En cours</option>
            <option value="done">Terminé</option>
          </select> */}
          <DropDown data = {[{
        id:"1",
        key:"not_yet_started", 
        value:'Pas Commencé'
    },
    {
        id:"1",
        key:"not_yet_started", 
        value:'Pas Commencé'
    },
    {
        id:"1",
        key:"not_yet_started", 
        value:'Pas Commencé'
    },
]}/>
          <select
            value={newEnv}
            onChange={(e) => setNewEnv(e.target.value)}
          >
            <option value="dev">Développement</option>
            <option value="preprod">Pré-production</option>
            <option value="prod">Production</option>
          </select>
          <button onClick={handleAddTicket}>Ajouter</button>
        </div>

        <div className="filtres">
          <h3>Filtres</h3>
          <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
            <option value="">Tous les statuts</option>
            <option value="not_started">Pas commencé</option>
            <option value="ongoing">En cours</option>
            <option value="done">Terminé</option>
          </select>
          <select value={filtreEnv} onChange={(e) => setFiltreEnv(e.target.value)}>
            <option value="">Tous les environnements</option>
            <option value="dev">Développement</option>
            <option value="preprod">Pré-production</option>
            <option value="prod">Production</option>
          </select>
        </div>
      </div>

      <div className="dashboard-container">
        <h2>Tickets</h2>
        <div className="ticket-list">
          {ticketsFiltres.map((ticket, index) => (
            <div
              key={ticket.id}
              className="ticket-card"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <p><strong>ID:</strong> {ticket.id}</p>
              <p><strong>Description:</strong> {ticket.description}</p>
              <p>
                <strong>Statut:</strong>{' '}
                <span style={{ color: getStatutColor(ticket.statut) }}>
                  {ticket.statut}
                </span>
              </p>
              <p>
                <strong>Environnement:</strong>{' '}
                <span style={{ color: getEnvColor(ticket.environnement) }}>
                  {ticket.environnement}
                </span>
              </p>

              <button className="delete-btn" onClick={() => handleDeleteTicket(ticket.id)}>
                🗑️ Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
