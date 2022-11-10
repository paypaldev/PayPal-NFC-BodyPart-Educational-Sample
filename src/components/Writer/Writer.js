import React from 'react';
import './Writer.css';
import Save from '../SVGs/save';

const Writer = ({writeFn}) => {
    const [inputs, setInputs] = React.useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value.toLowerCase()}))
    }

    const onSave = (e) => {
        e.preventDefault();
        writeFn(inputs);
        setInputs({});
    };

    return (
      <>
        <form onSubmit={onSave}>
            <div className="writer-container">
                <input type="text" name="bodyPartName" placeholder="Enter Body Part Name" value={inputs.bodyPartName || ""} onChange={handleChange}/>
                {/* <input type="text" name="bodyImageUrl" placeholder="Enter Image Url" value={inputs.bodyImageUrl || "" } onChange={handleChange}></input>
                <input type="text" name="bodyInfo" placeholder="Enter Info Url..." value={inputs.bodyInfo || ""} onChange={handleChange}></input> */}
                <button className="btn" type="submit">
                    <Save/>
                    Save
                </button>
            </div>
        </form>
      </>
    );
};

export default Writer;