import React from 'react';
import './Scanner.css'
import BodyScan from '../../body-scan.png';

const Scanner = () => {
    return (
      <>
          <img src={BodyScan} alt="spinning log" className="scanner-image"/>
          <p className="scanner-text">
            Scanning...
          </p>
      </>
    );
};

export default Scanner;