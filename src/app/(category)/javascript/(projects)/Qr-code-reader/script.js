let html5QrcodeScanner = null;

function startScanner() {
    if (html5QrcodeScanner === null) {
        html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", 
            { 
                fps: 10,
                qrbox: {width: 250, height: 250},
                aspectRatio: 1.0
            }
        );
        
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('result').innerHTML = 
        `<p>Decoded QR Code: <strong>${decodedText}</strong></p>`;
    
    // Optional: Add link if the QR code contains a URL
    if (decodedText.startsWith('http')) {
        document.getElementById('result').innerHTML += 
            `<p><a href="${decodedText}" target="_blank">Open Link</a></p>`;
    }
}

function onScanFailure(error) {
    // console.warn(`Code scan error = ${error}`);
}