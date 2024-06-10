const crypto = require('crypto');

class UrlShortener {
    static generateShortUrl() {
        return crypto.randomBytes(6).toString('hex');
    }
}

module.exports = UrlShortener;