import * as React from 'react';
import './InfoDisplay.scss';

interface Props {
  name?: string;
  info?: string[];
}

const InfoDisplay = ({ name, info }: Props) => {
  if (!name) {
    return null;
  }

  return (
    <div className="info-display">
      <h2>{name}</h2>
      {info?.map((infoLine) => (
        <p key={infoLine}>{infoLine}</p>
      ))}
    </div>
  );
};

export default InfoDisplay;
