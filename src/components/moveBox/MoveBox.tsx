import React from 'react';
import { MoveCard } from '../chessDisplay/ChessDisplay';
import './moveBox.scss';

interface MoveBoxProps {
  card: MoveCard;
  onMouseEnter: (move: MoveCard) => void;
  onClick: (move: MoveCard) => void;
}

const MoveBox = ({ card, onMouseEnter, onClick }: MoveBoxProps) => (
  <button
    className="move-box"
    onMouseEnter={() => onMouseEnter(card)}
    onClick={() => onClick(card)}
    type="button"
  >
    <div>{card.name}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <b>Move: </b>
        {card.san}
      </div>
      {card.hasInfo ? (
        <span className="material-icons" title="has info">
          feed
        </span>
      ) : null}
    </div>
  </button>
);

export default MoveBox;
