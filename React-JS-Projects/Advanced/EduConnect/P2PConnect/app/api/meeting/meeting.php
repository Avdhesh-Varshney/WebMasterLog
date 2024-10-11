<?php

$API_KEY_SECRET = "mirotalkp2p_default_secret";
// $MIROTALK_URL = "http://localhost:3000/api/v1/meeting";
$MIROTALK_URL = "https://p2p.mirotalk.com/api/v1/meeting";
// $MIROTALK_URL = "https://mirotalk.up.railway.app/api/v1/meeting";


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $MIROTALK_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);

$headers = [
    'authorization:' . $API_KEY_SECRET,
    'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo "Status code: $httpcode \n";
$data = json_decode($response);
echo "meeting: ", $data->{'meeting'}, "\n";
