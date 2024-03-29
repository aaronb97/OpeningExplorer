import { ChessInstance, Chess, Square } from 'chess.js';
import { Drawable } from 'chessground/draw';
import * as React from 'react';
import { useEffect, useState } from 'react';
import getOpenings from '../../services/apiService';

import MoveBoxContainer from '../moveBoxContainer/moveBoxContainer';
import ButtonsDisplay from '../buttonsDisplay/ButtonsDisplay';
import ChessgroundDisplay from '../chessgroundDisplay/ChessgroundDisplay';
import InfoDisplay from '../InfoDisplay/InfoDisplay';

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
  hasInfo: boolean;
}

const ChessDisplay = () => {
  const [chess] = useState<ChessInstance>(new Chess());
  const [lastMove, setLastMove] = useState<Square[]>();
  const [cards, setCards] = useState<MoveCard[]>([]);
  const [currentOpening, setCurrentOpening] = useState<{
    name?: string;
    info?: string[];
  }>({});
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [drawable, setDrawable] = useState<Drawable>({
    ...baseDrawableArgs,
  });
  const [isLoadingOpenings, setIsLoadingOpenings] = useState(false);
  const [didOpeningsLoadFail, setDidOpeningsLoadFail] = useState(false);

  const retrieveOpenings = async (): Promise<void> => {
    setIsLoadingOpenings(true);
    try {
      setDidOpeningsLoadFail(false);

      const response = await getOpenings(chess.fen());
      setCards(response.moves);
      setCurrentOpening({
        name: response.currentOpeningName,
        info: response.currentOpeningInfo,
      });
      setIsLoadingOpenings(false);
    } catch {
      setDidOpeningsLoadFail(true);
    }
  };

  const setState = async () => {
    setDrawable({
      ...baseDrawableArgs,
      shapes: [],
      autoShapes: [],
    });
    retrieveOpenings();
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

  const onClickCard = (card: MoveCard) => {
    onMove(card.from, card.to);
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
      <div className="chess-container">
        <ChessgroundDisplay
          turnColor={turnColor()}
          movable={calcMovable()}
          lastMove={lastMove}
          fen={chess.fen()}
          onMove={onMove}
          style={{
            boxShadow:
              '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            maxWidth: '700px',
            maxHeight: '700px',
          }}
          drawable={drawable}
          width="calc(85vmin - 80px)"
          height="calc(85vmin - 80px)"
        />
        <ButtonsDisplay
          onResetClick={onResetClick}
          onBackClick={onBackClick}
          buttonsDisabled={buttonsDisabled}
        />
      </div>
      <div className="cards-display">
        <InfoDisplay name={currentOpening.name} info={currentOpening.info} />
        <MoveBoxContainer
          cards={cards}
          onCardMouseEnter={onCardMouseEnter}
          onClickCard={onClickCard}
          isLoadingOpenings={isLoadingOpenings}
          didOpeningsLoadFail={didOpeningsLoadFail}
        />
      </div>
    </div>
  );
};

export default ChessDisplay;
