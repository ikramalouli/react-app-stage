 import React, { useState, useRef } from 'react';
import './Dashboard.css';

import DropDown from '../../components/DropDown';
import Input from '../../components/Input';
import Button from '../../components/Button';

function Dashboard() {
  const [view, setView] = useState('tickets');
  const [newProjet, setNewProjet] = useState('');
  const [newDeliveryDate, setNewDeliveryDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatut, setNewStatut] = useState('');
  const [newEnv, setNewEnv] = useState('dev');
  const [filtreStatut, setFiltreStatut] = useState('');
  const [filtreEnv, setFiltreEnv] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const draggedItem = useRef(null);

  const [tickets, setTickets] = useState([
    {
      id: '1',
      description: "Corriger bug affichage page",
      projet: "Projet Alpha",
      livraison: "2023-10-15",
      statut: "done",
      environnement: "prod"
    },
    {
      id: '2',
      description: "Ajouter bouton +",
      projet: "Projet Alpha",
      livraison: "2023-10-20",
      statut: "ongoing",
      environnement: "dev"
    },
    {
      id: '3',
      description: "Créer composant formulaire",
      projet: "Projet Bêta",
      statut: "not_started",
      environnement: "preprod"
    }
  ]);

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
    setFormTouched(true);
    if (!isFormValid) return;

    const newTicket = {
      id: (tickets.length + 1).toString(),
      description: newDescription,
      statut: newStatut,
      environnement: newEnv,
      projet: newProjet,
      livraison: newDeliveryDate
    };

    setTickets([...tickets, newTicket]);
    setNewDescription('');
    setNewStatut('');
    setNewEnv('dev');
    setNewProjet('');
    setNewDeliveryDate('');
    setFormTouched(false);
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

  const isFormValid = newDescription && newProjet && newStatut && newEnv && newDeliveryDate;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">🚀 MON LOGO</div>
        <div className="menu">
          <Button text="Historique" onPress={() => {}} />
          <Button text="+ Tickets" onPress={() => setView('tickets')} />
          <Button text="+ Projets" onPress={() => setView('projects')} />
        </div>
      </div>

      <div className="top-section">
        <div className="form-ajout">
          <h3>Ajouter un ticket</h3>

          <Input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          {formTouched && !newDescription && <p className="error-msg">Veuillez saisir une description</p>}

          <select
            value={newProjet}
            onChange={(e) => setNewProjet(e.target.value)}
          >
            <option value="">Sélectionner un projet</option>
            <option value="Projet Alpha">Projet Alpha</option>
            <option value="Projet Bêta">Projet Bêta</option>
            <option value="Projet Gamma">Projet Gamma</option>
          </select>
          {formTouched && !newProjet && <p className="error-msg">Veuillez sélectionner un projet</p>}

          <select
            value={newStatut}
            onChange={(e) => setNewStatut(e.target.value)}
          >
            <option value="">Sélectionner un statut</option>
            <option value="not_started">Pas commencé</option>
            <option value="ongoing">En cours</option>
            <option value="done">Terminé</option>
          </select>
          {formTouched && !newStatut && <p className="error-msg">Veuillez sélectionner un statut</p>}

          <select
            value={newEnv}
            onChange={(e) => setNewEnv(e.target.value)}
          >
            <option value="dev">Développement</option>
            <option value="preprod">Pré-production</option>
            <option value="prod">Production</option>
          </select>

          <Input
            type="date"
            value={newDeliveryDate}
            onChange={(e) => setNewDeliveryDate(e.target.value)}
          />
          {formTouched && !newDeliveryDate && <p className="error-msg">Veuillez choisir une date de livraison</p>}

          <Button
            text="Ajouter"
            onPress={handleAddTicket}
            disabled={!isFormValid}
          />
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


      

      {view === 'projects' ? (
        <div className="dashboard-container">
          <h2>Projets</h2>
          <ul className="project-list">
            <li>Projet Alpha</li>
            <li>Projet Bêta</li>
            <li>Projet Gamma</li>
          </ul>
        </div>
      ) : (
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
                <p><strong>Projet:</strong> {ticket.projet || '—'}</p>
                <p><strong>Date de livraison:</strong> {ticket.livraison || '—'}</p>
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
                <Button
                  text="🗑️ Supprimer"
                  onPress={() => handleDeleteTicket(ticket.id)}
                  style={{ backgroundColor: 'red' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;    