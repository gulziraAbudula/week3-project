import { useState } from 'react';

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setFlipped(!flipped)}>
      {flipped ? card.answer : card.question}
    </div>
  );
}