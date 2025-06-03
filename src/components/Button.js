// src/components/Button.js
import React from 'react';

function Button({ text, onPress, style = {} }) {
  return (
    <button
      onClick={onPress}
      style={{
        ...style
      }}
    >
      {text}
    </button>
  );
}

export default Button;