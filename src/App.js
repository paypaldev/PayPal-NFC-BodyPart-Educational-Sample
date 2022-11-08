import logo from './humanoid.png';
import './App.css';
import Scan from './containers/Scan';
import Write from './containers/Write';
import { useState } from 'react';
import { ActionsContext } from './contexts/context';

function App() {

  const [actions, setActions] = useState(null);
  const {scan, write} = actions || {};

  const actionsValue = {actions,setActions};

  const onHandleAction = (actions) =>{
    setActions({...actions});
  }

  return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Body Parts</h1>
        <div className="App-container">
          <button onClick={()=>onHandleAction({scan: 'scanning', write: null})} className="btn">Scan Body Part</button>
          <button onClick={()=>onHandleAction({scan: null, write: 'writing'})} className="btn">Set Body Part</button>
        </div>
        <ActionsContext.Provider value={actionsValue}>
          {scan && <Scan/>}
          {write && <Write/>}
        </ActionsContext.Provider>
      </div>
  );
}

export default App;
