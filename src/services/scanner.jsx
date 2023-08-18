
import RNQRGenerator from 'rn-qr-generator';

export function generatedCode(code) {
    try {
        RNQRGenerator.generate({
            value: code,
            height: 50,
            width: 250,
        })
            .then(response => {
                const { uri, width, height, base64 } = response;
                return uri;
            })
            .catch(error => { console.log('Cannot create QR code', error); return; });

    } catch (error) {
        console.log(error)
    }
}


export function scanImage(uri) {
    if (uri) {
        const PATH_TO_IMAGE = uri
        console.log('====================================');
        console.log('initiating barcode scanning module');
        console.log('====================================');
        RNQRGenerator.detect({
            uri: PATH_TO_IMAGE,
        })
            .then(response => {
                const { values } = response; // Array of detected QR code values. Empty if nothing found.
                console.log({ barcodeValues: values })
            })
            .catch(error => console.log('Cannot detect QR code in image', error));
    } else {
        console.log('====================================');
        console.log('uri is ' + uri);
        console.log('====================================');
    }
}