import { ChessInstance, Chess, Square, Move } from 'chess.js';
// @ts-ignore
import Chessground from 'react-chessground';
import { Drawable } from 'chessground/draw';
import * as React from 'react';
import { useEffect } from 'react';
import openings from '../../openings';
import MoveBox from '../MoveBox';

import back from '../../images/back.svg';
import restart from '../../images/restart.svg';

import 'react-chessground/dist/styles/chessground.css';

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

interface MoveCard {
  move: Move;
  name: string;
}

const getTrimmedFen = (fen: string) => {
  const splitFen = fen.split(' ');
  return `${splitFen[0]} ${splitFen[1]} ${splitFen[2]}`;
};

const ChessDisplay = () => {
  const [chess] = React.useState<ChessInstance>(new Chess());
  const [fen, setFen] = React.useState('');
  const [lastMove, setLastMove] = React.useState<Square[]>();
  const [cards, setCards] = React.useState<MoveCard[]>([]);
  const [currentOpeningName, setCurrentOpeningName] = React.useState('');
  const [buttonsDisabled, setButtonsDisabled] = React.useState(true);
  const [drawable, setDrawable] = React.useState<Drawable>({
    ...baseDrawableArgs,
  });

  const getCards = (): MoveCard[] => {
    const moveCards: MoveCard[] = [];
    chess.moves().forEach((move) => {
      const possibleMove = chess.move(move);
      const trimmedFen = getTrimmedFen(chess.fen());
      const opening = openings[trimmedFen];
      if (opening && possibleMove) {
        moveCards.push({
          move: possibleMove,
          name: opening.name,
        });
      }

      chess.undo();
    });

    return moveCards;
  };

  useEffect(() => {
    setCards(getCards());
  }, []);

  const getCurrentOpeningName = (): string =>
    openings[getTrimmedFen(chess.fen())]?.name ?? ' ';

  const setState = () => {
    setDrawable({
      ...baseDrawableArgs,
      shapes: [],
      autoShapes: [],
    });
    setFen(chess.fen());
    setCards(getCards());
    setCurrentOpeningName(getCurrentOpeningName());
  };

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

  const onCardMouseEnter = (move: Move) => {
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
          fen={fen}
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
      <div className="move-box-container">
        <div>
          {cards.map((card) => (
            <MoveBox
              key={card.name}
              name={card.name}
              move={card.move}
              onMouseEnter={onCardMouseEnter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessDisplay;
