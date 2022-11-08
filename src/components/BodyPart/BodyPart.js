import React from 'react';
import './BodyPart.css'
import data from '../../data/data.json';
const BodyPart = ({bodyPartName}) => {  
    console.log('body read', bodyPartName) 
    const bodyPart = data.bodyParts.find(
        bodyPart => 
            bodyPart.name.toLocaleLowerCase() === bodyPartName.toLocaleLowerCase()
        );

    return (
      <>
          <img src={bodyPart.image} alt="spinning log" className="scanner-image"/>
          <p className="scanner-text">
            Learn more about <a href={bodyPart.url} target="_blank">{bodyPart.name}</a>.
          </p>
      </>
    );
};

export default BodyPart;