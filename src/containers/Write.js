import React from 'react';
import Writer from '../components/Writer/Writer';

const Write = () => {
    const onWrite = async(data) => {
        try {
            const ndef = new window.NDEFReader();
            const encoder = new TextEncoder();
            // This line will avoid showing the native NFC UI reader
            await ndef.scan();
            const jsonRecord = {
                recordType: "mime",
                mediaType: "application/json",
                data: encoder.encode(JSON.stringify(data))
              };
            await ndef.write({records: [jsonRecord]});
            alert(`Value Saved!`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <Writer writeFn={onWrite}/>
    );
};

export default Write;