import React from 'react';

import back from '../../images/back.svg';
import restart from '../../images/restart.svg';

import './buttonsDisplay.scss';

interface ButtonsDisplayProps {
  onResetClick: () => void;
  onBackClick: () => void;
  buttonsDisabled: boolean;
}

const ButtonsDisplay = ({
  onResetClick,
  onBackClick,
  buttonsDisabled,
}: ButtonsDisplayProps) => (
  <div className="buttons">
    <button type="button" onClick={onResetClick} disabled={buttonsDisabled}>
      <img className="nav-button" src={restart} alt="Reset" />
    </button>
    <button type="button" onClick={onBackClick} disabled={buttonsDisabled}>
      <img className="nav-button" src={back} alt="Back" />
    </button>
  </div>
);

export default ButtonsDisplay;
