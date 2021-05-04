import express from "express";
import cors from "cors";

import { Chess } from "chess.js";
import openings from "./openings";

require("dotenv").config();
require("source-map-support").install();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getTrimmedFen = (fen: string) => {
  const splitFen = fen.split(" ");
  return `${splitFen[0]} ${splitFen[1]} ${splitFen[2]}`;
};

interface Move {
  san: string;
  name: string;
}

app.get("/openings", async (req, res) => {
  try {
    const chess = new Chess(req.body.fen);

    const moves: Move[] = [];
    chess.moves().forEach((move) => {
      const possibleMove = chess.move(move);
      const trimmedFen = getTrimmedFen(chess.fen());
      const opening = openings[trimmedFen];
      if (opening && possibleMove) {
        moves.push({
          san: possibleMove.san,
          name: opening.name,
        });
      }

      chess.undo();
    });

    res.send(moves);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001);
console.log("listening on 3001");

process.once("SIGUSR2", () => {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", () => {
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
