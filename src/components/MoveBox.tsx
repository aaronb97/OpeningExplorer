import { Move } from "chess.js";
import React, { CSSProperties } from "react";
interface MoveBoxProps {
  name: string;
  move: Move;
  onMouseEnter: (move: Move) => void;
}

const MoveBox = ({ name, move, onMouseEnter }: MoveBoxProps) => {
  return (
    <div className="move-box" onMouseEnter={() => onMouseEnter(move)}>
      <div>{name}</div>
      <div>
        <b>Move: </b>
        {move.san}
      </div>
    </div>
  );
};

export default MoveBox;
