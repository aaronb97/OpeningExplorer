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
    disabled={card.hidden}
  >
    <div>{card.name}</div>
    <div>
      <b>Move: </b>
      {card.san}
    </div>
  </button>
);

export default MoveBox;
