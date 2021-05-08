import { ChessInstance, Chess, Square } from 'chess.js';
// @ts-ignore
import Chessground from 'react-chessground';
import { Drawable } from 'chessground/draw';
import * as React from 'react';
import { useEffect, useState } from 'react';
import getOpenings from '../../services/apiService';

import back from '../../images/back.svg';
import restart from '../../images/restart.svg';

import 'react-chessground/dist/styles/chessground.css';
import MoveBoxContainer from '../moveBoxContainer/moveBoxContainer';

const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const baseDrawableArgs: Drawable = {
  autoShapes: [],
  shapes: [],
  enabled: true,
  visible: true,
  defaultSnapToValidMove: true,
  eraseOnClick: false,
  brushes: {},
  pieces: { baseUrl: '' },
  prevSvgHash: '',
};

export interface MoveCard {
  name: string;
  san: string;
  from: Square;
  to: Square;
}

const ChessDisplay = () => {
  const [chess] = useState<ChessInstance>(new Chess());
  const [lastMove, setLastMove] = useState<Square[]>();
  const [cards, setCards] = useState<MoveCard[]>([]);
  const [currentOpeningName, setCurrentOpeningName] = useState('');
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [drawable, setDrawable] = useState<Drawable>({
    ...baseDrawableArgs,
  });
  const [isLoadingOpenings, setIsLoadingOpenings] = useState(false);

  const retrieveOpenings = async (): Promise<any> => {
    setIsLoadingOpenings(true);
    const response = await getOpenings(chess.fen());
    setCards(response.moves);
    setCurrentOpeningName(response.currentOpeningName);
    setIsLoadingOpenings(false);
    return response;
  };

  const setState = async () => {
    setDrawable({
      ...baseDrawableArgs,
      shapes: [],
      autoShapes: [],
    });
    await retrieveOpenings();
  };

  useEffect(() => {
    setState();
  }, []);

  const onMove = (from: Square, to: Square) => {
    if (chess.move({ from, to })) {
      setLastMove([from, to]);
      setState();
      setButtonsDisabled(false);
    }
  };

  const turnColor = () => (chess.turn() === 'w' ? 'white' : 'black');

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length) {
        dests.set(
          s,
          ms.map((m) => m.to),
        );
      }
    });

    return {
      free: false,
      dests,
    };
  };

  const onBackClick = () => {
    const move = chess.undo();
    if (!move) return;

    if (chess.fen() === startingFen) {
      setButtonsDisabled(true);
    }

    setLastMove([move.from, move.to]);
    setState();
  };

  const onResetClick = () => {
    chess.reset();

    setLastMove([]);
    setState();
    setButtonsDisabled(true);
  };

  const onCardMouseEnter = (move: MoveCard) => {
    setDrawable({
      ...baseDrawableArgs,
      autoShapes: [{ orig: move.from, dest: move.to, brush: 'green' }],
    });
  };

  return (
    <div className="grid-container">
      <div />
      <div>
        <Chessground
          turnColor={turnColor()}
          movable={calcMovable()}
          lastMove={lastMove}
          fen={chess.fen()}
          onMove={onMove}
          style={{
            margin: 'auto',
            width: 'calc(85vmin - 80px)',
            minWidth: '300px',
            minHeight: '300px',
            height: 'calc(85vmin - 80px)',
          }}
          drawable={drawable}
        />
        <div className="opening-name">{currentOpeningName}</div>
        <div className="buttons">
          <button
            type="button"
            onClick={onResetClick}
            disabled={buttonsDisabled}
          >
            <img className="nav-button" src={restart} alt="Reset" />
          </button>
          <button
            type="button"
            onClick={onBackClick}
            disabled={buttonsDisabled}
          >
            <img className="nav-button" src={back} alt="Back" />
          </button>
        </div>
      </div>
      <MoveBoxContainer
        cards={cards}
        onCardMouseEnter={onCardMouseEnter}
        isLoadingOpenings={isLoadingOpenings}
      />
    </div>
  );
};

export default ChessDisplay;
