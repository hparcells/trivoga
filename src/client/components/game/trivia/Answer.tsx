import React from 'react';

function Answer({ label }: { label: string }) {
  function handleAnswerClick() {
    console.log(label);
  }

  return (
    <li onClick={handleAnswerClick}>{label}</li>
  );
}

export default Answer;
