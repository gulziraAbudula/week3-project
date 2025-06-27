// components/FlashcardController.jsx
import { useState } from 'react';
import Fuse from 'fuse.js';
import Flashcard from './Flashcard';

export default function FlashcardController({ cards }) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentCard = cards[index];

  const checkAnswer = () => {
    const correct = currentCard.answer.toLowerCase().trim();
    const input = userAnswer.toLowerCase().trim();

    const isExact = input === correct;
    const fuse = new Fuse([correct], { includeScore: true, threshold: 0.4 });
    const fuzzy = fuse.search(input);

    if (isExact) {
      setFeedback('✅ Correct!');
    } else if (fuzzy.length > 0) {
      setFeedback('🤏 Close! Try again.');
    } else {
      setFeedback('❌ Incorrect.');
    }
  };

  return (
    <div className="controller">
      <Flashcard card={currentCard} />

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer"
      />
      <button onClick={checkAnswer}>Check Answer</button>
      <p>{feedback}</p>

      <div>
        <button
          onClick={() => {
            setIndex((prev) => prev - 1);
            setUserAnswer('');
            setFeedback('');
          }}
          disabled={index === 0}
        >
          ← Back
        </button>

        <button
          onClick={() => {
            setIndex((prev) => prev + 1);
            setUserAnswer('');
            setFeedback('');
          }}
          disabled={index === cards.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
