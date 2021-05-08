import React from 'react';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import MoveBox from '../MoveBox';

interface MoveBoxContainerProps {
  cards: MoveCard[];
  onCardMouseEnter: (move: MoveCard) => void;
  isLoadingOpenings: boolean;
}

const MoveBoxContainer = ({
  cards,
  onCardMouseEnter,
  isLoadingOpenings,
}: MoveBoxContainerProps) => {
  if (isLoadingOpenings) {
    return <div>Loading openings...</div>;
  }

  if (!cards.length) {
    return <div>No known openings from this position!</div>;
  }

  return (
    <div className="move-box-container">
      <div>
        {cards.map((card) => (
          <MoveBox
            key={card.name}
            card={card}
            onMouseEnter={onCardMouseEnter}
          />
        ))}
      </div>
    </div>
  );
};

export default MoveBoxContainer;
