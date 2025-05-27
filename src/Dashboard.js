// src/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  // 💾 Liste initiale des tickets (comme une base de données temporaire)
  const [tickets, setTickets] = useState([
    {
      id: 1,
      description: "Corriger bug affichage page",
      statut: "done",
      environnement: "prod"
    },
    {
      id: 2,
      description: "Ajouter bouton +",
      statut: "ongoing",
      environnement: "dev"
    },
    {
      id: 3,
      description: "Créer composant formulaire",
      statut: "not_started",
      environnement: "preprod"
    }
  ]);

  // 🆕 États pour le formulaire d'ajout
  const [newDescription, setNewDescription] = useState('');
  const [newStatut, setNewStatut] = useState('');
  const [newEnv, setNewEnv] = useState('dev');

  // 🎨 Couleur selon le statut
  const getStatutColor = (statut) => {
    if (statut === "done") return "green";
    if (statut === "ongoing") return "orange";
    return "gray";
  };

  // 🎨 Couleur selon l’environnement
  const getEnvColor = (env) => {
    if (env === "prod") return "green";
    if (env === "dev") return "yellow";
    if (env === "preprod") return "orange";
    return "white";
  };

  // ➕ Ajouter un nouveau ticket
  const handleAddTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      description: newDescription,
      statut: newStatut,
      environnement: newEnv
    };
    setTickets([...tickets, newTicket]);
    setNewDescription('');
    setNewStatut('');
    setNewEnv('dev');
  };

  return (
    <div className="dashboard-container">
      {/* 🔝 En-tête avec logo et menu */}
      <div className="dashboard-header">
        <div className="logo">🚀 MON LOGO</div>
        <div className="menu">
          <button>Historique</button>
          <button>+ Ticket</button>
        </div>
      </div>

      {/* ➕ Formulaire d'ajout */}
      <div className="form-ajout">
        <h3>Ajouter un ticket</h3>
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <select
          value={newStatut}
          onChange={(e) => setNewStatut(e.target.value)}
        >
          <option value="" disabled hidden>Pas commencé</option>
          <option value="ongoing">En cours</option>
          <option value="done">Terminé</option>
        </select>
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

      {/* 📋 Liste des tickets */}
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div className="ticket-card" key={ticket.id}>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
