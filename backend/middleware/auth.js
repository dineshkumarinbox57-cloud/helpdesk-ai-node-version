const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

        res.writeHead(401, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            success: false,
            message: "Unauthorized"
        })
    );

return;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(
            token,
            "mysecretkey"
        );

        req.user = decoded;
         next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
module.exports = auth;