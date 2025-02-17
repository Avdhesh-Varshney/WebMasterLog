document.getElementById('scan').addEventListener('click', function () {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            let video = document.getElementById('video');
            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');
            let output = document.getElementById('output');
            let resultDiv = document.getElementById('result');
            let scanning = true;

            // Show the video container
            document.querySelector('.camera').style.display = 'block';

            // Set video stream
            video.srcObject = stream;
            video.setAttribute("playsinline", true);
            video.play();

            // Ensure canvas dimensions match the video feed
            video.addEventListener('loadedmetadata', function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            });

            function scanQRCode() {
                if (!scanning) return; // Stop if scanning is disabled

                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    
                    let code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert"
                    });

                    if (code) {
                        scanning = false; // Stop scanning
                        output.textContent = "Scanned Data: " + code.data;
                        resultDiv.hidden = false;

                        // Stop the camera after successfully scanning
                        setTimeout(() => {
                            stream.getTracks().forEach(track => track.stop());
                            video.srcObject = null;
                        }, 1000); 


                        window.location.href = code.data;
                    } else {
                        console.error("No QR code detected, retrying...");
                        setTimeout(scanQRCode, 500); 
                    }
                } else {
                    setTimeout(scanQRCode, 500); 
                }
            }

            setTimeout(scanQRCode, 1000); 
        })
        .catch(function (err) {
            console.error("Error accessing camera: ", err);
        });
});
