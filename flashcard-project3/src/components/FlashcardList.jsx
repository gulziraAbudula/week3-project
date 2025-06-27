import Flashcard from './Flashcard';

export default function FlashcardList({ cards }) {
  return (
    <div className="flashcard-list">
      {cards.map((card, index) => (
        <Flashcard key={index} card={card} />
      ))}
    </div>
  );
}
