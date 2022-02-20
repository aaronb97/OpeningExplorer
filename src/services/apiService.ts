import { MoveCard } from 'src/components/chessDisplay/ChessDisplay';
import instance from './axios';

const getOpenings = (
  fen: string,
): Promise<{
  moves: MoveCard[];
  currentOpeningName: string;
  currentOpeningInfo?: string[];
}> => instance.get(`/openings/${encodeURIComponent(fen)}`).then((x) => x.data);

export default getOpenings;
