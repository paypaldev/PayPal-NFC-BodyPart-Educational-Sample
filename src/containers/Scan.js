import React, { useCallback, useContext, useEffect, useState } from 'react';
import Scanner from '../components/Scanner/Scanner';
import BodyPart from '../components/BodyPart/BodyPart';
import Modal from '../components/Modal/Modal';
import { ActionsContext } from '../contexts/context';

const Scan = () => {
    const { actions, setActions} = useContext(ActionsContext);
    const [data, setData] = useState(null);

    const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
            try {
                const ndef = new window.NDEFReader();
                const ctrl = new AbortController();
                await ndef.scan({ signal: ctrl.signal });

                ndef.onreadingerror = () => {
                    console.log("Cannot read data from the NFC tag. Try another one?");
                };
                
                ndef.onreading = event => {
                    console.log("NDEF message read.");
                    onReading(event);
                    ctrl.abort();
                };

                ctrl.signal.onabort = () => {
                    console.log("We're done waiting for NDEF messages.");
                };

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
            };
        }
    },[setActions]);

    const onReading = ({message}) => {
        for (const record of message.records) {
            if (record.recordType === "mime") {
                const textDecoder = new TextDecoder();
                const jsonData = JSON.parse(textDecoder.decode(record.data));
                console.log(jsonData);
                setData(jsonData);
                setActions({
                    scan: 'scanned',
                    write: null
                });
            }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);

    if(actions.scan === 'scanned') {
        return(
            <Modal>
                <BodyPart {...data}/>
            </Modal>
        )
    }

    if (actions.scan === 'scanning') {
        return(
            <Modal>
               <Scanner/>
            </Modal>
        )
    }
};

export default Scan;