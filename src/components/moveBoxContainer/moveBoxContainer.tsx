import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import LoadingOverlay from 'react-loading-overlay-ts';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import MoveBox from '../moveBox/MoveBox';

import './moveBoxContainer.scss';

const defaultLoadingText = 'Loading openings...';
const waitingLoadingText = 'Loading openings may take a few moments...';

interface MoveBoxContainerProps {
  cards: MoveCard[];
  onCardMouseEnter: (move: MoveCard) => void;
  onClickCard: (move: MoveCard) => void;
  isLoadingOpenings: boolean;
  didOpeningsLoadFail: boolean;
}

const MoveBoxContainer = ({
  cards,
  onCardMouseEnter,
  isLoadingOpenings,
  didOpeningsLoadFail,
  onClickCard,
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
      {/* {cards.map((card) => (
        <MoveBox
          key={`${card.name}${card.san}`}
          card={card}
          onMouseEnter={onCardMouseEnter}
          onClick={onClickCard}
        />
      ))} */}
      {[...Array(24)].map((_, i) => (
        <AnimateHeight
          id="example-panel"
          duration={500}
          height={!cards[i]?.hidden ? 'auto' : 0} // see props documentation below
        >
          {cards[i] ? (
            <MoveBox
              key={`${cards[i].name}${cards[i].san}`}
              card={cards[i]}
              onMouseEnter={onCardMouseEnter}
              onClick={onClickCard}
            />
          ) : null}
        </AnimateHeight>
      ))}
    </LoadingOverlay>
  );
};

export default MoveBoxContainer;
