![PayPal Developer Cover](https://github.com/paypaldev/.github/blob/main/pp-cover.png)
<div align="center">
  <a href="https://twitter.com/paypaldev" target="_blank">
    <img alt="Twitter: PayPal Developer" src="https://img.shields.io/twitter/follow/paypaldev?style=social" />
  </a>
  <br />
  <a href="https://twitter.com/paypaldev" target="_blank">Twitter</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://www.paypal.com/us/home" target="_blank">PayPal</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://developer.paypal.com/home" target="_blank">Docs</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://github.com/paypaldev" target="_blank">Code Samples</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://dev.to/paypaldeveloper" target="_blank">Blog</a>
  <br />
  <hr />
</div>

# React NFC Body Parts Sample App
![alt NFC Tag](sc.png)
## About

This is a simple sample app demostrating the usage of the [Web NFC API](https://w3c.github.io/web-nfc/).

**To get the Web NFC API working you will need an Android Device with Google Chrome and your web app will need to be hosted using https.**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### WTF is NFC?

NFC stands for **_Near-Field Communication_**. NFC is a set of communication protocols for communication between two electronic devices.

Electromagnetic fields can be used to transmit data or induce electrical currents in a receiving device. Passive NFC devices draw power from the fields produced by active devices, but the range is short.

![alt NFC Tag](nfc.jpg)

You can buy NFC Tags on [Amazon](https://www.amazon.com/gp/product/B0727NYX3B/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1). These tags can contain 540KB of data.

## Usages

NFCs can have multiple usages, some of the usages are:

- Making contactless payments like Google and Apple Pay
- Opening a door using your badge
- Opening a link
- Product control in a warehouse

To learn about the usages visit [this forum](https://nfc-forum.org/what-is-nfc/).

## Getting Started with the Web NFC API

This project uses 4 methods of the Web NFC API

1. Scan: Returns a Promise resolved if starting NFC scan was successful.

   `ndef.scan()`

2. Reading: An event fired when a new reading is available.

   `ndef.onreading()`

3. Reading Error: An event fired when an error happened during reading.

   `ndef.onreadingerror()`

4. Write: Returns a Promise resolved if writing the message (String, ArrayBuffer or NDEF record) with options was successful.
   `ndef.write()`

## Using the Web NFC API methods

### Scan, Reading, Reading Error

```javascript
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
```

The **onReading** method grabs the message and serial number inside of the NFC tag, the uses the array of reacord inside of the message and decodes the information so its readable to humans.

```javascript
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
```

### Write

```javascript
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
```

## Learn More & Resources

- https://web.dev/nfc/
- https://www.androidauthority.com/what-is-nfc-270730/
- https://nfc-forum.org/what-is-nfc/
- https://whatwebcando.today/nfc.html
- https://caniuse.com/webnfc
- https://w3c.github.io/web-nfc/

### Run the project

Run `npm install` to install all the project dependencies then run the project using
`npm start`.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## PayPal Developer Community
The PayPal Developer community helps you build your career, while also improving PayPal products and the developer experience. You’ll be able to contribute code and documentation, meet new people and learn from the open source community.

* Website: [developer.paypal.com](https://developer.paypal.com)
* Twitter: [@paypaldev](https://twitter.com/paypaldev)
* Github:  [@paypal](https://github.com/paypal)
