// src/components/Button.js
import React from 'react';

function Button({ text, onPress, style = {}, className = '' }) {
  return (
    <button
      onClick={onPress}
      className={`custom-button ${className}`}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button;
