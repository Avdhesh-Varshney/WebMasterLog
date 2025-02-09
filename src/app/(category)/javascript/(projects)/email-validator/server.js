const express = require("express");
const dns = require("dns");

const app = express();
const PORT = 3000;

const cors = require("cors");


// Enable CORS for all origins
app.use(cors());

app.get("/validate", (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.json({ valid: false, message: "No email provided" });
    }

    const domain = email.split("@")[1];

    dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
            return res.json({ valid: false, message: "Invalid email domain" });
        }
        res.json({ valid: true, message: "Valid email and domain exists" });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
