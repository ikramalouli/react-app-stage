import React, { useState, useRef, useEffect } from 'react';
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
  const [filtreStatut, setFiltreStatut] = useState([]);
  const [filtreEnv, setFiltreEnv] = useState([]);
  const [formTouched, setFormTouched] = useState(false);
  const draggedItem = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showStatutOptions, setShowStatutOptions] = useState(false);
  const [showEnvOptions, setShowEnvOptions] = useState(false);

  const statutRef = useRef(null);
  const envRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statutRef.current && !statutRef.current.contains(event.target)) {
        setShowStatutOptions(false);
      }
      if (envRef.current && !envRef.current.contains(event.target)) {
        setShowEnvOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleFilterValue = (value, setFilter, currentFilter) => {
    if (currentFilter.includes(value)) {
      setFilter(currentFilter.filter(item => item !== value));
    } else {
      setFilter([...currentFilter, value]);
    }
  };

  const ticketsFiltres = tickets.filter(ticket => {
    const matchStatut = filtreStatut.length === 0 || filtreStatut.includes(ticket.statut);
    const matchEnv = filtreEnv.length === 0 || filtreEnv.includes(ticket.environnement);
    return matchStatut && matchEnv;
  });

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

  const isFormValid = newDescription && newProjet && newStatut && newEnv && newDeliveryDate;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">PCA</div>
        <div className="menu">
          <Button text="Tickets" onPress={() => setView('tickets')} />
          <Button text="Projets" onPress={() => setView('projects')} />
        </div>
      </div>

      {/* bouton filtres déplacé */}
      <div className="filters-fixed">
        <Button text="Filtres" onPress={() => setShowFilter(true)} className="btn-filtrer" />
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="form-ajout modal-form">
              <h3>Ajouter un ticket</h3>

              <Input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
              {formTouched && !newDescription && <p className="error-msg">Veuillez saisir une description</p>}

              <select value={newProjet} onChange={(e) => setNewProjet(e.target.value)}>
                <option value="">Sélectionner un projet</option>
                <option value="Projet Alpha">Projet Alpha</option>
                <option value="Projet Bêta">Projet Bêta</option>
                <option value="Projet Gamma">Projet Gamma</option>
              </select>
              {formTouched && !newProjet && <p className="error-msg">Veuillez sélectionner un projet</p>}

              <select value={newStatut} onChange={(e) => setNewStatut(e.target.value)}>
                <option value="">Sélectionner un statut</option>
                <option value="not_started">Pas commencé</option>
                <option value="ongoing">En cours</option>
                <option value="done">Terminé</option>
              </select>
              {formTouched && !newStatut && <p className="error-msg">Veuillez sélectionner un statut</p>}

              <select value={newEnv} onChange={(e) => setNewEnv(e.target.value)}>
                <option value="dev">Développement</option>
                <option value="preprod">Pré-production</option>
                <option value="prod">Production</option>
              </select>

              <Input type="date" value={newDeliveryDate} onChange={(e) => setNewDeliveryDate(e.target.value)} />
              {formTouched && !newDeliveryDate && <p className="error-msg">Veuillez choisir une date de livraison</p>}

              <Button text="Ajouter" onPress={handleAddTicket} disabled={!isFormValid} />
            </div>
          </div>
        </div>
      )}

      {showFilter && (
        <div className="modal-overlay" onClick={() => setShowFilter(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="filtres modal-form">
              <h3>Filtres</h3>
              <div className="filtres-row">
                <div className="dropdown-container" ref={statutRef}>
                  <div className="dropdown-header" onClick={() => setShowStatutOptions(!showStatutOptions)}>
                    Statut
                  </div>
                  {showStatutOptions && (
                    <div className="dropdown-options">
                      <label><input type="checkbox" checked={filtreStatut.includes("not_started")} onChange={() => toggleFilterValue("not_started", setFiltreStatut, filtreStatut)} /> Pas commencé</label>
                      <label><input type="checkbox" checked={filtreStatut.includes("ongoing")} onChange={() => toggleFilterValue("ongoing", setFiltreStatut, filtreStatut)} /> En cours</label>
                      <label><input type="checkbox" checked={filtreStatut.includes("done")} onChange={() => toggleFilterValue("done", setFiltreStatut, filtreStatut)} /> Terminé</label>
                    </div>
                  )}
                </div>

                <div className="dropdown-container" ref={envRef}>
                  <div className="dropdown-header" onClick={() => setShowEnvOptions(!showEnvOptions)}>
                    Environnement
                  </div>
                  {showEnvOptions && (
                    <div className="dropdown-options">
                      <label><input type="checkbox" checked={filtreEnv.includes("dev")} onChange={() => toggleFilterValue("dev", setFiltreEnv, filtreEnv)} /> Développement</label>
                      <label><input type="checkbox" checked={filtreEnv.includes("preprod")} onChange={() => toggleFilterValue("preprod", setFiltreEnv, filtreEnv)} /> Pré-production</label>
                      <label><input type="checkbox" checked={filtreEnv.includes("prod")} onChange={() => toggleFilterValue("prod", setFiltreEnv, filtreEnv)} /> Production</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'projects' ? (
        <div className="dashboard-container">
          <h2>Projets</h2>
          <div className="project-grid">
            {["Projet Alpha", "Projet Bêta", "Projet Gamma"].map((projet, index) => (
              <div key={index} className="project-card">
                <h3>{projet}</h3>
                <p>Description du projet {index + 1}.</p>
              </div>
            ))}
          </div>
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
                onDragStart={() => draggedItem.current = index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  const items = [...tickets];
                  const draggedTicket = items[draggedItem.current];
                  items.splice(draggedItem.current, 1);
                  items.splice(index, 0, draggedTicket);
                  draggedItem.current = null;
                  setTickets(items);
                }}
              >
                <p><strong>ID:</strong> {ticket.id}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Projet:</strong> {ticket.projet || '—'}</p>
                <p><strong>Date de livraison:</strong> {ticket.livraison || '—'}</p>
                <p><strong>Statut:</strong> <span style={{ color: getStatutColor(ticket.statut) }}>{ticket.statut}</span></p>
                <p><strong>Environnement:</strong> <span style={{ color: getEnvColor(ticket.environnement) }}>{ticket.environnement}</span></p>
                <Button text="Supprimer" onPress={() => handleDeleteTicket(ticket.id)} style={{ backgroundColor: 'red' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton en bas à gauche */}
      <div className="floating-add-btn">
        <Button text="Ajouter ticket" onPress={() => setShowForm(true)} />
      </div>
    </div>
  );
}

export default Dashboard;