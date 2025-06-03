// src/components/Input.js
import React from 'react';

function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '5px 0',
        width: '100%',
        ...style
      }}
    />
  );
}

export default Input;
