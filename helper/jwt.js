const { expressjwt: jwt } = require('express-jwt');
const api = process.env.API_URL;
function authJwt() {
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            {
                url: /\/api\/v1\/users\/login(.*)/,
                methods: ['POST', 'OPTIONS'],
            },
            { url: /\/api\/v1\/users(.*)/, methods: ['POST', 'OPTIONS'] },
            `${api}/users/register`,
            `${api}/users`,
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    }

    done();
}

module.exports = authJwt;
