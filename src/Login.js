// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'ikram@example.com' && mdp === '1234') {
      navigate('/dashboard');
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    </div>
  );
}

export default Login;
