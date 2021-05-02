import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import Chess, { ChessInstance, Move, Square } from "chess.js";
import "./index.scss";

//@ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import openings from "./openings";

import back from "./images/back.svg";
import restart from "./images/restart.svg";

import MoveBox from "./components/MoveBox";
import { Drawable } from "chessground/draw";
import { CustomNavBar } from "./components/customNavBar/CustomNavBar";

//import MoveBox from "./components/MoveBox";
const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

interface MoveCard {
  move: Move;
  name: string;
}

const getTrimmedFen = (fen: string) => {
  const splitFen = fen.split(" ");
  return `${splitFen[0]} ${splitFen[1]} ${splitFen[2]}`;
};

const Demo = () => {
  const [chess] = useState<ChessInstance>(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState<Square[]>();
  const [cards, setCards] = useState<MoveCard[]>([]);
  const [currentOpeningName, setCurrentOpeningName] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [drawable, setDrawable] = useState<Drawable>({} as Drawable);

  useEffect(() => {
    setCards(getCards());
  }, []);

  const getCards = (): MoveCard[] => {
    const cards: MoveCard[] = [];
    chess.moves().forEach((move) => {
      const possibleMove = chess.move(move);
      const trimmedFen = getTrimmedFen(chess.fen());
      const opening = openings[trimmedFen];
      if (opening && possibleMove) {
        cards.push({
          move: possibleMove,
          name: opening.name,
        });
      }

      chess.undo();
    });

    return cards;
  };

  const getCurrentOpeningName = (): string => {
    console.log(openings[getTrimmedFen(chess.fen())]);
    return openings[getTrimmedFen(chess.fen())]?.name ?? " ";
  };

  const setState = () => {
    setDrawable({
      shapes: [],
      autoShapes: [],
      enabled: true,
      visible: true,
      defaultSnapToValidMove: true,
      eraseOnClick: false,
      brushes: {},
      pieces: { baseUrl: "" },
      prevSvgHash: "",
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

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to),
        );
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
    //@ts-ignore
    setDrawable({
      autoShapes: [{ orig: move.from, dest: move.to, brush: "green" }],
      eraseOnClick: true,
    });
  };

  return (
    <>
      <CustomNavBar></CustomNavBar>
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
              margin: "auto",
              width: "calc(85vmin - 80px)",
              minWidth: "300px",
              minHeight: "300px",
              height: "calc(85vmin - 80px)",
            }}
            drawable={drawable}
          />
          <div className="opening-name">{currentOpeningName}</div>
          <div className="buttons">
            <button onClick={onResetClick} disabled={buttonsDisabled}>
              <img className="nav-button" src={restart}></img>
            </button>
            <button onClick={onBackClick} disabled={buttonsDisabled}>
              <img className="nav-button" src={back}></img>
            </button>
          </div>
        </div>
        <div className="move-box-container">
          <div>
            {cards.map((card, i) => (
              <MoveBox
                key={i}
                name={card.name}
                move={card.move}
                onMouseEnter={onCardMouseEnter}
              ></MoveBox>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
