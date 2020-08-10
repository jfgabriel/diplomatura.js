import React from 'react';

export default function ParentCommChild({ text, onSendMessage }) {
  return (
    <div className="border border-primary">
      <h3>Parent comm Child</h3>
      <p>Recibi [{text}].</p>
      <input
        className="m-2 p-2"
        onKeyUp={(e) => {
          onSendMessage(e.target.value);
        }}
      />
    </div>
  );
}
