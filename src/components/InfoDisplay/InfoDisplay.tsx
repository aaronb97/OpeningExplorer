import * as React from 'react';
import './InfoDisplay.scss';

interface Props {
  name: string;
}

const InfoDisplay = ({ name }: Props) => {
  if (!name) {
    return null;
  }

  return (
    <div className="info-display">
      <h2>{name}</h2>
      <div>No info about this opening yet!</div>
    </div>
  );
};

export default InfoDisplay;
