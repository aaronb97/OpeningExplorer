import React from 'react';
import { MoveCard } from './chessDisplay/ChessDisplay';

interface MoveBoxProps {
  card: MoveCard;
  onMouseEnter: (move: MoveCard) => void;
}

const MoveBox = ({ card, onMouseEnter }: MoveBoxProps) => (
  <div className="move-box" onMouseEnter={() => onMouseEnter(card)}>
    <div>{card.name}</div>
    <div>
      <b>Move: </b>
      {card.san}
    </div>
  </div>
);

export default MoveBox;
