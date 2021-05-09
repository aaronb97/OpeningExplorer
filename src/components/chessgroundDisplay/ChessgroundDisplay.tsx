import { Chessground } from 'chessground';
import { Api } from 'chessground/api';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Config } from 'chessground/config';
import { Square } from 'chess.js';
import './chessGround.scss';

const propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fen: PropTypes.string,
  orientation: PropTypes.string,
  turnColor: PropTypes.string,
  check: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  lastMove: PropTypes.array,
  selected: PropTypes.string,
  coordinates: PropTypes.bool,
  autoCastle: PropTypes.bool,
  viewOnly: PropTypes.bool,
  disableContextMenu: PropTypes.bool,
  resizable: PropTypes.bool,
  addPieceZIndex: PropTypes.bool,
  highlight: PropTypes.object,
  animation: PropTypes.object,
  movable: PropTypes.object,
  premovable: PropTypes.object,
  predroppable: PropTypes.object,
  draggable: PropTypes.object,
  selectable: PropTypes.object,
  onChange: PropTypes.func,
  onMove: PropTypes.func,
  onDropNewPiece: PropTypes.func,
  onSelect: PropTypes.func,
  items: PropTypes.object,
  drawable: PropTypes.object,
};

interface ChessgroundProps {
  turnColor: string;
  movable: any;
  lastMove?: Square[];
  fen: string;
  onMove: (from: Square, to: Square) => void;
  style: any;
  drawable: any;
  width: string;
  height: string;
}

const buildConfigFromProps = (props: ChessgroundProps): Config => {
  const config = { events: {} };
  Object.keys(propTypes).forEach((key) => {
    const prop = props[key];
    if (typeof prop !== 'undefined') {
      const match = key.match(/^on([A-Z]\S*)/);
      if (match) {
        config.events[match[1].toLowerCase()] = prop;
      } else {
        config[key] = prop;
      }
    }
  });

  return config;
};

const ChessgroundDisplay = (props: ChessgroundProps) => {
  const [cg, setCg] = useState<Api>();
  const [element, setElement] = useState<HTMLDivElement | null>();

  const { style, width, height, drawable } = props;

  useEffect(() => {
    if (element) {
      setCg(Chessground(element, buildConfigFromProps(props)));
    }
  }, [element, drawable]);

  cg?.set(buildConfigFromProps(props));

  const styleProps = { style: { ...style } };
  if (width) {
    styleProps.style.width = props.width;
  }

  if (height) {
    styleProps.style.height = props.height;
  }

  if (drawable.autoShapes) {
    cg?.setAutoShapes(drawable.autoShapes);
  }

  return (
    <div
      ref={(el) => {
        if (el) {
          setElement(el);
        }
      }}
      style={styleProps.style}
    />
  );
};

export default ChessgroundDisplay;
