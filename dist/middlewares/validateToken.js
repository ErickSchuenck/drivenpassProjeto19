import jwt from "jsonwebtoken";
export function validateToken(req, res, next) {
    var authorization = req.headers.authorization;
    var token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '').trim();
    var key = process.env.TOKEN_KEY;
    jwt.verify(token, key, function (err, result) {
        if (err)
            return res.status(401).send({ err: err });
        if (result) {
            res.locals.userId = result;
            next();
        }
    });
}
;
