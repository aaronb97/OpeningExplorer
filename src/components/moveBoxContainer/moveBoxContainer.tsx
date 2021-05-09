import React from 'react';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import MoveBox from '../MoveBox';
import LoadingOverlay from 'react-loading-overlay';

import './moveBoxContainer.scss';

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
  if (!isLoadingOpenings && !cards.length) {
    return (
      <div className="notification">No known openings from this position!</div>
    );
  }

  return (
    <LoadingOverlay
      active={isLoadingOpenings}
      spinner
      text="Loading openings..."
      className="move-box-container"
    >
      {cards.map((card) => (
        <MoveBox key={card.name} card={card} onMouseEnter={onCardMouseEnter} />
      ))}
    </LoadingOverlay>
  );
};

export default MoveBoxContainer;
