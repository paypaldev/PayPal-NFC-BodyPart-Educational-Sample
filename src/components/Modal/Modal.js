import React, { useContext } from 'react';
import './Modal.css'
import { ActionsContext } from '../../contexts/context';

const Modal = ({bodyPart, children}) => {
  const { actions, setActions} = useContext(ActionsContext);
    return (
      <div className="modal">
        <p className="modal-exit" onClick={()=>setActions({...actions, scan: null})}>X</p>
        <div className="modal-container">
            <>{children}</>
        </div>
      </div>
    );
};

export default Modal;