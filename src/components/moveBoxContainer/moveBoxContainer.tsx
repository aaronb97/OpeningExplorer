import React, { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import MoveBox from '../moveBox/MoveBox';

import './moveBoxContainer.scss';

const defaultLoadingText = 'Loading openings...';
const waitingLoadingText =
  "Loading openings may take a few moments if the website hasn't been visited in a while...";

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
  const [loadingText, setLoadingText] = useState(defaultLoadingText);

  useEffect(() => {
    if (isLoadingOpenings) {
      setLoadingText(defaultLoadingText);
    }

    setTimeout(() => setLoadingText(waitingLoadingText), 3000);
  }, [isLoadingOpenings]);

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
      text={loadingText}
      className="move-box-container"
    >
      {cards.map((card) => (
        <MoveBox
          key={`${card.name}${card.san}`}
          card={card}
          onMouseEnter={onCardMouseEnter}
        />
      ))}
    </LoadingOverlay>
  );
};

export default MoveBoxContainer;
