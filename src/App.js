import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import Dashboard from "./Pages/dashboard/Dashboard";

function App() {
  const [message, setMessage] = useState(""); // ici on stockera le message du backend

  // appel à l'API backend dès que le composant est monté
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/hello", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log("response is", response);
      })
      .catch((error) =>
        console.error("Erreur lors de l’appel au backend :", error)
      );
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Ceci est juste pour tester que le backend est bien connecté */}
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        <h1>Message du backend :</h1>
        <p>{message}</p>
      </div>
    </Router>
  );
}

export default App;
