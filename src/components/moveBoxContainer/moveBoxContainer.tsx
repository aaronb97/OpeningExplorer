import React from 'react';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import MoveBox from '../MoveBox';
import LoadingOverlay from 'react-loading-overlay';

import './moveBoxContainer.scss';

interface MoveBoxContainerProps {
  cards: MoveCard[];
  onCardMouseEnter: (move: MoveCard) => void;
  isLoadingOpenings: boolean;
  didOpeningsLoadFail: boolean;
}

const MoveBoxContainer = ({
  cards,
  onCardMouseEnter,
  isLoadingOpenings,
  didOpeningsLoadFail,
}: MoveBoxContainerProps) => {
  if (didOpeningsLoadFail) {
    return (
      <div className="notification">
        <div>Loading of openings failed!</div>
        <div>:(</div>
      </div>
    );
  }

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
